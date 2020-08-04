import { firstVids } from "./firstVids.js";
let muted,
  arrOfVideos = firstVids,
  index = 0,
  muteValFromStorage = sessionStorage.getItem("isMuted");
muted = !("true" != muteValFromStorage);
let currentVid,
  currentBtn,
  currentMuteText,
  contentIndex = parseInt(sessionStorage.getItem("contentNumber"));
var mySwiper = new Swiper(".swiper-container", {
  on: {
    init: function () {
      let a = contentIndex,
        b = document.querySelectorAll(".swiper-slide");
      b.forEach((b) => {
        (b.innerHTML = `<div class='swiper-slide' >
        <video  height="100%" id='${contentIndex}'   loop  muted playsinline >
        
            <source src="${arrOfVideos[a].url}" type="video/mp4">
        
          Your browser does not support the video tag.
          </video>
        
        
        <div id="overlay-text">
        
            <p id="username">@${
              arrOfVideos[a].screen_name
            }</p><p id="description">${arrOfVideos[a].description}</p>
        </div>
        
        <div class="banner">
        ${
          0 == a % 7
            ? `<p><span class="top-span">#TwikTwok</p></span>`
            : a % 9
            ? `  <p>
            <svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>
             <span class="top-span">x TikTok = <span class="bold-span">TwikTwok</span></span>
           </p>`
            : `<p><span class="top-span">   <svg class="icon icon-product-hunt"><use xlink:href="#icon-product-hunt"></use></svg>`
        }
        </div>
        
          <div id="overlay">
       
          <div class="overlay-item">
          <a href="${arrOfVideos[a].userUrl}" target="_blank">
        <img src="${arrOfVideos[a].avatar}" id = "avatar" alt="user"/>
        </a>
        </div >
           <div class="overlay-item">
            <a class="modal-trigger" href="#modal1" >  <svg class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg></a> <p class ="xnumber">${
              arrOfVideos[a].favorite_count
            }</p>
           </div >
          <div class="overlay-item">
       
          <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftwiktwok.github.io&text=TwikTwok%20-%20twitter%20meets%20tik%20tok.%20Swipe%20through%20the%20best%20videos%20on%20twitter&hashtags=twikTwok" target="_blank">
          <svg class="icon icon-mail-forward"><use xlink:href="#icon-mail-forward"></use></svg></i></a>
             
              <p class ="xnumber">${arrOfVideos[a].retweet_count}</p>
             
              </div >

              <div class="overlay-item">
              <a href="/faq.html" target="_blank" id="faq">?</a>
     
              </div>
              <div class="overlay-item ">
          <button  id="muteBtn" class="mute-btn mute-class name="mute" ">
            
          <svg class="icon icon-volume-off"><use xlink:href="#icon-volume-off"></use></svg>
           


          </button>
          <p class ="xnumber muted-text mute-class ">Sound</p>
            </div>

          
        
        
        </div>
        
        </div>
  
        `),
          a++;
      });
    },
  },
  direction: "vertical",
});
playCurrentVid(), mySwiper.setGrabCursor("button");
function playCurrentVid() {
  let a = document.querySelectorAll("video"),
    b = mySwiper.slides[index];
  (currentVid = b.querySelector("video")),
    a.forEach((a) => a.pause()),
    (currentBtn = b.querySelector("button")),
    (currentMuteText = b.querySelector(".muted-text")),
    currentBtn.addEventListener("click", handleMuteClick);
  let c = currentVid.play();
  c !== void 0 && c.then(() => {}).catch(() => {});
  b.querySelector(".modal-trigger");
}
function handleMuteClick() {
  (currentVid.muted = !currentVid.muted),
    currentVid.muted
      ? ((currentBtn.innerHTML =
          '<svg class="icon icon-volume-off"><use xlink:href="#icon-volume-off"></use></svg>'),
        currentBtn.classList.add("mute-class"),
        currentMuteText.classList.add("mute-class"))
      : ((currentBtn.innerHTML =
          '<svg class="icon icon-volume-up"><use xlink:href="#icon-volume-up"></use></svg>'),
        currentBtn.classList.remove("mute-class"),
        currentMuteText.classList.remove("mute-class"));
}
function handleAllMuteClick() {}
function incrementIndexes(a) {
  a
    ? (contentIndex++, index++, playCurrentVid())
    : (contentIndex--, index--, playCurrentVid());
}
mySwiper.on("slidePrevTransitionStart", () => {
  incrementIndexes(!1);
}),
  mySwiper.on("slideNextTransitionStart", () => {
    incrementIndexes(!0),
      9 == index &&
        (sessionStorage.setItem("contentNumber", `${contentIndex}`),
        sessionStorage.setItem("isMuted", `${muted}`),
        (window.location.href = "/test2.html"));
  });
var currentLocation = window.location;
if (
  "/" == currentLocation.pathname ||
  "/index.html" == currentLocation.pathname
) {
  const a = document.querySelector(".splash");
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      a.classList.add("display-none");
    }, 1500);
  });
} else console.log("no splash screen");
