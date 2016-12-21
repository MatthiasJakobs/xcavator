var entity = {
    x: 0,
    y: 0,
    color: "#FF00FF",
    attackPower: 10,
    hp: 100,
    needsDestroy: false,

    setTo: function(x,y) {
        this.x = x
        this.y = y
    },

    move: function(offX, offY) {
        const entityAtPosition = this.entityAt(this.x + offX, this.y + offY)
        const x = this.x + offX
        const y = this.y + offY
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
        entities.forEach( (entity) => {
            if(entity.x == x && entity.y == y){
                return(entity)
            }
        })
        return(undefined)
    }
}

var enemy =  {
    x: 0,
    y: 0,
    color: "#FF00FF",
    type: "enemy",

    move: function() {
        //this.simplePathfind()
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

        var bestMove = {x: 0, y: 0}
        for(var i = 0; i < possibleMoves.length; i++){
            var newMove = {x: this.x + possibleMoves[i].x, y: this.y + possibleMoves[i].y}
            if(distance(newMove,playerPosition)<=distance({x: this.x + bestMove.x, y: this.y + bestMove.y },playerPosition)){
                bestMove = possibleMoves[i]
            }
        }
    }
}

var player = {
    x: 2,
    y: 2,
    color: "#00FF00",
    type: "player",
}
