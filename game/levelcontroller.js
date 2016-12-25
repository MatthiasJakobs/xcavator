function getCoordinatesForChar(character){
    var coordinates = []
    for(var row = 0; row < level.length; row++){
        for(var col = 0; col < level[row].length; col++){
            if(level[row][col] === character){
                coordinates.push({x: col, y: row})
            }
        }
    }
    return(coordinates)
}

function getInteractableAt(x,y){
    var interactable = getAllInteractables().filter( char => {
        return(char.x == x && char.y == y)
    }).map( possibleObject => {
        switch (level[possibleObject.y][possibleObject.x]) {
            case "$":
                return({x: possibleObject.x, y: possibleObject.y, type: "treasure"})
                break;
            case "D":
                return({x: possibleObject.x, y: possibleObject.y, type: "door"})
                break;
            default:
                return(undefined)
        }
    })
    return(interactable[0])
}

function isColliderAt(x,y){
    var toReturn = false
    getAllCollidables().forEach( collider => {
        if(collider.x == x && collider.y == y) {
            toReturn = true
        }
    })
    return(toReturn)
}

function getAllCollidables(){
    const collidableChars = ["#", "$", "D"]
    var collidables = []
    collidableChars.forEach( collidable => {
        collidables.push(getCoordinatesForChar(collidable))
    })
    return([].concat.apply([],collidables))
}

function getAllInteractables(){
    const interactableChars = ["$", "D"]
    var interactables = []
    interactableChars.forEach( interactable => {
        interactables.push(getCoordinatesForChar(interactable))
    })
    return([].concat.apply([],interactables))
}

function spawnEnemies(amount){
    var spawnableLocations = getCoordinatesForChar(" ")
    var enemies = []
    if(spawnableLocations.length > 0){
        for (var i = 0; i < amount; i++){
            const index = Math.floor(Math.random()*spawnableLocations.length)
            const location = spawnableLocations[index]
            var newEnemy = inherit(enemy,entity)
            newEnemy.setTo(location.x, location.y)
            enemies.push(newEnemy)
        }
    }
    return(enemies)
}

function drawLevel(){
    var drawables = ["#", "$", "D"]
    drawables.forEach( drawable => {
        getCoordinatesForChar(drawable).forEach( coordinate => {
            fill(tileColors[drawable])
            rect(coordinate.x*cellsize,coordinate.y*cellsize,cellsize,cellsize)
        })
    })
}

function drawViewMask(){
    for (var y = 0; y < dimensions.height; y++){
        for (var x = 0; x < dimensions.width; x++){
            if(!viewMask[y][x]){
                fill(51)
                rect(x*cellsize, y*cellsize, cellsize,cellsize)
            } else {
                //fill(255)
            }

        }
    }
}
