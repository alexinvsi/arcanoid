let maxWidth = window.innerWidth;
import levels from './levels'
let currentLevel = levels.getCurrentLevel();


/**
 * 
 * @param {object} catcher 
 * @return {object}
 */
export function drawCatcher(ctx, x) {
    let width = 180;
    let height = currentLevel.catcherPositionBottom - currentLevel.catcherPositionTop;
    ctx.fillStyle = '#FCE38A';
    x = Math.min(x, maxWidth -(width / 2));
    if(x < (width / 2)) {
        x = (width / 2)
    }
    ctx.fillRect(x- (width / 2), currentLevel.catcherPositionTop, width, height);

    return {
        x0: x - (width / 2), 
        y0: currentLevel.catcherPositionTop, 
        y1: currentLevel.catcherPositionBottom, 
        half: x,
        x1: x + (width / 2)
    }
}

function calcCof(xBall, catcherPosition) {
    let start = catcherPosition.x0;
    let end = catcherPosition.half;
    if (xBall > catcherPosition.half) {
        start = catcherPosition.half;
        end = catcherPosition.x1;
        return (xBall - start) / ((end - start) / 100)
    }
  
    return -(end - xBall) / ((end - start) / 100)
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {object} catcherPosition 
 * @return {Boolean}
 */
export function checkCatcherPosition(x, y, catcherPosition) {
    let isStatus = false;
    if (y > catcherPosition.y0 && y < catcherPosition.y1) {
        if (x > catcherPosition.x0 && x < catcherPosition.x1) {
            isStatus = calcCof(x, catcherPosition);
        }
    }
    return isStatus;
}