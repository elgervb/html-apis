/* global google */
export default class Map {

    createMap(here) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: here,
            zoom: 15,
            disableDefaultUI: true,
        });

        return map;
    }

    getCurrentPosition(success = () => {}, error = () => {}) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                success(position);
            }, (err) => {
                let msg;
                switch (err.code) {
                case err.PERMISSION_DENIED :
                    msg = 'Permission denied';
                    break;
                case err.POSITION_UNAVAILABLE :
                    msg = 'Position unavailable';
                    break;
                case err.TIMEOUT :
                    msg = 'Timeout while determining position';
                    break;
                default :
                    msg = 'Unknown error occured';
                }
                error(msg);
            });
        } else {
            error('HTML 5 GeoLocation API not supported');
        }
    }

    createMarker(position, map) {
        const marker = new google.maps.Marker({
            position,
            map,
            title: 'You are here',
        });

        return marker;
    }

    createInfoWindow(position, text) {
        const coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(text);
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
