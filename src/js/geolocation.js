/* global google */
import Map from './map/map.js';

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'AIzaSyAfdup00-KX0Co-SRqkdf9eMdG2Yt493UE';
    const gmap = new Map();

    gmap.load(apiKey, () => {
        const defaultLoc = new google.maps.LatLng(51.846, 5.86);
        const map = gmap.createMap(defaultLoc);
        gmap.getCurrentPosition((position) => {
            const here = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            const marker = gmap.createMarker(here, map);
            const info = gmap.createInfoWindow(here, `<h1>You are here</h1>
                    <p>Latitude: ${here.lat}</p>
                    <p>Longitude: ${here.lng}</p>`
            );

            info.open(map);
            map.panTo(here);

            marker.addListener('click', () => {
                info.open(map);
            });
        }, (error) => {
            const info = gmap.createInfoWindow(defaultLoc, `<h2>${error}</h2>`);
            info.open(map);
        });
    });
});
