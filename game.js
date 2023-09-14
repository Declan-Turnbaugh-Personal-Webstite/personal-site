const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const HEIGHT = 400;
const WIDTH = 400;
const SCALE = 20;

window.addEventListener("keydown", (event) => {
    const direction = event.key.replace("Arrow", "");
    snake.update(direction);
});

function setup() {
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    food.createFood();

    window.setInterval(() => {
        context.clearRect(0, 0, WIDTH, HEIGHT);
        snake.move(snake.xSpeed, snake.ySpeed);
        food.drawFood();
        snake.draw();
    }, 200);
}

let snake = {
    cells: [{ x: 200, y: 200 }],
    position: {
        x: 200,
        y: 200,
    },
    xSpeed: SCALE,
    ySpeed: 0,
    length: 1,
    draw: () => {
        snake.cells.forEach( cell => {
            context.fillStyle = "#C2F970";
            context.fillRect( cell.x, cell.y, SCALE, SCALE );
        })
    },
    update: (direction) => {
        switch (direction) {
            case "Up":
                snake.ySpeed = -1 * SCALE;
                snake.xSpeed = 0;
                break;
            case "Down":
                snake.ySpeed = 1 * SCALE;
                snake.xSpeed = 0;
                break;
            case "Left":
                snake.xSpeed = -1 * SCALE;
                snake.ySpeed = 0;
                break;

            case "Right":
                snake.xSpeed = 1 * SCALE;
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
            snake.cells[0].x = WIDTH;
        } else if (snake.cells[0].x + xDist > WIDTH) {
            snake.cells[0].x = 0;
        } else {
            snake.cells[0].x += xDist;
        }

        // y-position
        if (snake.cells[0].y + yDist < 0) {
            snake.cells[0].y = HEIGHT;
        } else if (snake.cells[0].y + yDist > HEIGHT) {
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
        food.position.x = SCALE * Math.floor(Math.random() * (WIDTH / SCALE));
        food.position.y = SCALE * Math.floor(Math.random() * (HEIGHT / SCALE));
    },
    drawFood: () => {
        context.fillStyle = "#D3FCD5";
        context.fillRect(food.position.x, food.position.y, SCALE, SCALE);
    },
};

setup();