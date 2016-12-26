var representation = {
    "#000000": {char: " ", name: "Erase"},
    "#FFFFFF": {char: "#", name: "Wall"},
    "#FFFF00": {char: "$", name: "Treasure"},
    "#996600": {char: "D", name: "Door"},
    "#FF00FF": {char: "@", name: "Spawn"}
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
            newRow += representation[item].char
        })
        output.push(newRow)
    })
    console.log("const levelX = [",output.map(function(row){
        return("\n\"" + row + "\"")
    }).toString() + "\n]")
}

function setup() {
    var canvas = createCanvas(dimensions.width*cellsize, dimensions.height*cellsize)
    canvas.parent('canvas')

    currentDrawingColor = "#000000"

    Object.keys(representation).forEach( key => {
        createNewButton(representation[key].name, "#FFFFFF", "#000000", setToColor(key))
    })

    createNewButton("Export", "#FFFFFF", "#000000", exportToJS)

    setupGrid(dimensions.width, dimensions.height, "#000000")

}
