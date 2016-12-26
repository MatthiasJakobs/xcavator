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

    colorPalette.forEach(color => createNewButton("abrakadabra", color, color, setToColor(color)))
    createNewButton("Export", "#FFFFFF", "#000000",exportAsArray)

    setupGrid(16,16, "#000000")
}

function draw() {
    stroke(255)
    fill(0)

    populateGrid(16,16, scale)

    listenForMouseClicks()
}

function exportAsArray(){
    var output = ""
    for(var y = 0; y < 16; y++){
        var row = ""
        for(var x = 0; x < 16; x++){
            if((16 * y + x) % 6 == 0){
                row += "\n\t"
            }
            row += ("\'" + arrayRepresentation[y][x] + "\',")
        }
        output += (row)
    }
    console.log("const charX = [" + output + "]")
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
