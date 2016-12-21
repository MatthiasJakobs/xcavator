var arrayRepresentation;
var currentDrawingItem;

var representation = {
    "#000000": " ",
    "#FFFFFF": "#",
    "#FFFF00": "$"
}

function draw() {
    frameRate(30)
    background(52)
    noFill()
    stroke(255)

    for (var y = 0; y < dimensions.height; y++){
        for (var x = 0; x < dimensions.width; x++){
            if(arrayRepresentation[y][x]){
                fill(arrayRepresentation[y][x])
            }
            rect(x*cellsize, y*cellsize, cellsize, cellsize)
        }
    }

    if(mouseIsPressed){
        var x = floor(pmouseX/cellsize)
        var y = floor(pmouseY/cellsize)

        if(x < dimensions.width && y < dimensions.height){
            arrayRepresentation[y][x] = this.currentDrawingItem
        }
    }
}

function setDrawingColor(color){
    currentDrawingItem = color
    console.log("current drawing color: ", color)
}

function drawWall(){
    setDrawingColor("#FFFFFF")
}

function drawTreasure(){
    setDrawingColor("#FFFF00")
}

function erase(){
    setDrawingColor("#000000")
}

function exportToJS(){
    var output = []
    var test = arrayRepresentation.forEach( (row) => {
        var newRow = ""
        row.forEach( (item) => {
            newRow += representation[item]
        })
        output.push(newRow)
    })
    console.log("const levelX = [",output.map(function(row){
        return("\n\"" + row + "\"")
    }).toString() + "\n]")
}

function setup() {
    createCanvas(dimensions.width*cellsize, dimensions.height*cellsize)

    currentDrawingItem = "#000000"

    var whiteButton = createButton("Wall")
    whiteButton.mousePressed(drawWall)

    var yellowButton = createButton("Treasure")
    yellowButton.mousePressed(drawTreasure)

    var exportButton = createButton("export")
    exportButton.mousePressed(exportToJS)

    var removeButton = createButton("Erase")
    removeButton.mousePressed(erase)

    arrayRepresentation = []
    for (var y = 0; y < dimensions.height; y++){
        arrayRepresentation[y] = []
        for (var x = 0; x < dimensions.width; x++){
            arrayRepresentation[y].push("#000000")
        }
    }
}
