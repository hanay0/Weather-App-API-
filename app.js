// selecting html elements where the data will be shown
let temperatureDegree = document.querySelector('.temperature-degree'),
    tempWrapper = document.querySelector('.temperature-wrapper'),
    temperatureDegreeUnit = document.querySelector('.temperature-wrapper .degree-section span'),
    temperatureDescription = document.querySelector('.temperature-description'),
    locationWrapper = document.querySelector('.location'),
    locationTimezone = document.querySelector('.location-timezone'),
    cityChooser = document.querySelector('.city-name'),
    minSection = document.querySelector('.min-section p'),
    maxSection = document.querySelector('.max-section p'),
    humiditySection = document.querySelector('.humidity-section p'),
    searchButton = document.querySelector('.search'),
    errorHandler = document.querySelector('.error-handler'),
    loadingSpinner = document.querySelector('.spinner'),
    icon = document.querySelector('.location p .weather-icon');


searchButton.addEventListener('click', function (city) {
    // assign the typed city to the variable 'city'
    city = cityChooser.value;
    temperatureDegreeUnit.innerHTML = `C`;
    // this link is to call the API for an input from the user
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dc023d80003286876de2d412b79139dd`;


    // calling this function to show spinner while the datea is loading
    showSpinner();
    // start fetching API Url
    fetch(API_URL)
        .then(response => {
            return response.json();
        })
        .then(data => {


            // calling this function to hide the spinner after the data loads
            removeSpinner();
            showResult();

            if (data.message === "city not found") {
                document.body.innerHTML = `This city can't be found .. Please try again`;
                document.body.append(errorHandler);
                document.body.classList.add('error-page');
                errorHandler.style.display = 'block';
            }

            // calling this function to start animations 
            animations();

            console.log(data);


            // here are the temperature/ minimum / maximum/ humidity
            let {
                temp,
                temp_min,
                temp_max,
                humidity
            } = data.main;
            // show the degree of the choosen city
            temperatureDegree.textContent = Math.round(temp);
            let newTemp = temp * (9 / 5) + 32;

            temperatureDegree.addEventListener('click', tempToFahrenheit);

            // this function is to transfer from celsius to fahrenheit while clicking on the temperature
            function tempToFahrenheit() {
                if (temperatureDegreeUnit.innerHTML === `C`) {
                    temperatureDegreeUnit.innerHTML = `F`;
                    temperatureDegree.innerHTML = Math.round(newTemp);
                    minSection.textContent = Math.round(temp_min * (9 / 5) + 32);
                    maxSection.textContent = Math.round(temp_max * (9 / 5) + 32);
                } else {
                    temperatureDegreeUnit.innerHTML = `C`;
                    temperatureDegree.innerHTML = Math.round(temp);
                    minSection.textContent = Math.round(temp_min);
                    maxSection.textContent = Math.round(temp_max);

                }
            }

            // show minimum degree
            minSection.textContent = Math.round(temp_min);

            // show maximum section
            maxSection.textContent = Math.round(temp_max);

            // show humidity percentage
            humiditySection.textContent = `${humidity} %`;

            // a little description about the weather 
            const description = data.weather[0].main;

            temperatureDescription.textContent = description;

            // getting the name of country where the city exists
            const country = data.sys.country;

            // getting the zone (city) where the weather is shown and show it's name
            const zoneCity = `${data.name} , ${country}`;
            locationTimezone.textContent = zoneCity;


            // this function is to change the icon with each climate condition
            function iconsGetter() {
                switch (description) {

                    // clear case
                    case 'Clear':
                        icon.setAttribute('class', `animate__animated animate__pulse animate__infinite infinite animate__slow fas fa-sun fa-6x`);
                        break;

                        // snow case
                    case 'Snow':
                        icon.setAttribute('class', `animate__animated animate__pulse animate__infinite infinite animate__slow fas fa-snowflake fa-6x`);
                        break;

                        // clouds case
                    case 'Clouds':
                        icon.setAttribute('class', `animate__animated animate__pulse animate__infinite infinite animate__slow fas fa-cloud-meatball fa-6x`);
                        break;

                        // fog case
                    case 'Fog':
                        icon.setAttribute('class', `animate__animated animate__pulse animate__infinite infinite animate__slow fas fa-smog fa-6x`);
                        break;

                        // rain case
                    case 'Rain':
                        icon.setAttribute('class', `animate__animated animate__pulse animate__infinite infinite animate__slow fas fa-cloud-rain fa-6x`);
                        break;
                }
            }
            iconsGetter();

        });
})


// set a function to show the spinner loading before the data comes out
function showSpinner() {
    loadingSpinner.classList.add('show');
}

function removeSpinner() {
    loadingSpinner.classList.remove('show');
    loadingSpinner.style.display = 'none';
}

// set a function to show the result after spinner loading 
function showResult() {
    locationTimezone.classList.remove('hide');
    tempWrapper.classList.remove('hide');
    locationWrapper.classList.remove('hide');

}


// adding some animations to degrees boxes
function animations() {
    temperatureDegree.classList.add('animate__animated', 'animate__zoomIn');
    minSection.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-.2s');
    maxSection.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-.4s');
    humiditySection.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-.6s');
    humiditySection.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-.6s');
    icon.classList.add('animate__animated', 'animate__fadeIn');
}