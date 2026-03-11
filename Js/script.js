
// daynamic synonyms maker
const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
    return(htmlElements.join(" "));
};

// Voice function
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


// active button controler
const removeActiveBtn = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach((btn) => btn.classList.remove("active-btn"))
}



// spinner make
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else{
        document.getElementById("spinner").classList.add("hidden")
        document.getElementById("word-container").classList.remove("hidden")
    }
}


// word details implement or modal
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class = "text-2xl font-semibold">
                    <h2>${word.word ? word.word : "শব্দ পাওয়া যায়নি"} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})
                    </h2>
                </div>

                <div class="">
                    <h2 class="font-semibold">Meaning</h2>
                    <p>${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
                </div>

                <div class="">
                    <h2 class="font-semibold">Example</h2>
                    <p>${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}</p>
                </div>

                <div class="">
                    ${createElement(word.synonyms)}
                </div>`;
    document.getElementById("word_modal").showModal()
}



// word implement
const loadLevelWord = (id) => {
    manageSpinner(true)
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

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-2 py-10">
        <img class = "mx-auto" src = "./assets/alert-error.png"
            <p class="text-xs text-gray-700 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-3xl font-bangla">নেক্সট Lesson এ যান</h1>
        </div>`;
        manageSpinner(false)
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

    <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
      <i class="fa-solid fa-volume-high"></i>
    </button>
  </div>
</div>`
            ;

        wordContainer.append(card);
    });
    manageSpinner(false)

}



// lesson button implement
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json()) // promiss of json data
        .then((json) => displayLessons(json.data))
};
const displayLessons = (lessons) => {
    // 1 get the container & emty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2 get into every lesson
    for (let lesson of lessons) {
        // 3 create buttons for every lesson
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`

        // 4 append into container
        levelContainer.append(btnDiv)
    }
}


function toggleCard(element){

const answer =
element.parentElement.querySelector(".answer")

const icon =
element.querySelector(".icon")

answer.classList.toggle("hidden")

if(answer.classList.contains("hidden")){
icon.innerText = "+"
}
else{
icon.innerText = "-"
}

}

loadLessons();