class Forecast{
    constructor(){
        this.key = 'bn9DFZO3UoZvAggmxmRoehY4Ce4UKrQo';
        this.city_url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weather_url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){
        const cityCode = await this.getCity(city)
        const weather = await this.getWeather(cityCode.Key)
        return{cityCode, weather}
    }

    //get city info
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.city_url+query);
        const data = await response.json()
        return data[0];
    }

    //get weather info
    async getWeather(cityKey){
        const query = `${cityKey}?apikey=${this.key}`;
        const response = await fetch(this.weather_url+query);
        const data = await response.json(); 
        return data[0];
    }
}