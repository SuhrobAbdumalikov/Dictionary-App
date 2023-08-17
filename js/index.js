const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector(".searchBtn");
const allData = document.querySelector("#allData");
const soundIcon = document.querySelector("#soundIcon");
const sound = document.querySelector("#sound");
const readMoreBtn = document.querySelector("#readMore");
const appInput = document.querySelector(".appInput");
const checkWifi = document.querySelector(".checkWifi");
const wifiIcon = document.querySelector(".wifiIcon");
const titleWifi = document.querySelector("#title");
const pTitle = document.querySelector("#pTitle");
const reconnectBtn = document.querySelector("#reconnectBtn");

// ======>> check connection <<=========
// if (navigator.onLine) {
//   console.log("oneline");
//   checkWifi.style.marginTop = 0;
//   checkWifi.style.visibility = "visible";
//   checkWifi.style.borderTop = "3px solid #26b126";
//   wifiIcon.style.backgroundColor = "#26b126";
//   titleWifi.textContent = "You are now online";
//   reconnectBtn.style.backgroundColor = "#26b126";
//   reconnectBtn.textContent = "Restore";
//   return setTimeout(() => {
//     checkWifi.style.marginTop = 0;
//     checkWifi.style.visibility = "visible";
//   }, 5000);
// } else {
//   console.log("offnline");
//   checkWifi.classList.remove("online");
//   checkWifi.classList.add("show");
// }

if (navigator.onLine) {
  setTimeout(() => {
    checkWifi.style.marginTop = 0;
    checkWifi.style.visibility = "visible";
    titleWifi.textContent = "Online";
    checkWifi.style.borderTop = "3px solid #26b126";
    wifiIcon.style.backgroundColor = "#26b126";
    titleWifi.textContent = "You are now online";
    reconnectBtn.style.backgroundColor = "#26b126";
    reconnectBtn.textContent = "Restore";
  }, 1000);
}
// }else{
//   setTimeout(() => {
//     checkWifi.style.marginTop = '-25%';
//     checkWifi.style.visibility = "hidden";
//     titleWifi.textContent = "Online";
//     checkWifi.style.borderTop = "3px solid #26b126";
//     wifiIcon.style.backgroundColor = "#26b126";
//     titleWifi.textContent = "You are now online";
//     reconnectBtn.style.backgroundColor = "#26b126";
//     reconnectBtn.textContent = "Restore";
//   }, 2000);
// }

window.addEventListener("online", () => {
  setTimeout(() => {
    checkWifi.style.marginTop = "0";
    checkWifi.style.visibility = "visible";
    checkWifi.style.borderTop = "3px solid #26b126";
    wifiIcon.style.backgroundColor = "#26b126";
    titleWifi.textContent = "You are now online";
    reconnectBtn.style.backgroundColor = "#26b126";
    reconnectBtn.textContent = "Restore";
  }, 1000);
});

window.addEventListener("offline", () => {
  setTimeout(() => {
    checkWifi.style.marginTop = "0";
    checkWifi.style.visibility = "visible";
    titleWifi.textContent = "You are offline now";
    checkWifi.style.borderTop = "3px solid red";
    wifiIcon.style.backgroundColor = "red";
    reconnectBtn.style.backgroundColor = "red";
    reconnectBtn.textContent = "Reconnect";
  }, 1000);
});

reconnectBtn.addEventListener("click", () => {
  if (reconnectBtn.textContent === "Restore") {
    checkWifi.style.marginTop = "-25%";
    checkWifi.style.visibility = "hidden";
  }
});

//  ====>> APi URL and Dictionary App <<====== //
function AllInformation() {
  const APiURl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`;
  fetch(APiURl)
    .then((data) => {
      const response = data.json();
      return response;
    })
    .then((newData) => {
      allData.innerHTML = `<ul>
        <li class="details">
            <div class="soundAndWord">
                <h3 class="type">WORD</h3>
                <i class="fa-solid fa-volume-high" id="soundIcon" onclick="playSound()"></i>
            </div>
            <p><strong>${newData[0].word}</strong> = ${
        newData[0].phonetics[1].text
      }</p>
        </li>
        <li class="details">
            <h3 class="type">DEFINITION</h3>
            <p><strong>${
              newData[0].meanings[0].definitions[0].definition
            }</strong></p>
        </li>
        <li class="details">
            <h3 class="type">EXAMPLE</h3>
            <p>${newData[0].meanings[0].definitions[0].example || ""}</p>
        </li>
        <li class="details">
            <h3 class="type">PART OF SPEECH</h3>
            <p><em><strong>[${
              newData[0].meanings[0].partOfSpeech
            }]</strong></em></p>
        </li>
           <li class="readBtnLi"><a href="${
             newData[0].sourceUrls
           }" id="readMore">Read More</a></li>
    </ul> `;
      console.log(newData);
      sound.setAttribute("src", `${newData[0].phonetics[1].audio}`);
      searchInput.value = "";
    })
    .catch((error) => {
      allData.innerHTML = `<p id="errorWord">can't find the meaning of <span>${searchInput.value}</span>. Please Search again!</p>`;
    });
}

function playSound() {
  sound.play();
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.value !== "") {
    AllInformation();
  } else {
    // allData.innerHTML = `<p id="pressEnterWord">Type Any Word & pres enter to get meaning</p>`;
  }
});

searchBtn.addEventListener("click", () => {
  if (searchInput.value !== "") {
    AllInformation();
    localStorage.setItem("fullInformation", searchInput.value);
  } else {
    allData.innerHTML = `<p id="pressEnterWord">Type Any Word & pres enter to get meaning</p>`;
  }
});
