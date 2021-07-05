const baseUrl = 'https://api.openweathermap.org/data/2.5/find?q=';
const apiKey = '63f5550851a7e639b98f0c7c3e0e2e06';
async function getWeatherData(city, units) {
  try {
    const response = await fetch(`${baseUrl + city}&appid=${apiKey}&units=${units}`);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export default getWeatherData;
