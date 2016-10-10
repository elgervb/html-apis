import Settings from './particles/particlesettings';
import Canvas from './particles/canvas';
import Particle from './particles/particle';
import {} from './particles/particles.scss';

const settings = new Settings();

// dynamically create the canvas
const c = document.createElement('canvas');
document.body.appendChild(c);

const canvas = new Canvas(c, settings);
canvas.draw();

// Event listeners
let timer;
const add = (e) => {
    canvas.addParticle(new Particle(settings, { x: e.clientX, y: e.clientY }));
};

document.querySelector('#particles').addEventListener('mousedown', (e) => {
    timer = setInterval(() => { add(e); }, 10);
    // for single click
    add(e);
});
document.querySelector('#particles').addEventListener('mouseup', () => {
    if (timer) {
        clearInterval(timer);
    }
});

document.querySelector('.btn-remove-particle').addEventListener('mousedown', () => {
    timer = setInterval(canvas.remove.bind(canvas), 100);
});

document.querySelector('.btn-remove-particle').addEventListener('mouseup', () => {
    if (timer) {
        clearInterval(timer);
    }
    canvas.remove();
});
