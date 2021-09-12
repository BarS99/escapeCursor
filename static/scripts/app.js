class EscapeCursor {
    constructor(board) {
        this.board = board;
        this.pins = this.board.querySelectorAll(".board__pin");

        //window.addEventListener("mousemove", this.handleMousemove);

        this.pins.forEach((pin) => {
            pin.addEventListener("mouseenter", this.handlePinMouseenter);
        });

        this.pins.forEach((pin) => {
            pin.addEventListener("mouseleave", this.handlePinMouseleave);
        });
    }

    // bind events

    handlePinMouseenter = (e) => {
        e.currentTarget.classList.add("active");

        this.pins.forEach((item) => {
            this.movePin(item);
        })
    }

    handlePinMouseleave = (e) => {
        e.currentTarget.classList.remove("active");

        this.pins.forEach((item) => {
            this.restorePin(item);
        })
    }

    // utilities

    getDistanceBetweenPoints = (p1, p2) => {
        return Math.pow(Math.pow(p2 - p1, 2), 1 / 2);
    }

    getDistanceBetweenPoints2d = (p1, p2) => {
        return Math.pow(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2), 1 / 2);
    }

    getOffsetOfCenter = (item) => {
        const result = {};
        const details = item.getBoundingClientRect();

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

    movePin = (item) => {
        if (item.classList.contains('active')) return;

        let activeItem = this.board.querySelector('.board__pin.active');

        if (this.getDistanceBetweenPoints2d(activeItem.getBoundingClientRect(), item.getBoundingClientRect()) > 200) return;

        let transformX = 0;
        let transformY = 0;

        transformX = item.getBoundingClientRect().x / activeItem.getBoundingClientRect().x * 14;
        transformY = item.getBoundingClientRect().y / activeItem.getBoundingClientRect().y * 14;

        if (activeItem.getBoundingClientRect().x - item.getBoundingClientRect().x > 0) {
            transformX *= -1;
        }
        if (activeItem.getBoundingClientRect().y - item.getBoundingClientRect().y > 0) {
            transformY *= -1;
        }


        item.querySelector('img').style.transform = `translate(${transformX}px, ${transformY}px)`;
    }

    restorePin = (item) => {
        if (item.classList.contains('active')) return;
        item.querySelector('img').style.transform = "translate(0, 0)";
    }
}

window.addEventListener("load", () => {
    const board = document.querySelector('.board');

    const escapeItem = new EscapeCursor(board);
});