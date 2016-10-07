import {} from './particles/particles.scss';

const settings = {
    number: 5,           // number of particles
    particleBlur: 1,     // number from 0 to 1 where 1 is no blur
    particleMinWidth: 5,
    particleMaxWidth: 25,
    particleOpacity: 1,
    trail: 1,            // number from 0 to 1
    velocityX: 10,
    velocityY: 10,
    width: window.innerWidth,
    height: window.innerHeight,
};

function Particle(pSettings) {
    let x, y, vx, vy;
    // radius
    const radius = (Math.random() * pSettings.particleMaxWidth) + pSettings.particleMinWidth;
    // position
    x = Math.max(radius + 1, Math.min(pSettings.width - radius, Math.random() * pSettings.width));
    y = Math.max(radius + 1, Math.min(pSettings.height - radius, Math.random() * pSettings.height));
    // velocity
    vx = (Math.random() * pSettings.velocityX) + ((pSettings.velocityX / 2) * -1);
    vy = (Math.random() * pSettings.velocityY) + ((pSettings.velocityY / 2) * -1);

    function fillColor() {
        // random colors
        /* eslint-disable no-bitwise */
        const r = Math.random() * 255 >> 0;
        const g = Math.random() * 255 >> 0;
        const b = Math.random() * 255 >> 0;
        /* eslint-enable no-bitwise */
        return `rgba(${r}, ${g}, ${b}, ${pSettings.particleOpacity})`;
    }

    const color = fillColor();

    function collisionDetectionCanvasBorders() {
        if (x < radius) vx *= -1;
        if (y < radius) vy *= -1;
        if (x > pSettings.width - radius) vx *= -1;
        if (y > pSettings.height - radius) vy *= -1;
    }

    function draw(ctx) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(pSettings.particleBlur, color);
        gradient.addColorStop(1, 'black');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, Math.PI * 2, false);
        ctx.fill();

        collisionDetectionCanvasBorders();

        x += vx;
        y += vy;
    }
    // color


    return {
        draw,
    };
}

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
        add(Particle(settings));
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
    canvas.add(Particle(settings));
});
document.querySelector('.btn-remove-particle').addEventListener('mouseup', () => {
    canvas.remove();
});
