import Particle from './particle';

export default class Canvas {

    constructor(canvasEl, settings) {
        this.settings = settings;
        this.particles = [];
        this.ctx = canvasEl.getContext('2d');
        this.drawInterval = false;
        this._init(canvasEl, settings);
    }

    addParticle(particle = undefined) {
        /* eslint-disable no-console */
        console.log(`add particle nr ${this.particles.length + 1}`);
        /* eslint-enable no-console */
        this.particles.push(particle);
    }

    draw() {
        if (!this.drawInterval) {
            this.drawInterval = setInterval(this.draw.bind(this), 33);
        }
        let i;
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = `rgba(52, 55, 60, ${this.settings.trail})`;
        this.ctx.fillRect(0, 0, this.settings.width, this.settings.height);
        this.ctx.globalCompositeOperation = 'lighter';

        for (i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(this.ctx);
        }
    }

    remove() {
        if (this.particles.length > 0) {
            /* eslint-disable no-console */
            console.log(`remove particle nr ${this.particles.length}`);
            /* eslint-enable no-console */
            this.particles.pop();
        }
    }

    _init(canvasEl, settings) {
        canvasEl.height = settings.height;
        canvasEl.width = settings.width;
        canvasEl.style.opacity = 1;
        canvasEl.style.position = 'fixed';
        canvasEl.style.left = 0;
        canvasEl.style.top = 0;
        canvasEl.id = 'particles';

        for (let i = 0; i < settings.number; i++) {
            this.addParticle(new Particle(settings));
        }

        window.addEventListener('resize', this._onResize.bind(this));
    }

    _onResize() {
        const canvasEl = this.ctx.canvas;
        if (canvasEl) {
            this.settings.height = window.innerHeight;
            this.settings.width = window.innerWidth;

            canvasEl.height = this.settings.height;
            canvasEl.width = this.settings.width;
        }
    }
}
