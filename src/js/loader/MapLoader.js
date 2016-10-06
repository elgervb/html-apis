import Loader from './StaticLoader';

export default class MapLoader {

    static load(apiKey, callback) {
        const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        window.initMap = callback;

        Loader.loadJs(url);
    }

}
