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

    createExportButton()

    setupGrid(16,16, "#000000")
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

function createExportButton(){
    let td = document.getElementById("buttonTD")
    let newDiv = document.createElement("div")
    let newButton = document.createElement("button")
    newButton.onclick = exportAsArray
    newButton.style.color = "#000000"
    newButton.innerHTML = "export"
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
