import { vidData } from "./vidData.min.js";
// import { vidData } from "./cutdown.js";
let arrOfVideos = vidData;
let index = 0;
let muteValFromStorage = sessionStorage.getItem("isMuted");

let muted;
let contentIndex;
muteValFromStorage == "true" ? (muted = true) : (muted = false);
if (parseInt(sessionStorage.getItem("contentNumber"))) {
  contentIndex = parseInt(sessionStorage.getItem("contentNumber"));
  console.log(`normal content index ${contentIndex}`);
} else {
  contentIndex = Math.floor(Math.random() * 600) + 101;
  console.log(`randomContentIndex ${contentIndex}`);
}

let currentVid;
let currentBtn;
let currentMuteText;

const mySwiper = new Swiper(".swiper-container", {
  on: {
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    init: function () {
      let i = contentIndex;
      let allSlides = document.querySelectorAll(".swiper-slide");
      allSlides.forEach((slide, index) => {
        slide.innerHTML = `<div class='swiper-slide' >
        <video  height="100%" id='${contentIndex}'   loop  muted playsinline >
        
            <source src="${arrOfVideos[i].url}" type="video/mp4">
        
          Your browser does not support the video tag.
          </video>
        
        
        <div id="overlay-text">
        
            <p id="username">@${
              arrOfVideos[i].screen_name
            }</p><p id="description">${arrOfVideos[i].description}</p>
        </div>
        
        <div class="banner">
        ${
          i % 7 === 0
            ? `<p><span class="top-span">#TwikTwok</p></span>`
            : i % 9
            ? `  <p>
            <svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>
             <span class="top-span">x TikTok = <span class="bold-span">TwikTwok</span></span>
           </p>`
            : `<p><span class="top-span">   <svg class="icon icon-product-hunt"><use xlink:href="#icon-product-hunt"></use></svg>`
        }
        </div>
        
          <div id="overlay">
   
          <div class="overlay-item">
          <a href="${arrOfVideos[i].userUrl}" target="_blank">
        <img src="${arrOfVideos[i].avatar}" id = "avatar" alt="user"/>
        </a>
        </div >
           <div class="overlay-item">
            <a class="modal-trigger" href="#modal1" >  <svg class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg></a> <p class ="xnumber">${
              arrOfVideos[i].favorite_count
            }</p>
           </div >
          <div class="overlay-item">
       
          <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftwiktwok.github.io&text=TwikTwok%20-%20twitter%20meets%20tik%20tok.%20Swipe%20through%20the%20best%20videos%20on%20twitter&hashtags=twikTwok" target="_blank">
          <svg class="icon icon-mail-forward"><use xlink:href="#icon-mail-forward"></use></svg></i></a>
             
              <p class ="xnumber">${arrOfVideos[i].retweet_count}</p>
             
              </div >
              <div class="overlay-item ">
          <button  id="muteBtn" class="mute-btn mute-class name="mute" ">
            
          <svg class="icon icon-volume-off"><use xlink:href="#icon-volume-off"></use></svg>
           


          </button>
          <p class ="xnumber muted-text mute-class ">Sound</p>
            </div>
          
        
        
        </div>
        
        </div>
  
        `;

        i++;
      });
    },
  },
  direction: "vertical",
});

mySwiper.on("observerUpdate", () => {
  console.log("updated");
});
playCurrentVid();

mySwiper.setGrabCursor("button");

function playCurrentVid() {
  let allVids = document.querySelectorAll("video");
  allVids.forEach((vid) => vid.pause());
  let currentSlide = mySwiper.slides[index];
  currentVid = currentSlide.querySelector("video");
  currentVid.currentTime = 0;

  currentBtn = currentSlide.querySelector("button");
  currentMuteText = currentSlide.querySelector(".muted-text");
  currentBtn.addEventListener("click", handleMuteClick);
  currentVid.play();
  let playPromise = currentVid.play();
  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        console.log("playing..", currentSlide.querySelector());
      })
      .catch(function (error) {
        console.log("error", error);
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
  }
  //fav
  // let currentHeart = currentSlide.querySelector(".modal-trigger");
}

function handleMuteClick() {
  currentVid.muted = !currentVid.muted;
  if (currentVid.muted) {
    currentBtn.innerHTML =
      '<svg class="icon icon-volume-off"><use xlink:href="#icon-volume-off"></use></svg>';

    currentBtn.classList.add("mute-class");
    currentMuteText.classList.add("mute-class");
  } else {
    currentBtn.innerHTML =
      '<svg class="icon icon-volume-up"><use xlink:href="#icon-volume-up"></use></svg>';

    currentBtn.classList.remove("mute-class");
    currentMuteText.classList.remove("mute-class");
  }
}

function incrementIndexes(plus) {
  if (plus) {
    contentIndex++;
    index++;
    playCurrentVid();
  } else {
    contentIndex--;
    index--;
    playCurrentVid();
  }
}

mySwiper.on("slidePrevTransitionStart", () => {
  incrementIndexes(false);
});
mySwiper.on("slideNextTransitionStart", () => {
  incrementIndexes(true);

  // mySwiper.removeSlide([0]);
  // mySwiper.appendSlide('<div class="swiper-slide">Slide "</div>');

  if (index == 20) {
    sessionStorage.setItem("contentNumber", `${contentIndex}`);
    sessionStorage.setItem("isMuted", `${muted}`);
    // window.location.href = "/test2.html";
    location.reload();
  }
});
// mySwiper.on("reachBeginning", (swiper) => {
//   // mySwiper.prependSlide('<div class="swiper-slide">Slide "</div>');
//   // mySwiper.prependSlide('<div class="swiper-slide">Slide "</div>');
//   // mySwiper.removeSlide(mySwiper.slided.length - 1);
//   // mySwiper.removeSlide(mySwiper.slided.length - 2);
// });
// mySwiper.on("reachEnd", (swiper) => {
//   mySwiper.removeSlide([0]);
//   mySwiper.removeSlide([0]);
//   mySwiper.appendSlide('<div class="swiper-slide">YO "</div>');
//   mySwiper.appendSlide('<div class="swiper-slide">Slide "</div>');
// });
