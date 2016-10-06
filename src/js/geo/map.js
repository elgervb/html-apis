/* global google */

let SINGLETON;

/**
 * Helper class for creating Google maps
 *
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 */
export default class Map {

    /**
     * Create a new Map
     *
     * @param google.maps.Map the google maps implementation
     */
    constructor(map) {
        if (SINGLETON) {
            throw new Error('class Map is a singleton, please use createMap(position)');
        }
        SINGLETON = this;

        this._map = map;
    }

    /**
     * Create a new Map
     *
     * @param element The parent element of the map
     * @param location The optional location to center the map
     *
     * @return google.maps.Map the google maps implementation
     */
    static createMap(element, location) {
        const map = new google.maps.Map(element, {
            center: location,
            zoom: 15,
            disableDefaultUI: true,
        });

        return new Map(map);
    }

    createMarker(position) {
        const marker = new google.maps.Marker({
            position,
            map: this._map,
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

    /**
     * Returns the underlying google map implemention
     *
     * @return google.maps.Map
     */
    getMap() {
        return this._map;
    }
}
