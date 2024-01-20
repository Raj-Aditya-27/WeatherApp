let weather = {
    apiKey: "ffee8fe64a4ef177a4b2d26a54744fa2",
    fetchWeather: function (city) {

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        ).then((Response) => {
            if (!Response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return Response.json();
        })
            .then((data) => {
                localStorage.setItem("lastSearchedCity", city);
                this.displayWeather(data);
            })
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector("#description").innerText = description;
        document.querySelector("#temp").innerText = temp + " °C";
        document.querySelector("#humidity").innerText = humidity + " %";
        document.querySelector("#wind").innerText = speed + " km/hr"
        document.querySelector("#temperatureDiv").classList.remove("loading");
        document.querySelector(".loadingIndication").innerText = "";
    },

    search: function () {
        this.fetchWeather(document.getElementById("searchInput").value);
    }
};

document.querySelector("#searchIcon").addEventListener("click", function () {
    weather.search();
});

document.querySelector("#searchBar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

const lastSearchedCity = localStorage.getItem('lastSearchedCity');

if (lastSearchedCity) {
    weather.fetchWeather(lastSearchedCity);
}
else {
    weather.fetchWeather("Mumbai");
}