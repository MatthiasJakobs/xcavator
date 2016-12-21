function inherit(child,parent){
	var intermediate = {}
	Object.assign(intermediate, child)
	Object.assign(child, parent)
	Object.assign(child, intermediate)
    intermediate = {}
    Object.assign(intermediate, child)
    return intermediate

}

function changeStringAtIndex(string, index, character){
    return(string.substr(0,index) + character + string.substr(index+1))
}

function distance(from,to){
    const vector = { x: to.x-from.x, y: to.y-from.y}
    return(Math.sqrt(Math.pow(vector.x,2) + Math.pow(vector.y,2)))
}
