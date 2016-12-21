function getCoordinatesForChar(level,character){
    var coordinates = []
    for(var row = 0; row < level.length; row++){
        for(var col = 0; col < level[row].length; col++){
            if(level[row][col] == character){
                coordinates.push({x: col, y: row})
            }
        }
    }
    return(coordinates)
}

function getAllCollidables(level){
    const collidableChars = ["#"]
    var collidables = []
    collidableChars.forEach(function(collidable){
        collidables.push(getCoordinatesForChar(level,collidable))
    })
    if(enemies.length > 0){
        enemies.forEach(function(enemy){
            collidables.push({x: enemy.x, y: enemy.y})
        })
    }
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

    var borders = getCoordinatesForChar(level,"#")

    borders.forEach(function(coordinate){
        fill("#FFFFFF")
        rect(coordinate.x*cellsize,coordinate.y*cellsize,cellsize,cellsize)
    })
}
