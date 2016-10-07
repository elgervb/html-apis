import Settings from './particles/particlesettings';
import Particle from './particles/particle';
import {} from './particles/particles.scss';

const settings = new Settings();

const Canvas = function drawCanvas() {
    let ctx;
    const particles = [];


    function add(particle) {
        console.log(`add particle nr ${particles.length}`);
        particles.push(particle);
    }

    function create() {
        // dynamically create the canvas
        const c = document.createElement('canvas');

        ctx = c.getContext('2d');
        c.width = settings.width;
        c.height = settings.height;
        c.style.backgroundColor = 'blue';
        c.style.opacity = 1;
        c.style.position = 'fixed';
        c.style.left = 0;
        c.style.top = 0;
        c.id = 'particles';
        document.body.appendChild(c);
    }

    function draw() {
        let i;

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(52, 55, 60, ${settings.trail})`;
        ctx.fillRect(0, 0, settings.width, settings.height);
        ctx.globalCompositeOperation = 'lighter';

        for (i = 0; i < particles.length; i++) {
            particles[i].draw(ctx);
        }
    }

    function remove() {
        particles.pop();
    }

    for (let i = 0; i < settings.number; i++) {
        /* eslint-disable new-cap */
        add(new Particle(settings));
    }


    return {
        add,
        create,
        draw,
        remove,
    };
};

const canvas = Canvas();
canvas.create();
// update
setInterval(canvas.draw, 33);


// UI
document.querySelector('.btn-add-particle').addEventListener('mouseup', () => {
    canvas.add(new Particle(settings));
});
document.querySelector('.btn-remove-particle').addEventListener('mouseup', () => {
    canvas.remove();
});
