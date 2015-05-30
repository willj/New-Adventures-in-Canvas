	
	function Game(container, settings, readyCallback){			
		var self = this;	
		this.settings = settings;
		this.readyCallback = readyCallback;
		
		this.gameLoopIntervalId;
		
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.count = 0;
																				
		// this.canvas.width = container.clientWidth;
		// this.canvas.height = container.clientHeight;								
		this.canvas.width = this.settings.canvasWidth;
		this.canvas.height = this.settings.canvasHeight;
		
		container.appendChild(this.canvas);
						
		this.image = new Image();
		this.image.onload = function(){				
			self.readyCallback.apply(this, []);	
		};
		
		this.image.src = "circle.png";
	};			
	
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
		this.count += 1;
		
		if (this.count >= 100){
			this.stopGame();
		}
	};
	
	Game.prototype.draw = function draw(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
						
		this.context.drawImage(this.image, 400, 192);
	};