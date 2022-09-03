var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var locationIcon = document.querySelector(".weather-icon");
var error = document.querySelector("#snackbar");

apik = "118d349a7305ac6c68aabac02ca9c657";
function convertion(val) {
  return (val - 273).toFixed(2);
}
btn.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputval.value +
      "&appid=" +
      apik
  )
    .then((res) => res.json())
    .then((data) => {
      var nameval = data["name"];
      var descrip = data["weather"]["0"]["description"];
      var tempature = data["main"]["temp"];
      var wndspd = data["wind"]["speed"];
      const icon = data["weather"]["0"]["icon"];
      city.innerHTML = `<span>${nameval}<span>`;
      temp.innerHTML = `Temperature <br> <span>${convertion(
        tempature
      )} C</span>`;
      description.innerHTML = `Sky Conditions <br> <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed <br><span>${wndspd} km/h<span>`;
      locationIcon.innerHTML = `<img src="icons/${icon}.png" style="animation:none">`;
    })
    .catch(
      (err) => (
        (error.className = "show"),
        (error.innerHTML = "You entered Wrong city name")
      ),
      setTimeout(function () {
        error.className = error.className.replace("show", "");
      }, 3000)
    );
});


/* ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
    rain
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ */

setInterval(rainFall, 10);

function rainFall() {
  const waterDrop = document.createElement("i");
  waterDrop.classList.add("fas");
  waterDrop.classList.add("fa-tint");
  waterDrop.style.left = Math.random() * window.innerWidth + "px";
  waterDrop.style.animationDuration = Math.random() * 1 + "s";
  waterDrop.style.opacity = Math.random() + 0.4;
  waterDrop.style.fontSize = Math.random() * 15 + "px";

  document.body.appendChild(waterDrop);

  setTimeout(() => {
    waterDrop.remove();
  }, 6000);
}
