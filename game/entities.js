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

    move: function(offX, offY) {
        const x = this.x + offX
        const y = this.y + offY
        var entityAtPosition = this.entityAt(x, y)
        if(entityAtPosition){
            this.attack(entityAtPosition)
        } else if (isColliderAt(x, y)) {
            var interactable = getInteractableAt(x,y)
            if(interactable && interactable.type == "treasure"){
                console.log("Congratulations! You've found a treasure chest!")
                level[y] = changeStringAtIndex(level[y], x, " ")
            }
        } else {
            this.x += offX
            this.y += offY
        }
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

        entities.forEach( (entity) => {
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
    color: "#FF00FF",
    type: "enemy",
    spottingDistance: 10,

    move: function() {
        this.simplePathfind()
    },

    simplePathfind: function() {
        // simple pathfinding (NOT COLLISIONPROOF!)

        const playerPosition = {x: p.x, y: p.y}

        const possibleMoves = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 0, y:1}
        ]

        if(distance({x: this.x, y: this.y}, playerPosition) <= this.spottingDistance){

            var canStillMove = true
            for(var o = 0; o < possibleMoves.length; o++){
                var move = possibleMoves[o]
                var possibleEntity = this.entityAt(move.x + this.x, move.y + this.y)
                if(possibleEntity){
                    console.log("player attacked")
                    if(possibleEntity.type === "player"){
                        this.attack(possibleEntity)
                        canStillMove = false
                        break;
                    }
                }
            }

            if(canStillMove){
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
        } else {
            // move around a bit
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
        }
    }
}

var player = {
    x: 2,
    y: 2,
    attackPower: 10,
    hp: 30,
    color: "#00FF00",
    type: "player",
}
