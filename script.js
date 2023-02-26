import playList from './playList.js';
console.log(playList);

const time = document.querySelector(".time");
let date = new Date();
let currentTime = date.toLocaleTimeString();

const dateBox = document.querySelector(".date");
const options = {weekday: "long", month: "long", day: "numeric", timeZone: "UTC"};
const currentDate = date.toLocaleDateString("en-BR", options);

function showDate() {
    dateBox.textContent = currentDate;
}

const greeting = document.querySelector(".greeting");
const hours = date.getHours();
let g = "";

function getTimeOfDay() {
    if(hours >= 6 && hours < 12) 
    g = "Good morning";
    if(hours >= 12 && hours < 18)
    g = "Good afternoon";
    if(hours >= 18 && hours < 24)
    g = "Good evening";
    if(hours >= 0 && hours < 6)
    g = "Good night";
}
getTimeOfDay()


function showGreeting() {
    greeting.textContent = g
}

function showTime() {
    date = new Date();
   currentTime = date.toLocaleTimeString();
   time.textContent = currentTime;
   showDate()
   showGreeting()
}
showTime()
setInterval(showTime,1000)

function setLocalStorage() {
    const name = document.querySelector(".name");
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        const name = document.querySelector(".name");
        name.value = localStorage.getItem('name');
    }
  }
window.addEventListener('load', getLocalStorage);

// Фоновое изображение

const sliderPrev = document.querySelector(".slide-prev");
const sliderNext = document.querySelector(".slide-next");
const body = document.querySelector(".body");
let imgNum = 1;

body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/01.jpg')";

function getRandomNumImg(a, b) {
    const minImg = Math.ceil(a);
    const maxImg = Math.floor(b);
    return Math.floor(Math.random() * (maxImg - minImg + 1)) + minImg;
}
console.log(getRandomNumImg(0,21))

function setBg() {
    let index = imgNum;
    if (index < 10){
        index = "0" + index;
    }
    const img = new Image();
    const link = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${index}.jpg`;
    img.src = link;
    img.onload = () => {      
      document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${index}.jpg")`;
    };
}
function getRandomBgIndex() {
    const timeDay = currentTime;
    let bgNum = getRandomNumImg(0,21);
    return bgNum;

}
validateImgIndex()
setBg()


sliderNext.addEventListener("click",() => {
    imgNum++
    validateImgIndex()
    setBg()
})

function validateImgIndex(){
    if (imgNum === 20){
        imgNum = 1
    }
    if (imgNum === 0){
        imgNum = 20
    }
}

sliderPrev.addEventListener("click",() => {
    imgNum--
    validateImgIndex()
    setBg()
})

// Погода

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector(".city");

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=00656e88ddf9d2a1668623df337515cd&units=metric`;
  const res = await fetch(url);
  let data = await res.json(); 
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}


city.addEventListener("change",() => {
    getWeather()
});

city.addEventListener("keypress",(e) => {
    if(e.key === "Enter"){
        getWeather()
    }
});

function setCityLocalStorage(){
    const city = document.querySelector('.city');
    localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setCityLocalStorage);

function getCityLocalStorage(){
    if(localStorage.getItem("city")){
        const city = document.querySelector(".city");
        city.value = localStorage.getItem("city");
    }
}
window.addEventListener("load", getCityLocalStorage);

function getRandomNum(a, b) {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(getRandomNum(0,21))

async function getRandomQuote() {  
    const res = await fetch("data.json");
    let data = await res.json();
    const quotes = data.quotes;
    const randomIndex = getRandomNum(0,quotes.length);
    return quotes[randomIndex];
  }

const changeQuote = document.querySelector(".change-quote");

changeQuote.addEventListener("click",async () =>{
    const quote = await getRandomQuote();
    const textContainer = document.querySelector(".text");
    const authorContainer = document.querySelector(".author");
    textContainer.textContent = quote.text;
    authorContainer.textContent = quote.author;
    
})

const buttonPlay = document.querySelector(".play");
const buttonPause = document.querySelector(".pause");
const buttonNext = document.querySelector(".play-next");
const buttonPrev = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
const player = document.querySelector(".player");
const audio = new Audio();
let isPlay = false;
let playNum = 0;
buttonPlay.classList.remove("hide");
const li = document.createElement("li");

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if(!isPlay);
    audio.play();
}


function pauseAudio() {
    if(isPlay);
    audio.pause();
}

buttonPlay.addEventListener("click",() => {
    buttonPlay.classList.add("hide");
    buttonPause.classList.remove("hide");
    isPlay = true;
    playAudio()
})

buttonPause.addEventListener("click",() => {
    buttonPause.classList.add("hide");
    buttonPlay.classList.remove("hide");
    isPlay = false;
    pauseAudio()
})

buttonNext.addEventListener("click",() => {
    playNum++
    validateSongIndex()
    playAudio()
})
function validateSongIndex(){
    if (playNum === 4){
        playNum = 0
    }
    if (playNum === -1){
        playNum = 3
    }
}

buttonPrev.addEventListener("click",() => {
    playNum--
    validateSongIndex()
    playAudio()
})


playList.forEach(elem => {
    const title = elem.title;
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = title;
    playListContainer.append(li);
})


async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=0hxZsCDjn19OSn__EnRj29m3z_NFjw8kfoBCCfmZxgA';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
   }
getLinkToImage()

async function getLinkToImageF() {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=714518f76c6e5c756ffd9060f1e7ddf2&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.urls.regular)
   }
getLinkToImageF()

const formContainer = document.getElementById("form-container");
const toDoInput = document.querySelector(".toDo-input");
let list = document.getElementById('list');

formContainer.addEventListener("submit", (e) => {
      e.preventDefault();
     createItem(toDoInput.value);
})

function createItem(x){
  let ourHTML = `<li> ${x}</li>`;
  list.insertAdjacentHTML("beforeend", ourHTML);
  toDoInput.value = "";
  toDoInput.focus();
}

