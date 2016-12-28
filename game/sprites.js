/* create image object from path */
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
    
    /* render sprite to given (absolute) x and y position
     * (cells are not considered!) */
    that.render = function (x, y, frame = 0) {
        drawingContext.drawImage(that.image, frame * that.width, 0, that.width, that.height, x, y, that.width, that.height);
    };
    
    return that;
}
