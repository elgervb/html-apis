
export default class ParticleSettings {
    constructor() {
        this.number = 5;           // number of particles
        this.particleBlur = 1;     // number from 0 to 1 where 1 is no blur
        this.particleMinWidth = 5;
        this.particleMaxWidth = 25;
        this.particleOpacity = 1;
        this.trail = 1;            // number from 0 to 1
        this.velocityX = 10;
        this.velocityY = 10;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}
