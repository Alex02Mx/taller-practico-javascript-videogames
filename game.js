const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", set_canvas_size);
window.addEventListener("resize", set_canvas_size);

let canvas_size;
let element_size;

const map = maps[2];
const map_row = map.trim().split("\n")
const map_row_col = map_row.map((row) => {
    return row.trim().split("");
})

    
console.log(map_row_col)

function start_game () {
    game.font= element_size + "px Verdana";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            game.fillText(emojis[map_row_col[row][col]], col * element_size, row * element_size + element_size);
        }
    }
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