	
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
		this.images = {};
		this.imagesLoaded = 0;
		this.sprites = {};
		
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.frameCount = 0;
		this.approxRunTimeInSeconds = 0;
		this.lastSecond = 0;
																				
		// this.canvas.width = container.clientWidth;
		// this.canvas.height = container.clientHeight;								
		this.canvas.width = this.settings.canvasWidth;
		this.canvas.height = this.settings.canvasHeight;
		
		container.appendChild(this.canvas);
		
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
		
		if (this.lastSecond !== this.approxRunTimeInSeconds){
			this.lastSecond += 1;
			//console.log(this.approxRunTimeInSeconds % 3);
		}

		for (var i = 0; i < this.actors.length; i++) {
			this.actors[i].update();
		}

		var x = Math.extensions.getRandomInt(0,this.settings.canvasWidth);
		var y = Math.extensions.getRandomInt(0,this.settings.canvasHeight);
		
		if (x % 2 === 0){
			this.actors.push(new Actor(this.sprites["redCircle"], x, y));
		} else {
			//this.actors.push(new Actor(this.sprites["yellowCircle"], x, y));	
			this.actors.push(new Actor(this.sprites["pidge"], x, y));
		}
		
		//console.log(this.frameCount);	
	};
	
	Game.prototype.draw = function (){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (var i = 0; i < this.actors.length; i++){
			this.actors[i].draw(this.context);
		}
		
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
				
		if (this.frameCount === 0){
			this.approxRunTimeInSeconds += 1;
		}	
	};