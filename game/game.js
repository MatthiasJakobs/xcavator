var p;
var enemies;
var level;
var needsRedraw = true
var viewMask;
var levelprogression;

function draw() {
    if(needsRedraw){

        background(0)
        frameRate(30)
        noStroke()
        drawLevel()
        updateHud()

        for(var i = enemies.length-1; i >= 0; i--){
            if(enemies[i].needsDestroy){
                writeToStatusbar("You've killed an Enemy!")
                enemies.splice(i,1)
            } else {
                enemies[i].show()
            }
        }
        if(!p.needsDestroy){
            p.show()
        } else {
            alert("you died")
            location.reload()
        }

        drawViewMask()

        needsRedraw = false
    }
}

function setup() {
    var canvas = createCanvas(dimensions.width*cellsize, dimensions.height*cellsize)
    canvas.parent("canvas")

    p = inherit(player,entity)

    levelprogression = [level1, level2, level3]

    loadLevel()

}

function loadLevel(){

    // Try loading next level. If current level is final level -> finish game
    if(levelprogression.length > 0){
        level = levelprogression.shift()
    } else {
        alert("You've beaten the game!")
        location.reload()
    }

    // reset viewmask
    viewMask = []
    for (var y = 0; y < dimensions.height; y++){
        viewMask[y] = []
        for (var x = 0; x < dimensions.width; x++){
            viewMask[y].push(false)
        }
    }

    // reset enemies
    enemies = []
    spawnEnemies(5)
        .forEach( enemy => enemies.push(enemy) )

    // set starting position of player
    let spawnPoint = getPlayerSpawnPoint()
    p.x = spawnPoint.x
    p.y = spawnPoint.y

}

function writeToStatusbar(text){
    var statusbar = document.getElementById('statusbar')
    statusbar.innerHTML = text
}

function updateHud(){
    var hud = document.getElementById('hudbar')
    hud.innerHTML = p.hp + " HP"
}

function keyPressed(){
    // LEFT: (72,h) (65,a)
    // DOWN: (74,j) (83,s)
    // UP: (75,k) (87,w)
    // RIGHT: (76,l) (68,d)

    if(keyCode == 72 || keyCode == LEFT_ARROW || keyCode == 65){
        p.move(-1,0)
    } else if (keyCode == 74 || keyCode == DOWN_ARROW || keyCode == 83){
        p.move(0,1)
    } else if (keyCode == 75 || keyCode == UP_ARROW || keyCode == 87){
        p.move(0,-1)
    } else if (keyCode == 76 || keyCode == RIGHT_ARROW || keyCode == 68){
        p.move(1,0)
    }

    enemies.forEach( enemy => enemy.move())

    needsRedraw = true

}
