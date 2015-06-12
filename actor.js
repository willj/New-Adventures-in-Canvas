/// <reference path="sprite.js" />

function Actor(name, sprite, posX, posY){
	this.name = name;
	this.sprite = sprite;
	this.posX = posX || 0;
	this.posY = posY || 0;
	this.alpha = 1.0;
	this.killed = false;
	this.currentState = "initial";
	this.currentStateFrameCount = this.sprite.states[this.currentState].length;
	this.currentFrame = 0;
	this.currentSourceX = this.sprite.states[this.currentState][this.currentFrame] * this.sprite.width;
	this.tickCount = 0;
	this.ticksPerUpdate = 3;
}

Actor.prototype.clicked = function(){
	this.killed = true;	
};

Actor.prototype.update = function(){
	this.tickCount = (this.tickCount + 1) % this.ticksPerUpdate;
	
	//this.alpha = Math.random();
	this.updateFrame();
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
			this.currentSourceX,
			this.sprite.sourceY,
			this.sprite.width,
			this.sprite.height,
			this.posX, 
			this.posY,
			this.sprite.width,
			this.sprite.height);
	
	//context.restore();
};

Actor.prototype.setState = function(stateName){
	this.currentState = stateName;
	this.currentStateFrameCount = this.sprite.states[this.currentState].length;
	this.currentFrame = 0;	
};

Actor.prototype.updateFrame = function(){
	if (this.tickCount > 0){
		return;
	}
	
	this.currentFrame += 1;
	if (this.currentFrame > this.currentStateFrameCount){
		this.currentFrame = 0;
	}
	
	if(typeof this.sprite.states[this.currentState][this.currentFrame] === "string"){
		if (this.sprite.states[this.currentState][this.currentFrame] === "die"){
			this.killed = true;	
		} else {
			this.setState(this.sprite.states[this.currentState][this.currentFrame]);	
		}
	} else {
		this.currentSourceX = this.sprite.states[this.currentState][this.currentFrame] * this.sprite.width;
	}
};