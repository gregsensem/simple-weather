const inputForm =document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon');
const forecast = new Forecast;

const updateUI = (data) =>{
    // const cityCode = data.cityCode;
    // const weather = data.weather;
    const {cityCode, weather} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityCode.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night/day icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src',iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    // //remove the d-none class if present
    // if(card.classList.contains('d-none')){
    //     card.classList.remove('d-none');
    // }    
}

const defaultCity = 'buffalo'; 
    //update the UI with the default city
    forecast.updateCity(defaultCity)
    .then(data =>updateUI(data))
    .catch(err =>console.log(err));


inputForm.addEventListener('submit',e =>{
    e.preventDefault();

    //get city value
    const city = inputForm.cityname.value.trim(); 
    inputForm.reset();
    //update the UI with the new city
    forecast.updateCity(city)
    .then(data =>updateUI(data))
    .catch(err =>console.log(err));

    //set local storage
    localStorage.setItem('city',city);

})

 if(localStorage.getItem('city')){
     forecast.updateCity(localStorage.getItem('city'))
     .then(data =>updateUI(data))
     .catch(err =>console.log(err));
 }

