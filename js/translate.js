// let translate = document.getElementById("translate");
// let htext = document.querySelectorAll(".tr");


// let ARB = document.getElementById("ARB");
// let ENG = document.getElementById("ENG");
// let footer = document.getElementById('footer')


// let ENGLANG2 = document.querySelectorAll ('.ENGLANG-tr');
// let ARBLANG2 = document.querySelectorAll ('.ARBLANG-tr');

// let Aboutus=document.getElementById('About-us');

// console.log(ENGLANG2);


// ARB.addEventListener("change", function () {
//   console.log("Ammar Ahmed mostaf");
// });

// let englishArray = [];
// htext.forEach((text) => {
//   englishArray.push(text.innerText);
// });
// function trans(arrOfLetters, fromLang, toLang) {
//   fetch(
//     `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(
//       arrOfLetters.join("\n")
//     )}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       if (data && data[0] && data[0][0]) {
//         const translatedArray = data[0].map((item) => item[0]);
//         translatedArray.forEach((e, i) => {
//           htext[i].innerText = e;
//         });
//       } else {
//         console.error("Failed to translate the array.");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// if (localStorage.getItem("lang")) {
//   trans(englishArray, "en", "ar");
// }

// translate.addEventListener("change", (e) => {
//   if (e.target.value == 3) {
   
//     //translate from en to ar
//     trans(englishArray, "en", "ar");
//     localStorage.setItem("lang", "ar");

//     ENGLANG2.forEach((e)=>e.style.display='none')
//     ARBLANG2.forEach((e)=>e.style.display='block')
//     Aboutus.style.direction='rtl';

//     footer.style.direction='rtl';
//   } else if (e.target.value == 2) {
 
//     trans(englishArray, "ar", "en");
//     localStorage.removeItem("lang");

//     ENGLANG2.forEach((e)=>e.style.display='block')
//     ARBLANG2.forEach((e)=>e.style.display='none')
//     Aboutus.style.direction='ltr';
//     footer.style.direction='ltr';

//   }
// });








