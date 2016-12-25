var arrayRepresentation;
var currentDrawingColor;

function populateGrid(gridWidth, gridHeight, scale) {
    for (var y = 0; y < gridHeight; y++){
        for (var x = 0; x < gridWidth; x++){
            if(arrayRepresentation[y][x]){
                fill(arrayRepresentation[y][x])
            }
            rect(x*scale, y*scale, scale, scale)
        }
    }
}

function setDrawingColor(color){
    currentDrawingColor = color
    updateCursorColor()
    console.log("current drawing color: ", color)
}

function setupGrid(gridWidth, gridHeight, defaultColor){
    arrayRepresentation = []
    for (var y = 0; y < gridHeight; y++){
        arrayRepresentation[y] = []
        for (var x = 0; x < gridWidth; x++){
            arrayRepresentation[y].push(defaultColor)
        }
    }
}

function updateCursorColor(){
    var cursor = document.createElement('canvas')
    var ctx = cursor.getContext('2d')
    let cursorWidth = 12
    let cursorHeight = 12

    cursor.width = cursorWidth
    cursor.height = cursorHeight

    ctx.fillStyle = currentDrawingColor

    ctx.fillRect(0,0,cursorWidth,cursorHeight)

    document.querySelector("canvas").style.cursor = 'url(' + cursor.toDataURL() + '), auto'

}
