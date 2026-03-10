const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json()) // promiss of json data
        .then((json) => displayLessons(json.data))
};

const removeActiveBtn = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach((btn) => btn.classList.remove("active-btn"))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        removeActiveBtn(); //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active-btn") // add active class
        displayLevelWord(json.data)
    })
}


const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
    console.log(word)
}


const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-2 py-10">
        <img class = "mx-auto" src = "./assets/alert-error.png"
            <p class="text-xs text-gray-700 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-3xl font-bangla">নেক্সট Lesson এ যান</h1>
        </div>`;
        return;
    }
words.forEach((word) => {
  console.log(word);
  const card = document.createElement("div");

  card.innerHTML =
    `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
  <p class="font-semibold">Meaning /Pronounciation</p>

  <div class="text-2xl font-medium font-bangla">
    ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}
  </div>

  <div class="flex justify-between items-center">
    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
      <i class="fa-solid fa-circle-info"></i>
    </button>

    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
      <i class="fa-solid fa-volume-high"></i>
    </button>
  </div>
</div>`
  ;

  wordContainer.append(card);
});

}

const displayLessons = (lessons) => {
    // 1 get the container & emty
const levelContainer = document.getElementById("level-container");
levelContainer.innerHTML = "";
    // 2 get into every lesson
    for(let lesson of lessons){
        // 3 create buttons for every lesson
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`
        
        // 4 append into container
        levelContainer.append(btnDiv)
        }
}
loadLessons();