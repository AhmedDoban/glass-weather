var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var date = document.querySelector(".date");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector(".description");
var temp = document.querySelector("#temp");
var locationIcon = document.querySelector(".imgIcon");
let otherData = document.querySelector(".other-weather-container");
api = "https://api.openweathermap.org/data/2.5/forecast?";
apiWeatherkey = "118d349a7305ac6c68aabac02ca9c657";

let AllData = [];
// Get location of the user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
// Get position of the user
function showPosition(position) {
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  let LocalFunctionAPi =
    api + `lat=${Latitude}&lon=${Longitude}&appid=${apiWeatherkey}`;
  FeachLocationApi(LocalFunctionAPi);
}

// call api to get the city
async function FeachLocationApi(Api) {
  await fetch(Api)
    .then((res) => res.json())
    .then((data) => {
      inputval.value = data.city.name;
      city.innerHTML = data.city.name;
      locationIcon.src = `/icons/${data.list[0].weather[0].icon}.png`;
      temp.innerHTML = `${convertion(data.list[0].main.temp)}&#8451;`;
      description.innerHTML = data.list[0].weather[0].description;
      for (let i = 0; i < data.list.length; i++) {
        AllData.push(data.list[i]);
      }
      for (let i = 8; i < AllData.length; i = i + 8) {
        let src = `/icons/${AllData[i].weather[0].icon}.png`;
        letSugDiscription = AllData[i].weather[0].description;
        let MinHigh = convertion(AllData[i].main.temp);

        DevGenerator(
          DetDate(AllData[i].dt_txt),
          src,
          MinHigh,
          letSugDiscription
        );
      }
    });

  // FeachWeatherApi();
}

//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.
function convertion(val) {
  return (val - 273).toFixed(0);
}
// button event when click
btn.addEventListener("click", function () {
  FeachWeatherApi();
});

// weather Feach APi
function FeachWeatherApi() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputval.value +
      "&appid=" +
      apiWeatherkey
  )
    .then((res) => res.json())
    .then((data) => {
      var nameval = data["name"];
      var descrip = data["weather"]["0"]["description"];
      var tempature = data["main"]["temp"];
      const icon = data["weather"]["0"]["icon"];
      city.innerHTML = `${nameval}`;
      temp.innerHTML = `${convertion(tempature)}&#8451;`;
      description.innerHTML = `${descrip}`;
      locationIcon.src = `/icons/${icon}.png`;
    });
}

window.addEventListener(
  "load",
  (event) => {
    getLocation();
  },
  [0]
);
inputval.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    FeachWeatherApi();
  }
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

setTimeout(() => {
  let currentDate = new Date();
  let cDay = currentDate.getDay();
  let CMonh = currentDate.getMonth();
  date.innerHTML =
    days[cDay] +
    " ,  " +
    month[CMonh] +
    " ,  " +
    currentDate.getDate() +
    " ,  " +
    currentDate.getFullYear();
}, 1);

// get Data for 5 days
function DevGenerator(h3Value, imgSrc, pValue, h4Valu) {
  let div = document.createElement("div");
  div.classList.add("card");
  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(`${h3Value}`);
  h3.appendChild(h3Text);
  div.appendChild(h3);
  let img = document.createElement("img");
  img.src = imgSrc;
  div.appendChild(img);
  let p = document.createElement("p");
  let pText = document.createTextNode(`${pValue}`);
  p.appendChild(pText);
  div.appendChild(p);
  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(`${h4Valu}`);
  h4.appendChild(h4Text);
  div.appendChild(h4);
  div.dataset.aos = "flip-left";
  div.dataset.aos.easing = "ease-out-cubic";
  div.dataset.aos.duration = "2000";
  otherData.appendChild(div);
}
function DetDate(value) {
  let currentDate = new Date(value);
  let cDay = currentDate.getDay();
  currentDate.getDate();
  return days[cDay] + " " + currentDate.getDate();
}
AOS.init();
