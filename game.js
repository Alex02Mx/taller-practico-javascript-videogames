const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", set_canvas_size);
window.addEventListener("resize", set_canvas_size);

let canvas_size;
let element_size;

const player_position ={
    x: undefined,
    y: undefined
}

const up = document.querySelector(".up");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const down = document.querySelector(".down");

up.addEventListener("click", func_up);
left.addEventListener("click", func_left);
right.addEventListener("click", func_right);
down.addEventListener("click", func_down);

function func_up () {
    player_position.y-= element_size;
    let pos_act_y = player_position.y

    move_player ();
    console.log("btn arriba");
}
function func_left () {
    console.log("btn iquierda");
}
function func_right () {
    console.log("btn derecha");
}
function func_down () {
    console.log("btn abajo");
}

const teclas = {
    up: 38,
    left: 37,
    right: 39,
    down: 40
}
document.addEventListener("keyup", func_teclas);

function func_teclas (event) {
    switch(event.keyCode) {
        case teclas.up:
            func_up ();
        break;
        case teclas.left:
            func_left ();
        break;
        case teclas.right:
            func_right ();
        break;
        case teclas.down:
            func_down ();
        break;
        default:
            console.log("otra tecla");
        break;
    }
}


function start_game () {
    game.font= element_size + "px Verdana";

    const map = maps[0];
    const map_row = map.trim().split("\n")
    const map_row_col = map_row.map(row => row.trim().split(""));

    map_row_col.forEach((col, colI) => {
        col.forEach((row, rowI) => {
            const emoji = emojis[row];
            const posX = rowI*element_size;
            const posY = colI*element_size+element_size;

            if (row == "O") {
                player_position.x = posX;
                player_position.y = posY;
                console.log(player_position)
            }

            game.fillText(emoji, posX, posY);
        })
        move_player ();

    })
    

   
    //console.log(map_row_col)

    // for (let row = 0; row < 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    //         game.fillText(emojis[map_row_col[row][col]], col * element_size, row * element_size + element_size);
    //     }
    // }
}

function move_player () {
    game.fillText(emojis["PLAYER"], player_position.x-5, player_position.y);
}
function clear_player () {
    game.clearRect(emojis["PLAYER"], player_position.x-5, player_position.y);
}

function set_canvas_size () {
    if (window.innerWidth > window.innerHeight) {
        canvas_size = window.innerHeight * 0.8;
    }
    else if (window.innerHeight > window.innerWidth) {
        canvas_size = window.innerWidth * 0.8;
    }
    canvas.setAttribute("width",canvas_size);
    canvas.setAttribute("height",canvas_size);

    element_size = canvas_size / 10.3;
    start_game();
}