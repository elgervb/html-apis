/* global google */
export default class Map {

    init() {
        const here = new google.maps.LatLng(51.846, 5.86);

        /* eslint-disable no-new */
        new google.maps.Map(document.getElementById('map'), {
            center: here,
            zoom: 15,
            disableDefaultUI: true,
        });
        /* eslint-enable no-new */
    }

    load(apiKey, callback) {
        window.initMap = callback;
        const fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }
}
