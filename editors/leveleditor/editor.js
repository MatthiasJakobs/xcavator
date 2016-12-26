var representation = {
    "#000000": " ",
    "#FFFFFF": "#",
    "#FFFF00": "$",
    "#996600": "D",
    "#FF00FF": "@"
}

function listenForMouseClicks(){
    if(mouseIsPressed){
        var x = floor(pmouseX/cellsize)
        var y = floor(pmouseY/cellsize)

        if(x < dimensions.width && y < dimensions.height){
            arrayRepresentation[y][x] = currentDrawingColor
        }
    }
}

function draw() {
    frameRate(30)
    background(52)
    noFill()
    stroke(255)

    populateGrid(dimensions.width, dimensions.height, cellsize)

    listenForMouseClicks()

}


function drawWall(){
    setDrawingColor("#FFFFFF")
}

function drawTreasure(){
    setDrawingColor("#FFFF00")
}

function drawSpawn(){
    setDrawingColor("#FF00FF")
}

function erase(){
    setDrawingColor("#000000")
}

function drawDoor(){
    setDrawingColor("#996600")
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

    currentDrawingColor = "#000000"

    var whiteButton = createButton("Wall")
    whiteButton.mousePressed(drawWall)

    var yellowButton = createButton("Treasure")
    yellowButton.mousePressed(drawTreasure)

    var brownButton = createButton("Door")
    brownButton.mousePressed(drawDoor)

    var pinkButton = createButton("Spawn")
    pinkButton.mousePressed(drawSpawn)

    var exportButton = createButton("export")
    exportButton.mousePressed(exportToJS)

    var removeButton = createButton("Erase")
    removeButton.mousePressed(erase)

    setupGrid(dimensions.width, dimensions.height, "#000000")

}
