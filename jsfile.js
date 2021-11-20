api = key; //gets api key from file to protect it

const sunriseDOM = document.querySelector('#sunrise');
window.addEventListener('load', () => { //upon load, prompt for location
    //variables for longitude and latitude respectively
    let long;
    let lat;
    if(navigator.geolocation){ //if the user allows location
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`; //makes api call using coords and key
            console.log(base); //logs results of call
            fetch(base)
            .then((response) => {
                return response.json(); //converts into a JSON object
            })
            .then((data) => { //destructures response
                const temp = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {sunrise, sunset} = data.sys;
                //uses icon variable to get default image from openweathermap
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                //converts temperature to fahrenheit
                const fahrenheit = (temp * 9) / 5 + 32;
                //convert Epoch/Unix time to local time
                const riseLocal = new Date(sunrise * 1000);
                const setLocal = (new Date(sunset * 1000)).toLocaleTimeString;
                console.log(riseLocal);
                sunriseDOM.textContent = `${riseLocal}`;
            })
        }); 
    }
});