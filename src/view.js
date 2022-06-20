import $ from 'jquery';

const canvas = $('#canvas')[0]
const canvasContainer = $('#canvas-container')

//for sparkles box
const sparklesQuantity = $('#sparkles-quantity-slider')
const sparklesSpeed = $('#sparkles-speed-slider')
const sparklesSize = $('#sparkles-size-slider')
const sparklesArea = $('#sparkles-area-slider')
const showVectors = $('#sparkles-vectors-checkbox')

//sparkles trails box
const showTrails = $('#sparkles-trails-checkbox')
const trailsAmount = $('#sparkles-trails-slider')

//sparkles multiColor box
const sparkleRadioGroup = $('#sparkle-radio-group')
const colorPicker = $('#sparkle-color-picker')

//sparkles shadow box
const showShadow = $('#sparkles-shadow-checkbox')
const shadowAmount = $('#sparkles-shadow-slider')

export let canvasWidth = canvasContainer.width()
export let canvasHeight = canvasContainer.height()

canvas.width = canvasWidth
canvas.height = canvasHeight
const ctx = canvas.getContext('2d')

const initCanvas = () => {
    canvasWidth = canvasContainer.width()
    canvasHeight = canvasContainer.height()
    canvas.width = canvasWidth
    canvas.height = canvasHeight
}
export const resizeCanvas = (handler) => {
    $(window).on('resize', () => {
        initCanvas()
        handler()
    })

    $('#hide-controls-button').on('click', () => {
        $('#controls-container').toggleClass('hidden')
        $('#show-controls-button').toggleClass('hidden')
        initCanvas()
    })
    $('#show-controls-button').on('click', () => {
        $('#controls-container').toggleClass('hidden')
        $('#show-controls-button').toggleClass('hidden')
        initCanvas()
    })
}

export const canvasMouseDown = (handler) => $(canvas).on('mousedown', handler)
export const canvasMouseUp = (handler) => $(canvas).on('mouseup', handler)
export const canvasMouseMove = (handler) => $(canvas).on('mousemove', (e) => handler(e))

export const defaultState = (handler) => {
    //sparkles properties box
    const sparklesQuantityVal = sparklesQuantity.val()
    const sparklesSpeedVal = sparklesSpeed.val()
    const sparklesSizeVal = sparklesSize.val()
    const sparklesAreaVal = sparklesArea.val()

    //sparkles trails box
    const trailsAmountVal = trailsAmount.val()

    //sparkles color box
    const customColorVal = colorPicker.val()

    //sparkles shadow box
    const shadowAmountVal = shadowAmount.val()

    handler({
        sparklesQuantityVal,
        sparklesSpeedVal,
        sparklesSizeVal,
        sparklesAreaVal,
        trailsAmountVal,
        customColorVal,
        shadowAmountVal
    })
}

//handlers for sparkles box
export const sparklesQuantitySlider = (handler) => sparklesQuantity.on('input', () => handler(sparklesQuantity.val()))
export const sparklesSpeedSlider = (handler) => sparklesSpeed.on('input', () => handler(sparklesSpeed.val()))
export const sparklesSizeSlider = (handler) => sparklesSize.on('input', () => handler(sparklesSize.val()))
export const sparklesAreaSlider = (handler) => sparklesArea.on('input', () => handler(sparklesArea.val()))
export const showVectorsCheckbox = (handler) => showVectors.on('change', () => handler(showVectors.prop('checked')))

//handlers for sparkles trails box
export const showTrailsCheckbox = (handler) => showTrails.on('change', () => {
    handler(showTrails.prop('checked'))
    $('#trails-slider-container').toggleClass('disable')

    //only one can be used, trails or shadows
    $('#shadow-container').toggleClass('disable')
})
export const trailsAmountSlider = (handler) => trailsAmount.on('input', () => handler(trailsAmount.val()))

//handlers for sparkles multiColor box
export const colorSelection = (handler) => sparkleRadioGroup.on('click', (e) => {
    //event delegation
    if (e.target.type !== 'radio') return
    //toggling color picker visibility
    e.target.dataset.selection === 'custom' ? colorPicker.removeClass('disable') : colorPicker.addClass('disable')

    handler(e.target.dataset.selection)
})
export const customColorInput = (handler) => colorPicker.on('input', (e) => handler(e.target.value))

//handlers for sparkles shadow box
export const showShadowCheckbox = (handler) => showShadow.on('change', () => {
    handler(showShadow.prop('checked'))
    $('#shadow-slider-container').toggleClass('disable')

    //only one can be used, trails or shadows
    $('#trails-container').toggleClass('disable')
})
export const shadowAmountSlider = (handler) => shadowAmount.on('input', () => handler(shadowAmount.val()))
export default ctx