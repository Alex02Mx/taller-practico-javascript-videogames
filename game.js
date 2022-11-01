const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", set_canvas_size);
window.addEventListener("resize", set_canvas_size);

const lives_player = document.getElementById("lives");
const time_span = document.getElementById("time");
const record_span = document.getElementById("record");
const p_result = document.getElementById("result");

let canvas_size;
let element_size;
let level = 0;
let res;
let lives = 3;

let time_start;
let time_player;
let time_interval;

const player_position ={
    x: 0,
    y: 0
}

const gif_position = {
    x: 0,
    y: 0
}

const teclas = {
    up: 38,
    left: 37,
    right: 39,
    down: 40
}

let container_bombs = [];

document.addEventListener("keyup", func_teclas);

const up = document.querySelector(".up");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const down = document.querySelector(".down");

up.addEventListener("click", func_up);
left.addEventListener("click", func_left);
right.addEventListener("click", func_right);
down.addEventListener("click", func_down);

function func_up () {
    if (player_position.y > element_size){
        player_position.y -= element_size
        start_game();
    }
}
function func_left () {
    if (player_position.x > 0){
        player_position.x -= element_size
        start_game();
    }
}
function func_right () {
    if (player_position.x < canvas_size - (element_size+element_size)){
        player_position.x += element_size;
        start_game();
    }
}
function func_down () {
    if ( player_position.y < canvas_size - element_size){
        player_position.y += element_size
        start_game();
    }
}



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
    const map = maps[level];
    if (!map) {
        win();
        return
    }
    if (!time_start) {
        time_start = Date.now();
        time_interval = setInterval(show_time, 100);
    }
    show_lives ();
    show_record ();
    
    const map_row = map.trim().split("\n")
    const map_row_col = map_row.map(row => row.trim().split(""));

    container_bombs = [];
    game.clearRect(0,0,canvas_size,canvas_size);

    map_row_col.forEach((col, colI) => {
        col.forEach((row, rowI) => {
            const emoji = emojis[row];
            const posX = rowI*element_size;
            const posY = colI*element_size+element_size;

            if (row == "O") {
                if (!player_position.x && !player_position.y) {
                    player_position.x = posX;
                    player_position.y = posY;
                }
            }
            else if (row == "I") {
                gif_position.x = posX;
                gif_position.y = posY;
            }
            else if (row == "X") {
                container_bombs.push({
                    x: posX,
                    y: posY
                })
            }
            game.fillText(emoji, posX, posY);
        })
    })
    
    move_player();
    // for (let row = 0; row < 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    //         game.fillText(emojis[map_row_col[row][col]], col * element_size, row * element_size + element_size);
    //     }
    // }
}

function set_canvas_size () {
    if (window.innerWidth > window.innerHeight) {
        canvas_size = parseInt(window.innerHeight * 0.9);
    }
    else if (window.innerHeight > window.innerWidth) {
        canvas_size = parseInt(window.innerWidth * 0.9);
    }
    canvas.setAttribute("width",canvas_size);
    canvas.setAttribute("height",canvas_size);

    element_size = parseInt(canvas_size / 10.3);
    player_position.x = 0;
    player_position.y = 0;
    start_game();
}

function move_player () {
    
    res = (.10 * element_size);
    // validacion de colicion regalo
    const gif_colision_x =  player_position.x == gif_position.x;
    const gif_colision_y =  player_position.y == gif_position.y;
    const gif_colision =  gif_colision_x && gif_colision_y;
    if (gif_colision) {
        level_up ();
    }

    // validacion colicion de bombas
    const bomb_colisionX = container_bombs.find((bomb) => {
        const pos_boom_X = bomb.x == player_position.x;
        const pos_boom_Y = bomb.y == player_position.y;
        if (pos_boom_X && pos_boom_Y) {
            return true;
        }
        else{
            return false;
        }
    })

    if (bomb_colisionX) {
        fail ();
    }
    else {
        game.fillText(emojis["PLAYER"], player_position.x - res , player_position.y + res);
    }
}

function level_up () {
    level++;
    start_game();
}
function win () {
    console.log("GANASTE")
    time_player = Date.now() - time_start;
    clearInterval(time_interval);
    if (localStorage.getItem("best_Score") == 0) {
        localStorage.setItem("best_Score", time_player);
        record_span.innerHTML = time_player;
        p_result.innerHTML = "PRIMER RECORD ESTABLECIDO"
    }
    else if (time_player < localStorage.getItem("best_Score")) {
        localStorage.setItem("best_Score", time_player);
        record_span.innerHTML = time_player;
        p_result.innerHTML = "NUEVO RECORD"
    }
    else{
        p_result.innerHTML = "NO SUPERASTE EL RECORD"
    }
}
function fail () {
    lives--;
    if (lives == 0) {
        level = 0;
        lives = 3
        time_start = undefined;
    }
       
    res = (.10 * element_size);
    game.fillText(emojis["BOMB_COLLISION"], player_position.x - res , player_position.y + res);
    setTimeout(() => explosion (), 200 );
};
        
function explosion () {
    player_position.x =0;
    player_position.y =0;
    start_game();
}   

function show_lives () {
    const array_lives = Array(lives).fill(emojis["PLAYER"])

    lives_player.innerHTML="";

    array_lives.forEach((life) => {
        lives_player.append(life)
    })
    //lives_player.innerHTML = array_lives;
}

function show_time () {
    time_span.innerHTML = Date.now() - time_start;
}

function show_record () {
    record_span.innerHTML = localStorage.getItem("best_Score");
}