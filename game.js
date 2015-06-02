	
	/// <reference path="sprite.js" />
	/// <reference path="actor.js" />
	/// <reference path="math.extensions.js" />
	/// <reference path="assetMap.js" />
	
	function Game(container, settings, readyCallback){			
		var self = this;	
		this.settings = settings;
		this.readyCallback = readyCallback;
		
		this.gameLoopIntervalId;
		this.actors = [];
		this.newActorWeighting = 0.0;
		this.images = {};
		this.imagesLoaded = 0;
		this.sprites = {};
		
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.frameCount = 0;
		this.approxRunTimeInSeconds = 0;
		//this.lastSecond = 0;
																				
		// this.canvas.width = container.clientWidth;
		// this.canvas.height = container.clientHeight;								
		this.canvas.width = this.settings.canvasWidth;
		this.canvas.height = this.settings.canvasHeight;
		
		container.appendChild(this.canvas);
				
		this.canvas.addEventListener("click", function (e){
			// wrap in anon func so "this" points to Game and not the canvas element
			self.onMouseClick(e);
		});
		
		this.loadAssets();
	}			
	
	Game.prototype.startGame = function(){
		var self = this;				
	
		self.gameLoopIntervalId = setInterval(function() {
			self.update();
			self.draw();	
		}, 1000/self.settings.framesPerSecond);
	};
	
	Game.prototype.stopGame = function(){
		clearInterval(this.gameLoopIntervalId);
	};
	
	Game.prototype.update = function update(){
		this.frameCounter();
		this.updateOncePerSecond();
		
		for (var i = 0; i < this.actors.length; i++) {
			this.actors[i].update();
		}

		this.generateNewActors();
	
	};
	
	Game.prototype.draw = function (){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (var i = 0; i < this.actors.length; i++){
			this.actors[i].draw(this.context);
		}
	};
	
	Game.prototype.updateOncePerSecond = function(){
		if (this.frameCount !== 0){
			return;
		}
		
		this.approxRunTimeInSeconds += 1;
		/*
		if (this.lastSecond !== this.approxRunTimeInSeconds){
			this.lastSecond += 1;
		}
		*/
		
		// Update newActorWeighting so we get new actors appear quicker the later in the game we are.
		this.newActorWeighting = (Math.floor(this.approxRunTimeInSeconds / 10) * 0.1) + 0.1;
	};
	
	Game.prototype.loadAssets = function(){

		for (var i = 0; i < this.settings.assetMap.length; i++){
			var newImage = new Image();
			this.images[this.settings.assetMap[i].fileName] = newImage;
			
			newImage.onload = this.assetLoaded(this.settings.assetMap[i]);
			
			newImage.src = this.settings.assetDirectory + this.settings.assetMap[i].fileName;	
		}
	};
	
	Game.prototype.assetLoaded = function(asset){
		this.imagesLoaded += 1;

		for (var i = 0; i < asset.sprites.length; i++){
			var spr = asset.sprites[i];
			this.sprites[spr.name] = new Sprite(this.images[asset.fileName], spr.startX, spr.startY, spr.width, spr.height);	
		}
		
		if (this.imagesLoaded == this.settings.assetMap.length){
			this.readyCallback.apply(this, []);	
		}
	};
	
	Game.prototype.frameCounter = function(){
		// keep a count of frames in this second and total runtime seconds so we can do things at a slower pace than fps
		this.frameCount = (this.frameCount + 1) % this.settings.framesPerSecond;
	};
	
	Game.prototype.generateNewActors = function(){
		if (this.frameCount % 4 === 0){
			if (Math.random() < this.newActorWeighting){
				var x = Math.extensions.getRandomInt(0,this.settings.canvasWidth);
				var y = Math.extensions.getRandomInt(0,this.settings.canvasHeight);
				
				if (x % 2 === 0){
					this.actors.push(new Actor(this.sprites["redCircle"], x, y));
				} else {
					this.actors.push(new Actor(this.sprites["yellowCircle"], x, y));	
					//this.actors.push(new Actor(this.sprites["pidge"], x, y));
				}			
			}
		}	
	};
	
	Game.prototype.onMouseClick = function(e){
				
		// event doesn't give us coords within our canvas element but within the visible viewport
		// so we need to offset the canvas position 
		var canvasRect = this.canvas.getBoundingClientRect();
		var mouseX = e.clientX - canvasRect.left;
		var mouseY = e.clientY - canvasRect.top;
		
		console.log("click: " + mouseX + " " + mouseY);		
		
		for (var i = 0; i < this.actors.length; i++){
			if (this.detectClickCollision(mouseX, mouseY, this.actors[i])){
				console.log("kaboom!");
			}
		}
	};
	
	Game.prototype.detectClickCollision = function(mouseX, mouseY, actor){		
		if (mouseX >= actor.posX && mouseX <= (actor.posX + actor.sprite.width)){
			if (mouseY >= actor.posY && mouseY <= actor.posY + actor.sprite.height){
				return true;
			}
		}
		
		return false;
	};