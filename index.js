const container = document.querySelector('.container');
    // returns the first Element within the document that matches the specified selector, or group of selectors.
    // If no matches are found, null is returned.
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'e6a2853bf8e330c00f3520a8e3befcf1';
    const city = document.querySelector('.search-box input').value;
        // .value represents the value entered by user

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then
    (json => {

        if (json.cod === '404'){  
                // if the api responds with '404' this code is initiated,
                //  the "cod" property represents the HTTP response code.
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');  // this applies FadeIn in class to error404
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity');
        const wind = document.querySelector('.weather-details  .wind span');
        
        switch (json.weather[0].main) {
            //  json.weather[0].main represents the main weather condition for the
            // given location. It is an array, and [0] is used to access the first
            // element of that array, which contains information
            // about the current weather conditions.
            
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Cloud':
                image.src = 'images/cloud.png';
                break;

            case 'Mist':
                image.src = 'images/mist.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            default:
                image.src = '';
        }
        
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        
        // this resets code to default based on css:
        weatherBox.style.display = '';     
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    })
})