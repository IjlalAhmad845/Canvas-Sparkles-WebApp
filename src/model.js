import {sparklesQuantitySlider} from "./view";

export class Circle {
    constructor(x, y, dx, dy, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(ctx) {
        if (this.x + this.radius >= ctx.canvas.width || this.x - this.radius <= 0) this.dx = -this.dx;
        if (this.y + this.radius >= ctx.canvas.height || this.y - this.radius <= 0) this.dy = -this.dy;

        this.x += this.dx * this.velocity * state.sparklesArea;
        this.y += this.dy * this.velocity * state.sparklesArea;

        if (this.radius >= 1) this.radius -= 0.05 * this.velocity * state.sparklesSize;
        this.draw(ctx);
    }
}

export const state = {
    circlesArray: [],
    drawSparkles: false,
    mouseEvent: {
        x: 0, y: 0
    },
    sparklesQuantity: 3,
    sparklesSpeed: 3,
    sparklesSize: 3,
    sparklesArea: 3,
    showVectors: false,
    showTrails: false,
    trailsAmount: 3,
    defaultColor: ['#ffee80', '#ffea00', '#ffea00', '#ffea00', '#ffdd00', '#ffdd00', '#ffdd00', '#ffdd00'],
    multiColor: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'],
    customColor: '#ffffff',
    colorSelection: 'default',
    showShadow: false,
    shadowAmount: 3,
}

export const init = () => {
    state.circlesArray = [];
};

export const setDefaultState = (val) => {
    //sparkle properties
    state.sparklesQuantity = val.sparklesQuantityVal;
    state.sparklesSpeed = val.sparklesSpeedVal;
    state.sparklesSize = val.sparklesSizeVal;
    state.sparklesArea = val.sparklesAreaVal;

    //sparkle trails
    state.trailsAmount = val.trailsAmountVal;

    //sparkle color
    state.customColor = val.customColorVal;

    //sparkle shadow
    state.shadowAmount = val.shadowAmountVal;
}

export const setSparklesQuantity = (value) => state.sparklesQuantity = value;
export const setSparklesSpeed = (value) => state.sparklesSpeed = value;
export const setSparklesSize = (value) => state.sparklesSize = value;
export const setSparklesArea = (value) => state.sparklesArea = value;
export const setShowVectors = (value) => state.showVectors = value;

export const setShowTrails = (value) => state.showTrails = value;
export const setTrailsAmount = (value) => state.trailsAmount = value;

export const setColorSelection = (value) => state.colorSelection = value;
export const setCustomColor = (value) => state.customColor = value;

export const setShowShadow = (value) => state.showShadow = value;
export const setShadowAmount = (value) => state.shadowAmount = value;

export default state