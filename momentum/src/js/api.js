const API_KEY = "9cb594847a8332efc8a48a01c59a89de";
const getCurrentApiUrl = (city, key) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${key}&units=metric`;

class ApiService {
  static async getWeatherInfo(city) {
    const res = await fetch(getCurrentApiUrl(city, API_KEY));
    const data = await res.json();
    return data;
  }
}
export default ApiService;