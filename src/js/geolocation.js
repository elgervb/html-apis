import Map from './map/map.js';

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'AIzaSyAfdup00-KX0Co-SRqkdf9eMdG2Yt493UE';
    const map = new Map();

    map.load(apiKey, () => {
        map.init();
    });
});
