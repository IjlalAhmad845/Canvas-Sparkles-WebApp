import * as Model from './model.js';
import modelState from './model.js';
import * as View from './view.js';
import ctx, {colorSelection} from './view.js';

View.resizeCanvas(() => Model.init());


View.defaultState((val) => Model.setDefaultState(val));

//sparkle properties
View.sparklesQuantitySlider((value) => Model.setSparklesQuantity(value));
View.sparklesSpeedSlider((value) => Model.setSparklesSpeed(value));
View.sparklesSizeSlider((value) => Model.setSparklesSize(value));
View.sparklesAreaSlider((value) => Model.setSparklesArea(value));
View.showVectorsCheckbox((value) => Model.setShowVectors(value));

//sparkle trails
View.showTrailsCheckbox((value) => Model.setShowTrails(value));
View.trailsAmountSlider((value) => Model.setTrailsAmount(value));

//sparkle color
let hue = 0;
View.colorSelection((value) => Model.setColorSelection(value))
View.customColorInput((value) => Model.setCustomColor(value));

//sparkle shadow
View.showShadowCheckbox((value) => Model.setShowShadow(value));
View.shadowAmountSlider((value) => Model.setShadowAmount(value));

let alpha = 0;
View.canvasMouseDown(() => {
    modelState.drawSparkles = true
    alpha = 0.01;
})
View.canvasMouseUp(() => modelState.drawSparkles = false)
View.canvasMouseMove((e) => {
    modelState.mouseEvent.x = e.offsetX
    modelState.mouseEvent.y = e.offsetY
    if (modelState.drawSparkles)
        alpha = 0.01;
})
const drawSparkles = () => {
    const x = modelState.mouseEvent.x
    const y = modelState.mouseEvent.y
    const dx = Math.random() * 2 - 1
    const dy = Math.random() * 2 - 1
    const radius = Math.random() * modelState.sparklesSize * 2 + 1
    let color;
    switch (modelState.colorSelection) {
        case 'default':
            color = modelState.defaultColor[Math.floor(Math.random() * modelState.defaultColor.length)];
            break;
        case 'multi':
            color = modelState.multiColor[Math.floor(Math.random() * modelState.multiColor.length)];
            break;
        case 'cycle':
            color = `hsl(${hue}, 100%, 50%)`;
            break;
        case 'custom':
            color = modelState.customColor;
            break;
    }
    const circle = new Model.Circle(x, y, dx, dy, radius, color, modelState.sparklesSpeed * 0.2);
    modelState.circlesArray.push(circle);
}

function drawVectors(circle) {
    for (let i = 0; i < modelState.circlesArray.length; i++) {
        const dx = modelState.circlesArray[i].x - circle.x;
        const dy = modelState.circlesArray[i].y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= 40 && distance <= 41) {
            ctx.beginPath();
            ctx.moveTo(circle.x, circle.y);
            ctx.lineTo(modelState.circlesArray[i].x, modelState.circlesArray[i].y);
            ctx.strokeStyle = circle.color;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

const animate = () => {
    if (modelState.showTrails) {
        ctx.fillStyle = `rgba(17,24,39,${alpha / modelState.trailsAmount * 20})`;
        ctx.fillRect(0, 0, View.canvasWidth, View.canvasHeight);
    } else
        ctx.clearRect(0, 0, View.canvasWidth, View.canvasHeight);


    requestAnimationFrame(animate);
    modelState.circlesArray.forEach((circle, index) => {
        circle.update(ctx);
        if (modelState.showVectors)
            drawVectors(circle);

        //condition to show sparkle shadow
        if (modelState.showShadow) {
            ctx.shadowColor = circle.color;
            ctx.shadowBlur = modelState.shadowAmount * 5;
        }

        //condition for removing sparkles
        if (circle.radius <= 1)
            modelState.circlesArray.splice(index, 1);
    })

    if (modelState.drawSparkles) {
        for (let i = 0; i < modelState.sparklesQuantity * 2; i++)
            drawSparkles();

        //for color cycle
        if (modelState.colorSelection === 'cycle')
            hue = (hue + 1) % 360;
    }

    if (modelState.circlesArray.length === 0 && alpha <= 1)
        alpha += 0.05;
}
animate();