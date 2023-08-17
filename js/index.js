const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector(".searchBtn");
const allData = document.querySelector("#allData");
const soundIcon = document.querySelector("#soundIcon");
const sound = document.querySelector("#sound");

//  ====>> APi URL <<====== //
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
    </ul> `;
      console.log(newData);
      sound.setAttribute("src", `${newData[0].phonetics[1].audio}`);
    })
    .catch((error) => {
      allData.innerHTML = `<p id="errorWord">can't find the meaning of <span>${searchInput.value}</span>. Please Search again!</p>`;
    });
}

function playSound() {
  sound.play();
}

searchBtn.addEventListener("click", () => {
  if (searchInput.value !== "") {
    AllInformation();
  } else {
    allData.innerHTML = `<p id="pressEnterWord">Type Any Word & pres enter to get meaning</p>`;
  }
});













//   const ul = document.createElement("ul");
//   const li1 = document.createElement("li");
//   const li2 = document.createElement("li");
//   const h3 = document.createElement("h3");
//   const p = document.createElement("p");

//   //li1
//   li1.appendChild(h3);
//   li1.appendChild(p);
//   li1.setAttribute("class", "details");
//   h3.textContent = 'WORD';
//   p.textContent = newData[0].word;

//   //li2
//   li2.appendChild(h3);
//   li2.appendChild(p);
//   li2.setAttribute("class", "details");
//   h3.textContent = 'DEFINITION';
//   p.textContent = newData[0].meanings[0].definitions[0].definition;

//   ul.appendChild(li1);
//   ul.appendChild(li2);
//   allData.appendChild(ul);
//   console.log(ul);
