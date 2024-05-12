import axios from 'axios'

export default interface WeatherDataI {
  name: string
  temp: number
  humidity: number
  icon: string
  weather_main: string
  weather_description: string
  timezone: number
  iconUrl: string
}

const API_KEY = '8e8f5ab94e96e6bc444a243660e5ce13'

export async function getWeatherByCity(city: string) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await axios.get(url)
    const datas: WeatherDataI = {
      name: response.data.name,
      temp: Math.floor(response.data.main.temp - 273.15),
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      weather_main: response.data.weather[0].main,
      weather_description: response.data.weather[0].description,
      timezone: response.data.timezone,
      iconUrl: `/src/assets/weatherIcons/${response.data.weather[0].icon}.png`
    }

    return datas
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
