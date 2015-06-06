/// <reference path="sprite.js" />

function Actor(sprite, posX, posY){
	this.sprite = sprite;
	this.posX = posX || 0;
	this.posY = posY || 0;
	this.alpha = 1.0;
	this.killed = false;
}

Actor.prototype.clicked = function(){
	this.killed = true;	
};

Actor.prototype.update = function(){
	//this.alpha = Math.random();
};

Actor.prototype.draw = function(context){
	// only save and restore context if there are effects to apply
	// so if we need to flip, change alpha etc.
	// probably more efficient to flip by creating a different image though
	// so have a hasEffects or applyFilters flag and wrap a check around it.
	/*
	context.save();
	context.globalAlpha = this.alpha;
	*/
	
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
	
	//context.restore();
};