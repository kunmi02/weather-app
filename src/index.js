import getWeatherData from './modules/requester'
import './styles.css'

const displayValues = (response) =>{
  console.log(response)
  try {
    const message = response.message
    if(message) {
      displayError()
        return
    }
}
catch(e) {
    alert(e);
}
  const container = document.querySelector('#response')
  container.innerHTML = '';
  const container2 = document.querySelector('#error')
  container2.innerHTML = ''
  const cordinates = response.coord;
  const weather = response.weather[0];
  const timezone = response.timezone
  const temperature = response.main
  const cityName = response.name
  

  const cityNameContainer = document.createElement('h1')
  container.appendChild(document.createElement('br'));
  const cityNameLabel = document.createElement('label')
  cityNameLabel.textContent = 'City Name: '
  cityNameContainer.textContent =  response.name
  cityNameLabel.appendChild(cityNameContainer)
  container.appendChild(cityNameLabel)

  
  const timezoneContainer = document.createElement('span')
  
  const label = document.createElement('label')
  label.textContent = 'Timezone: '
  timezoneContainer.textContent = timezone
  label.appendChild(timezoneContainer)
  container.appendChild(label)

  const cordinatesContainer = document.createElement('span')
  container.appendChild(document.createElement('br'));
  
  const cordinateslabel = document.createElement('label')
  cordinateslabel.textContent = 'Coordinates: '
  cordinatesContainer.textContent = cordinates['lon'] + 'long' + ' ' +cordinates['lat'] + 'lat'
  cordinateslabel.appendChild(cordinatesContainer)
  container.appendChild(cordinateslabel)

  const weatherContainer = document.createElement('span')
  container.appendChild(document.createElement('br'));
  const weatherabel = document.createElement('label')
  weatherabel.textContent = 'Weather Description: '
  weatherContainer.textContent =  weather.description
  weatherabel.appendChild(weatherContainer)
  container.appendChild(weatherabel)

  const minTempContainer = document.createElement('span')
  container.appendChild(document.createElement('br'));
  const minTempabel = document.createElement('label')
  minTempabel.textContent = 'Minimum Temperature: '
  minTempContainer.textContent =  temperature.temp_min
  minTempabel.appendChild(minTempContainer)
  container.appendChild(minTempabel)

  const maxTempContainer = document.createElement('span')
  container.appendChild(document.createElement('br'));
  const maxTempabel = document.createElement('label')
  maxTempabel.textContent = 'Maximum Temperature: '
  maxTempContainer.textContent =  temperature.temp_max
  maxTempabel.appendChild(maxTempContainer)
  container.appendChild(maxTempabel)

}

const displayError = () =>{
  const container = document.querySelector('#error')
  const container2 = document.querySelector('#response')
  container.innerHTML = '';
  container2.innerHTML = '';
  const p = document.createElement('p')
  p.textContent = 'Weather information for your chosen location is not available'
  container.appendChild(p)
}
const request = (location) => {
  console.log('Weather Function')
  getWeatherData(location).then(
    function(value) {displayValues((value));},
    function(error) {displayError((error));}
  )
}


const requestForm = (container) => {
  

  const label = document.createElement('label')
  label.textContent = 'Enter city name'
  container.appendChild(label)
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('br'));

  const location = document.createElement("INPUT");
  location.setAttribute("type", "text");
  location.placeholder = 'Enter city location'
  container.appendChild(location);
  
  const submitButton = document.createElement('button')
  submitButton.innerHTML = 'Submit';
  
  submitButton.addEventListener('click', () => {
      request(location.value)
      location.value = ''
  });
  
  container.appendChild(submitButton)

}

requestForm(document.querySelector('#request'));
