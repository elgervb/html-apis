/* global google */
import Map from './geo/map';
import MapLoader from './loader/MapLoader';
import GeoLocation from './geo/geolocation';

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'AIzaSyAfdup00-KX0Co-SRqkdf9eMdG2Yt493UE';

    MapLoader.load(apiKey, () => {
        const defaultLoc = new google.maps.LatLng(51.846, 5.86);
        const gmap = Map.createMap(document.getElementById('map'), defaultLoc);

        const geo = new GeoLocation((position) => {
            const here = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            const marker = gmap.createMarker(here);
            const info = gmap.createInfoWindow(here, `<h1>You are here</h1>
                    <p>Latitude: ${here.lat}</p>
                    <p>Longitude: ${here.lng}</p>`
            );

            info.open(gmap.getMap(), marker);
            gmap.getMap().panTo(here);

            marker.addListener('click', () => {
                info.open(gmap.getMap(), marker);
            });
        }, (error) => {
            const info = gmap.createInfoWindow(defaultLoc, `<h2>${error}</h2>`);
            info.open(gmap.getMap());
        });

        geo.getCurrentPosition();
    });
});
