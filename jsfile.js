api = '13ee65b39c125aa6d753f4dc4a4f45cd';
//constants used to edit the text on the site
const iconImg = document.getElementById('weather-icon');
const loc = document.getElementById('location');
const tempF = document.getElementById('far');
const desc = document.getElementById('desc');
const sunriseDOM = document.querySelector('#sunrise');
const sunsetDOM = document.querySelector('#sunset');
window.addEventListener('load', () => { //upon load, prompt for location
    //variables for longitude and latitude respectively
    let long;
    let lat;
    if(navigator.geolocation){ //if the user allows location
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //makes api call using coords and key
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            fetch(base)
            .then((response) => {
                return response.json(); //converts into a JSON object
            })
            .then((data) => { //destructures response from api call
                const {temp} = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {sunrise, sunset} = data.sys;
                //uses icon variable to get default image from openweathermap
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                //converts temperature to fahrenheit
                const fahrenheit = (temp * 9) / 5 + 32;
                //convert Epoch/Unix time to local time
                const riseLocal = new Date(sunrise * 1000);
                const setLocal = (new Date(sunset * 1000));
                iconImg.src = iconUrl;
                loc.textContent = `${place}`;
                desc.textContent = `${description}`;
                tempF.textContent = `${fahrenheit} °F`;
                sunriseDOM.textContent = `${riseLocal.toLocaleDateString()}, ${riseLocal.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${setLocal.toLocaleDateString()}, ${setLocal.toLocaleTimeString()}`
            })
        }); 
    }
});