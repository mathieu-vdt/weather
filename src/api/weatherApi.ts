import axios from 'axios'

const API_KEY = '8e8f5ab94e96e6bc444a243660e5ce13'

export async function getWeatherByCity(city: string) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
