let scale = 20
let width = 17 * scale
let height = 17 * scale

let colorPalette = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#00FFFF",
]

function setup() {
    var canvas = createCanvas(width,height)
    canvas.parent('canvas')

    colorPalette.forEach(color => createNewButton(color))

    setupGrid(16,16, "#FFFFFF")
}

function createNewButton(color){
    let td = document.getElementById("buttonTD")
    let newDiv = document.createElement("div")
    let newButton = document.createElement("button")
    newButton.onclick = setToColor(color)
    newButton.style.background = color
    newButton.style.color = color
    newButton.innerHTML = "abrakadabra"
    newDiv.appendChild(newButton)
    td.appendChild(newDiv)
}

function setToColor(color){
    return function(){
        currentDrawingColor = color
        updateCursorColor()
    }
}

function draw() {
    stroke(0)
    fill(255)

    // for(var row = 0; row < 16; row++){
    //     for(var col = 0; col < 16; col++){
    //         rect(row*scale, col*scale, scale, scale)
    //     }
    // }

    populateGrid(16,16, scale)

    listenForMouseClicks()

}

function listenForMouseClicks(){
    if(mouseIsPressed){
        var x = floor(pmouseX/scale)
        var y = floor(pmouseY/scale)

        if(x >= 0 && x <= 15 && y >= 0 && y <= 15){
            arrayRepresentation[y][x] = currentDrawingColor
        }
    }
}
