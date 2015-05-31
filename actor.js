/// <reference path="sprite.js" />

function Actor(sprite, posX, posY){
	this.sprite	= sprite;
	this.posX = posX || 0;
	this.posY = posY || 0;
}

Actor.prototype.draw = function (context){
	context.drawImage(this.sprite.image, this.posX, this.posY);
};