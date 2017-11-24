const container = document.getElementById('container');

const displayData = ({latitude:lat, longitude:long}) => {
	fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`).then(response => response.json()).then(d => putData(d));
}
fetch('https://freegeoip.net/json/').then(res => res.json()).then(displayData);

const putData = (d) => {
	console.log(d);
  const $temp = Temperature(d.main.temp);
  const $icon = WeatherIcon(d.weather[0].icon);
  const $type = Weathertype(d.weather[0].main.toLowerCase());
  const $info = Info(d);
  const template = WeatherTemplate($temp, $icon, $info,$type);
  container.innerHTML = template;
}

const Temperature = (temp) => {
  return `
    <div id="temp">
      ${temp} °C
    </div>
  `
}
const WeatherIcon = (icon) => {
  return `
    <div id='image'>
      <img src='${icon}'>
    </div>
  `
}
const Weathertype = (type) => {
  return `
    <div id='type'>
      The weather is ${type}
    </div>
  `
}
const Info = ({main, wind}) => {
  return `<div id='info'>
    <div id='wind'>
      <div id='wind-title'>Wind</div>
      <div id='wind-speed'>Speed:  ${wind.speed} <span class='unit'>km/hr</span></div>
      <div id='wind-dir'>Direction: ${calculateWindDirection(wind.deg)}</div>
      
    </div>
    <div id='humidity'>
      Humidity: ${main.humidity} %
    </div>
    <div id='pressure'>
      Pressure: ${main.pressure} <span class='unit'>mb</span>
    </div>
  </div>`
}
const WeatherTemplate = (...args) => {
  return args.join('');
}
const calculateWindDirection = (deg) => {
  const directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
  const dir = Math.floor(deg/22.5);
  return directions[dir];
}
