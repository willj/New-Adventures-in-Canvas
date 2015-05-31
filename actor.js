/// <reference path="sprite.js" />

function Actor(sprite, posX, posY){
	this.sprite = sprite;
	this.posX = posX || 0;
	this.posY = posY || 0;
}

Actor.prototype.draw = function (context){
	// object.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	
	context.drawImage(
			this.sprite.image,
			this.sprite.sourceX,
			this.sprite.sourceY,
			this.sprite.width,
			this.sprite.height,
			this.posX, 
			this.posY,
			this.sprite.width,
			this.sprite.height);
};