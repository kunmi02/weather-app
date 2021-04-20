import getWeatherData from './modules/requester';
import './styles.css';

const displayValues = (responses) => {
  const response = responses.list[0];
  try {
    const { message } = response;
    if (message) {
      displayError();
      return;
    }
  } catch (e) {
    return;
  }
  const container = document.querySelector('#response');
  container.innerHTML = '';
  const container2 = document.querySelector('#error');
  container2.innerHTML = '';
  const cordinates = response.coord;
  const weather = response.weather[0];
  const { timezone } = response;
  const temperature = response.main;
  const cityName = response.name;

  const cityNameContainer = document.createElement('h1');
  container.appendChild(document.createElement('br'));
  const cityNameLabel = document.createElement('label');
  cityNameLabel.textContent = 'City Name: ';
  cityNameContainer.textContent = response.name;
  cityNameLabel.appendChild(cityNameContainer);
  container.appendChild(cityNameLabel);

  const timezoneContainer = document.createElement('span');

  const label = document.createElement('label');
  label.textContent = 'Timezone: ';
  timezoneContainer.textContent = timezone;
  label.appendChild(timezoneContainer);
  container.appendChild(label);

  const cordinatesContainer = document.createElement('span');
  container.appendChild(document.createElement('br'));

  const cordinateslabel = document.createElement('label');
  cordinateslabel.textContent = 'Coordinates: ';
  cordinatesContainer.textContent = `${cordinates.lon}long` + ` ${cordinates.lat}lat`;
  cordinateslabel.appendChild(cordinatesContainer);
  container.appendChild(cordinateslabel);

  const weatherContainer = document.createElement('span');
  container.appendChild(document.createElement('br'));
  const weatherabel = document.createElement('label');
  weatherabel.textContent = 'Weather Description: ';
  weatherContainer.textContent = weather.description;
  weatherabel.appendChild(weatherContainer);
  container.appendChild(weatherabel);

  const minTempContainer = document.createElement('span');
  container.appendChild(document.createElement('br'));
  const minTempabel = document.createElement('label');
  minTempabel.textContent = 'Minimum Temperature: ';
  minTempContainer.textContent = temperature.temp_min;
  minTempabel.appendChild(minTempContainer);
  container.appendChild(minTempabel);

  const maxTempContainer = document.createElement('span');
  container.appendChild(document.createElement('br'));
  const maxTempabel = document.createElement('label');
  maxTempabel.textContent = 'Maximum Temperature: ';
  maxTempContainer.textContent = temperature.temp_max;
  maxTempabel.appendChild(maxTempContainer);
  container.appendChild(maxTempabel);
};

const displayError = () => {
  const container = document.querySelector('#error');
  const container2 = document.querySelector('#response');
  container.innerHTML = '';
  container2.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = 'Weather information for your chosen location is not available';
  container.appendChild(p);
};
const request = (location, units) => {
  if (location === '') {
    displayError();
    return;
  }
  getWeatherData(location, units).then(
    (value) => { displayValues((value)); },
    (error) => { displayError((error)); },
  );
};

const requestForm = (container) => {
  const label = document.createElement('label');
  label.textContent = 'Enter city name and select temperature metric';
  container.appendChild(label);
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('br'));

  const location = document.createElement('INPUT');
  location.setAttribute('type', 'text');
  location.placeholder = 'Enter city location';
  container.appendChild(location);

  const x = document.createElement('SELECT');
  x.id = 'mySelect';
  container.appendChild(x);

  const z = document.createElement('option');
  z.setAttribute('value', 'imperial');
  const t = document.createTextNode('Fahrenheit');
  z.appendChild(t);
  x.appendChild(z);

  const zy = document.createElement('option');
  zy.setAttribute('value', 'metric');
  const ty = document.createTextNode('Celsius');
  zy.appendChild(ty);
  x.appendChild(zy);

  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Submit';

  submitButton.addEventListener('click', () => {
    request(location.value, x.value);
    location.value = '';
  });

  container.appendChild(submitButton);
};

requestForm(document.querySelector('#request'));
