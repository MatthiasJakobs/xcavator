function getCoordinatesForChar(level,character){
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
    var interactable = getCoordinatesForChar(level,'$').filter( (char) => {
        return(char.x == x && char.y == y)
    })
    if(interactable.length > 0){
        return({x: interactable[0].x, y: interactable[0].y, type: "treasure"})
    } else {
        return(undefined)
    }
}

function isColliderAt(x,y){
    var toReturn = false
    getAllCollidables(level).forEach( (collider) => {
        if(collider.x == x && collider.y == y) {
            toReturn = true
        }
    })
    return(toReturn)
}

function getAllCollidables(level){
    const collidableChars = ["#", "$"]
    var collidables = []
    collidableChars.forEach( (collidable) => {
        collidables.push(getCoordinatesForChar(level,collidable))
    })
    return([].concat.apply([],collidables))
}

function spawnEnemies(level, amount){
    var spawnableLocations = getCoordinatesForChar(level," ")
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

function drawLevel(level){
    var drawables = ["#", "$"]
    drawables.forEach( (drawable) => {
        getCoordinatesForChar(level,drawable).forEach( (coordinate) => {
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
