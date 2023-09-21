const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const height = 400;
const width = 400;
const scale = 20;

window.addEventListener("keydown", (evt) => {
    const direction = evt.key.replace("Arrow", "");
    snake.update(direction);
});

function setup() {
    canvas.height = height;
    canvas.width = width;
    food.createFood();

    window.setInterval(() => {
        context.clearRect(0, 0, width, height);
        snake.move(snake.xSpeed, snake.ySpeed);
        food.drawFood();
        snake.draw();
    }, 150);
}

let snake = {
    cells: [{ x: 200, y: 200 }],
    position: {
        x: 200,
        y: 200,
    },
    xSpeed: scale,
    ySpeed: 0,
    length: 1,
    draw: () => {
        snake.cells.forEach( cell => {
            context.fillStyle = "#C2F970";
            context.fillRect( cell.x, cell.y, scale, scale );
        })
    },

    update: (direction) => {
        switch (direction) {
            case "w":
                snake.ySpeed = -1 * scale;
                snake.xSpeed = 0;
                break;
            case "s":
                snake.ySpeed = 1 * scale;
                snake.xSpeed = 0;
                break;
            case "a":
                snake.xSpeed = -1 * scale;
                snake.ySpeed = 0;
                break;

            case "d":
                snake.xSpeed = 1 * scale;
                snake.ySpeed = 0;
                break;
        }
    },

    move: (xDist, yDist) => {

        if (snake.cells[0].x == food.position.x && snake.cells[0].y == food.position.y) {
            snake.eat();
            snake.shiftCells( snake.length - 1 )
            snake.moveFirstCell( xDist, yDist )
        }
        else {
            snake.shiftCells( snake.length )
            snake.moveFirstCell( xDist, yDist )
        }

    },

    moveFirstCell: ( xDist, yDist ) => { 
        // x-position
        if (snake.cells[0].x + xDist < 0) {
            snake.cells[0].x = width;
        } else if (snake.cells[0].x + xDist > width) {
            snake.cells[0].x = 0;
        } else {
            snake.cells[0].x += xDist;
        }

        // y-position
        if (snake.cells[0].y + yDist < 0) {
            snake.cells[0].y = height;
        } else if (snake.cells[0].y + yDist > height) {
            snake.cells[0].y = 0;
        } else {
            snake.cells[0].y += yDist;
        }

    },

    shiftCells: length => {
        for (let i = length - 1; i >= 1; i--) {
            snake.cells[i].x = snake.cells[i - 1].x;
            snake.cells[i].y = snake.cells[i - 1].y;
        }        
    },

    eat: () => {
        snake.grow();
        snake.grow();
        snake.grow();
        food.createFood();
    },

    grow: () => {
        snake.cells.push({
            x: snake.cells[snake.length - 1].x,
            y: snake.cells[snake.length - 1].y,
        });
        snake.length++;
    },
};

let food = {
    position: {
        x: 0,
        y: 0,
    },

    createFood: () => {
        food.position.x = scale * Math.floor(Math.random() * (width / scale));
        food.position.y = scale * Math.floor(Math.random() * (height / scale));
    },

    drawFood: () => {
        context.fillStyle = "red";
        context.fillRect(food.position.x, food.position.y, scale, scale);
    },
};

setup();