window.addEventListener('load', () => {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            // defining city name to search about 
            let city = prompt("Enter your city !");

            // this link is to call the API for a default city which is cairo
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dc023d80003286876de2d412b79139dd`;

            // start fetching API Url
            fetch(API_URL)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });
        });
    }
});