
export default class Particle {
    /**
     * @param {ParticleSettings} settings the settings
     * @param {object} initCoords the initial x and y coordinate to place the Particle
     */
    constructor(settings, initCoords) {
        this.settings = settings;

        this.radius = (Math.random() * settings.particleMaxWidth) + settings.particleMinWidth;

        if (initCoords && initCoords.x && initCoords.y) {
            this.x = initCoords.x;
            this.y = initCoords.y;
        } else {
            const initialPosition = this._calculateInitialPosition(this.radius, settings);
            this.x = initialPosition.x;
            this.y = initialPosition.y;
        }
        this.vx = (Math.random() * settings.velocityX) + ((settings.velocityX / 2) * -1);
        this.vy = (Math.random() * settings.velocityY) + ((settings.velocityY / 2) * -1);
        this.color = this._createColor();
    }

    draw(ctx) {
        const gradient = this._createRadialGradient(ctx);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();

        this._collisionDetectionCanvasBorders();

        this.x += this.vx;
        this.y += this.vy;
    }

    _calculateInitialPosition(radius, settings) {
        const calc = dimension => Math.max(radius + 1, Math.min(dimension - radius, Math.random() * dimension));

        return {
            x: calc(settings.width),
            y: calc(settings.height),
        };
    }

    _collisionDetectionCanvasBorders() {
        if (this.x < this.radius) this.vx *= -1;
        if (this.y < this.radius) this.vy *= -1;
        if (this.x > this.settings.width - this.radius) this.vx *= -1;
        if (this.y > this.settings.height - this.radius) this.vy *= -1;
    }

    _createColor() {
        /* eslint-disable no-bitwise */
        const r = Math.random() * 255 >> 0;
        const g = Math.random() * 255 >> 0;
        const b = Math.random() * 255 >> 0;
        /* eslint-enable no-bitwise */
        return `rgba(${r}, ${g}, ${b}, ${this.settings.particleOpacity})`;
    }

    _createRadialGradient(ctx) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(this.settings.particleBlur, this.color);
        gradient.addColorStop(1, 'black');

        return gradient;
    }
}
