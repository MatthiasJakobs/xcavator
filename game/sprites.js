function loadImg(path) {
    var img = new Image();
    img.src = path;
    return img;
}

var artwork = {
    player: loadImg("res/player.png"),
    enemy: loadImg("res/enemy.png")
};

/* sprite object */
function sprite(options) {
    var that = {};
    
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    
    that.render = function (x, y) {
        drawingContext.drawImage(that.image, 0, 0, that.width, that.height, x, y, that.width, that.height);
    };
    
    return that;
}
