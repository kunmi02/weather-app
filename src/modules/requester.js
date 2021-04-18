const base_url = 'http://api.openweathermap.org/data/2.5/weather?q='
const api_key = '63f5550851a7e639b98f0c7c3e0e2e06'
async function getWeatherData(city) {
  // const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=YOUR_KEY_HERE&s=cats', {mode: 'cors'});
  const response = await fetch(base_url+city+'&appid='+api_key);
  const data = await response.json();
  // console.log(data.coord);
  return await data
  
}

export default getWeatherData;
