const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '63f5550851a7e639b98f0c7c3e0e2e06';
async function getWeatherData(city) {
  const response = await fetch(`${baseUrl + city}&appid=${apiKey}`);
  const data = await response.json();
  return data;
}

export default getWeatherData;
