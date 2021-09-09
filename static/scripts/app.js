class EscapeCursor {
    constructor(target) {
        this.target = target;
        this.image = target.querySelector('img');

        window.addEventListener("mousemove", this.handleMousemove);
    }

    // bind events

    handleMousemove = (e) => {
        e.preventDefault();
        const p1 = this.getOffsetOfCenter(this.target);
        const p2 = this.getMousePosition(e);
        let moveX = 0;
        let moveY = 0;

        if (this.getDistanceBetweenPoints2d(p1, p2) < 200) {
            moveX = this.getDistanceBetweenPoints(p1.x, p2.x);
            if (p1.x > p2.x) {
                moveX -= 200;
                moveX *= -1;
            } else {
                moveX -= 200;
            }

            moveY = this.getDistanceBetweenPoints(p1.y, p2.y);
            if (p1.y > p2.y) {
                moveY -= 200;
                moveY *= -1;
            } else {
                moveY -= 200;
            }
        }

        this.image.style.transform = `translate(${moveX}px, ${moveY}px)`;

        // if (distanceBetweenPoints < 200) {
        //     let moveX = (Math.pow(Math.pow(p1.x - p2.x, 2), 1 / 2) - 200) / 2;
        //     let moveY = (Math.pow(Math.pow(p1.y - p2.y, 2), 1 / 2) - 200) / 2;

        //     this.image.style.transform = `translate(${moveX}px, ${0}px)`;
        // } else {
        //     let moveX = 0;
        //     let moveY = 0;

        //     this.image.style.transform = `translate(${moveX}px, ${0}px)`;
        // }
    }

    // utilities

    getDistanceBetweenPoints = (p1, p2) => {
        return Math.pow(Math.pow(p2 - p1, 2), 1 / 2);
    }

    getDistanceBetweenPoints2d = (p1, p2) => {
        return Math.pow(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2), 1 / 2);
    }

    getOffsetOfCenter = (target) => {
        const result = {};
        const details = target.getBoundingClientRect();

        result.x = details.left + details.width / 2;
        result.y = details.top + details.height / 2;

        return result
    }

    getMousePosition = (e) => {
        const result = {};

        result.x = e.pageX;
        result.y = e.pageY;

        return result;
    }
}

window.addEventListener("load", () => {
    const pins = document.querySelectorAll('.board__pin');

    pins.forEach((item) => {
        const escapeItem = new EscapeCursor(item);
    })
});