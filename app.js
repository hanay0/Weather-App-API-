// selecting html elements where the data will be shown
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let cityChooser = document.querySelector('.city-name');
    let myButton = document.querySelector('.search');




    myButton.addEventListener('click', function(city){
        // assign the typed city to the variable 'city'
        city = cityChooser.value;

        // this link is to call the API for a default city which is cairo
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dc023d80003286876de2d412b79139dd`;

        // start fetching API Url
        fetch(API_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                // here are the temperature/ minimum / maximum/ humidity
                const {temp, temp_min, temp_max, humidity} = data.main;
                // a little description about the weather 
                const description = data.weather[0].main;
                temperatureDescription.textContent = description;
                
                // show the degree of the choosen city
                temperatureDegree.textContent = Math.round(temp);
                
                
                // getting the zone (city) where the weather is shown and show it's name
                const zoneCity = data.name;
                locationTimezone.textContent = zoneCity;
            });
    })
    

    
            
        

            
           
            
    