import config from './config';

export default {
    /**
    * Animate camera zoom
    */
    zoomValue: 2,
    targetZoom: 2,
    zoom() {
        if (p5.keyIsDown(65)) { // A: zoom out
            this.targetZoom -= .1;
        } else if (p5.keyIsDown(69)) { // E: zoom in
            this.targetZoom += .1;
        }

        // Bound to min and max zoom
        this.targetZoom = Math.min(Math.max(this.targetZoom, config.zoomMin), config.zoomMax);
        // Round to one decimal
        this.targetZoom = Math.round(this.targetZoom * 10) / 10;

        // Easing
        if (p5.abs(this.targetZoom - this.zoomValue) > .005) {
            this.zoomValue += (this.targetZoom - this.zoomValue) / config.zoomSpeed;
        } else {
            this.zoomValue = this.targetZoom;
        }

        p5.scale(this.zoomValue);
    },

    /**
    * Move camera around
    */
    x: 0,
    y: 0,
    move(x, y) {
        if (x && y) {
            this.x = x;
            this.y = y;
        }
        if (p5.keyIsDown(90)) { // Z: move up
            this.y += config.cameraSpeed;
        }
        if (p5.keyIsDown(81)) { // Q: move left
            this.x += config.cameraSpeed;
        }
        if (p5.keyIsDown(83)) { // S: move down
            this.y -= config.cameraSpeed;
        }
        if (p5.keyIsDown(68)) { // D: move right
            this.x -= config.cameraSpeed;
        }

        p5.translate(this.x, this.y);

        const x1 = -this.x
        const y1 = -this.y;
        const x2 = (-p5.width/2 + p5.mouseX) / this.zoomValue - this.x;
        const y2 = (-p5.height/2 + p5.mouseY) / this.zoomValue - this.y;
        p5.stroke(0);
        p5.strokeWeight(1);
        // p5.line(x1, y1, x2, y2);

        const dist = Math.round(p5.dist(x1, y1, x2, y2) * this.zoomValue);
        const threshold = Math.min(p5.width/2, p5.height/2) * 8/10;
        if (dist > threshold) {
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const speed = Math.min(dist - threshold, 100) / 100;

            this.x -= Math.cos(angle) * config.cameraSpeed * speed;
            this.y -= Math.sin(angle) * config.cameraSpeed * speed;
        }
    }
}
