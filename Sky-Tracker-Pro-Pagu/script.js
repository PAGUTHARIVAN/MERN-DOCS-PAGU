/*
const API_KEY =
  "https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=8a839c293d5e3faa609a02db1ec95878&units=metric";
*/
const form = document?.querySelector("form");
const input = document?.getElementById("input");
const search = document?.getElementById("search");
const weatherCard = document?.getElementById("weatherCard");

function setLoadingState(isLoading) {
  weatherCard?.classList.toggle("loading", isLoading);
  if (search) {
    search.disabled = isLoading;
    search.textContent = isLoading ? "Loading..." : "Search";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = input.value.trim();
  if (inputVal === "") return;
  getWeather(inputVal);
  input.value = "";
});

async function getWeather(input) {
  setLoadingState(true);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=8a839c293d5e3faa609a02db1ec95878&units=metric`,
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong:", response.status);
    }
    const data = await response.json();
    console.log(data);

    localStorage.setItem("city", data.name);

    const {
      name,
      main: { temp, humidity },
      weather: [{ description }],
      main: { feels_like },
    } = data;

    document.getElementById("city").innerHTML = "";
    const city = document.createElement("p");
    city.classList.add("city");
    city.textContent = name;
    document.getElementById("city").appendChild(city);

    document.getElementById("temp").innerHTML = "";
    const temp1 = document.createElement("p");
    temp1.classList.add("temp");
    temp1.textContent = `${temp}°c`;
    document.getElementById("temp").appendChild(temp1);

    document.getElementById("humidity").innerHTML = "";
    const humi = document.createElement("p");
    humi.classList.add("humidity");
    humi.textContent = `Humidity: ${humidity}`;
    document.getElementById("humidity").appendChild(humi);

    document.getElementById("description").innerHTML = "";
    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = description;
    document.getElementById("description").appendChild(desc);

    document.getElementById("icon").innerHTML = "";
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const iimage = document.createElement("img");
    iimage.src = iconUrl;
    iimage.style.height = "150px";
    iimage.style.width = "150px";
    document.getElementById("icon").appendChild(iimage);

    document.getElementById("feels").innerHTML = "";
    const feel = document.createElement("p");
    feel.classList.add("feelslike");
    feel.textContent = `${feels_like}°celsius`;
    document.getElementById("feels").appendChild(feel);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingState(false);
  }
}

const savedCity = localStorage.getItem("city") || "Chennai";
getWeather(savedCity);
