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
document.querySelector('.btn-add-particle').addEventListener('mouseup', () => {
    canvas.add(new Particle(settings));
});
document.querySelector('.btn-remove-particle').addEventListener('mouseup', () => {
    canvas.remove();
});
