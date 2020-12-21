// initialize Leaflet
var map = L.map('map').setView([0, 0], 3);
// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);
// use custom marker icon
const myIcon = L.icon({
  iconUrl:
    'https://res.cloudinary.com/dd23iaiap/image/upload/v1608548702/iss_ybqmo4.png',
  iconSize: [200, 200],
  iconAnchor: [100, 100],
});

// show a marker on the map
const marker = L.marker([0, 0], { icon: myIcon })
  .bindPopup('Real-time ISS position!')
  .addTo(map);

let firstTime = true;
async function fetchData() {
  let data = await await fetch(
    'https://api.wheretheiss.at/v1/satellites/25544'
  );
  let dataJSON = await data.json();
  let { latitude, longitude } = dataJSON;

  //update DOM
  document.getElementById('long').textContent = longitude.toFixed(2);
  document.getElementById('lat').textContent = latitude.toFixed(2);
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    map.setView([latitude, longitude], 3);
    firstTime = false;
  }
}
fetchData();

setInterval(fetchData, 2500);

function resetMap() {
  firstTime = true;
  fetchData();
}

const reset = document.getElementById('reset');
reset.addEventListener('click', resetMap);
