const possibleMoves = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1} ]

var entity = {
    x: 0,
    y: 0,
    color: "#FF00FF",
    attackPower: 3,
    hp: 20,
    needsDestroy: false,

    setTo: function(x,y) {
        this.x = x
        this.y = y
    },

    show: function() {
        fill(this.color)
        rect(this.x*cellsize, this.y*cellsize, cellsize, cellsize)
    },

    attack: function (entity){
        entity.takeDamage(this.attackPower)
    },

    takeDamage: function(damage){
        this.hp -= damage
        if(this.hp <= 0){
            this.needsDestroy = true
        }
    },

    entityAt: function(x,y) {
        var entities = enemies.slice()
        entities.push(p)

        var entityToReturn = undefined

        entities.forEach( entity => {
            if(entity.x == x && entity.y == y){
                entityToReturn = entity
            }
        })
        return(entityToReturn)
    }
}

var enemy =  {
    x: 0,
    y: 0,
    orientation: Math.floor(Math.random() * 4), // for antPathFind
    color: "#770077",
    type: "enemy",
    spottingDistance: 8,
    smellingDistance: 15,

    move: function() {
        /* choose pathfinding algorithm depending on distance:
         *  - within smellingDistance:
         *    enemy can "smell" player and tries to approach them
         *    by randomly walking in a direction to check if the
         *    smell gets stronger
         *  - within spottingDistance:
         *    enemy can see player and comes "running" towards them
         *  - within neither:
         *    enemy moves around randomly
         */
        const playerPosition = {x: p.x, y: p.y};
        var dist = distance({x: this.x, y: this.y}, playerPosition);
        if (dist <= this.smellingDistance) {
            if (dist <= this.spottingDistance) {
                // enemy has spotted player
                this.color = "#FF0055"
                this.simplePathfind();
            } else {
                // enemy can only smell player
                this.color = "#BB0066"
                this.antPathfind();
            }
        } else {
            // enemy can neither see nor smell player
            this.color = "#770077"
            this.moveRandom();
        }
    },

    didAttack: function() {
        for(var o = 0; o < possibleMoves.length; o++){
            var move = possibleMoves[o]
            var possibleEntity = this.entityAt(move.x + this.x, move.y + this.y)
            if(possibleEntity){
                if(possibleEntity.type === "player"){
                    this.attack(possibleEntity)
                    writeToStatusbar("You've got attacked! Remaining HP: " + possibleEntity.hp)
                    return(true)
                }
            }
        }
        return(false)
    },

    simplePathfind: function() {
        // simple pathfinding

        const playerPosition = {x: p.x, y: p.y}

        if(!this.didAttack()){
            var bestMove = {x: 0, y: 0}
            for(var i = 0; i < possibleMoves.length; i++){
                var newMove = {x: this.x + possibleMoves[i].x, y: this.y + possibleMoves[i].y}
                if(distance(newMove,playerPosition)<=distance({x: this.x + bestMove.x, y: this.y + bestMove.y },playerPosition)){
                    bestMove = possibleMoves[i]
                }
            }
            var x = this.x + bestMove.x
            var y = this.y + bestMove.y
            if(!isColliderAt(x,y) && this.entityAt(x,y) == undefined){
                this.x += bestMove.x
                this.y += bestMove.y
            }
        }
    },

    antPathfind : function () {
        const playerPosition = {x: p.x, y: p.y}
        if(!this.didAttack()){
            // measure distance
            var oldDist = distance({x: this.x, y: this.y}, playerPosition)
            // take step into direction of current orientation
            var moved = {x: this.x + possibleMoves[this.orientation].x,
                         y: this.y + possibleMoves[this.orientation].y}
            // measure distance again
            var newDist = distance(moved, playerPosition)

            if (newDist > oldDist) {
                // player is now further away than before, so turn around!
                this.orientation = (this.orientation + 2) % 4
            } else {
                // scent got stronger, keep on course or try left or right!
                this.orientation = (this.orientation + 3 + Math.floor(Math.random() * 3)) % 4
            }

            if(!isColliderAt(moved.x, moved.y) && this.entityAt(moved.x, moved.y) == undefined){
                this.x = moved.x
                this.y = moved.y
            }
        }
    },

    moveRandom : function () {
        // move around randomly
        const moveIndex = floor(random(possibleMoves.length + 10))

        if(moveIndex < possibleMoves.length){
            const randomMove = possibleMoves[moveIndex]
            const x = this.x + randomMove.x
            const y = this.y + randomMove.y

            if(!isColliderAt(x,y)){
                this.x += randomMove.x
                this.y += randomMove.y
            }
        }
    },

    show : function() {
        renderSprite(this.x, this.y, basicEnemy)
    }


}

var player = {
    x: 2,
    y: 2,
    attackPower: 10,
    hp: 30,
    color: "#00FF00",
    type: "player",

    show: function() {
        const left = Math.max(this.x-viewRadius, 0)
        const right = Math.min(this.x+viewRadius, dimensions.width)
        const top = Math.max(this.y-viewRadius,0)
        const bottom = Math.min(this.y+viewRadius, dimensions.height)

        for(var y = top; y < bottom; y++){
            for(var x = left; x < right; x++){
                viewMask[y][x] = true
            }
        }

        renderSprite(this.x, this.y, pisserSprite)

    },

    move: function(offX, offY) {
        const x = this.x + offX
        const y = this.y + offY
        var entityAtPosition = this.entityAt(x, y)
        if(entityAtPosition){
            this.attack(entityAtPosition)
        } else if (isColliderAt(x, y)) {
            var interactable = getInteractableAt(x,y)
            if(interactable) {
                switch(interactable.type) {
                    case "treasure":
                        // in 50% of the cases, heal the player by a certain amount

                        let shouldHeal = Math.round(Math.random()) == 1? true : false
                        if(shouldHeal){
                            this.hp += 10
                            writeToStatusbar("You found a healthpack!")
                        } else {
                            writeToStatusbar("You found nothing...")
                        }
                        level[y] = changeStringAtIndex(level[y], x, " ")
                        break
                    case "door":
                        loadLevel()
                        break
                    default:
                        console.log("found interactable, but did not specify type")
                }
            }
        } else {
            this.x += offX
            this.y += offY
        }
    }
}

function renderSprite(x,y,sprite){
    for(var row = 0; row < cellsize; row++){
        for(var col = 0; col < cellsize; col++){

            fill(sprite[cellsize * row + col])
            rect((x*cellsize)+col, (y*cellsize)+row,1,1)
        }
    }
}
