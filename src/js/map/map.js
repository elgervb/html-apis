/* global google */
export default class Map {

    init() {
        const here = new google.maps.LatLng(51.846, 5.86);

        /* eslint-disable no-new */
        const map = new google.maps.Map(document.getElementById('map'), {
            center: here,
            zoom: 12,
            disableDefaultUI: true,
        });
        /* eslint-enable no-new */
        const marker = this.createMarker(here, map);
        const info = this.createInfoWindow(here);
        marker.addListener('click', () => {
            info.open(map);
        });
    }

    createMarker(position, map) {
        const marker = new google.maps.Marker({
            position,
            map,
            title: 'You are here',
        });

        return marker;
    }

    createInfoWindow(position) {
        const coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent('<h1>You are here</h1>');
        coordInfoWindow.setPosition(position);

        return coordInfoWindow;
    }

    load(apiKey, callback) {
        window.initMap = callback;
        const fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }
}
