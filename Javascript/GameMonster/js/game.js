const action = document.getElementById("action");
const contextAction = action.getContext("2d");

const layout = document.getElementById("layout");
const contextLayout = layout.getContext("2d");

// Create requestAnimationFrames for browers 
var requestAnimationFrame = window.requestAnimationFrame ||
														window.webkitRequestAnimationFrame ||
														window.msRequestAnimationFrame ||
														window.mozRequestAnimationFrame;

// Create heart image
var heartImage = new Image();
heartImage.src = "img/heart.png";

// Create blood monster
var bloodImage = new Image();
bloodImage.src = "img/blood.png";

/* Create all buttons as boom, pause, restart */
// Create boom button
const imgBoom = new Image();
imgBoom.src = "img/boom.png";
const btnBoom = {
	x: (action.width - 50) / 2,
	y: action.height / 2 - 15,
	size: 50
}

// Create restart button
const imgRestart = new Image();
imgRestart.src = "img/restart.png";
const btnRestart = {
	x: action.width - 30 - 10,
	y: 10,
	size: 30
}

// Create pause button
const imgPause = new Image();
imgPause.src = "img/pause.png";
const btnPause = {
	x: action.width - 30 - 10,
	y: 95,
	size: 30
}

/* Create blood monster */
const imgBlood = new Image();
imgBlood.src = "img/blood.png";

/* class Game */
var Game = function() {
	this.lose;
	this.isRun;
	
	this.score;
	this.heart;
	this.boom;
	this.level;
	this.speed;
	this.distance;
	this.monsters = new Array();
	this.arrSrcMonster = new Array();
	this.sizeMonster;
	this.arrPointMonster = new Array();
	this.bloods = new Array();
	this.sizeBlood;
	
	let seft = this;
	
	/* Method */
	this.init = function() {
		this.lose = false;
		this.isRun = true;
		
		this.score = 0;
		this.heart = 3;
		this.boom = 3;
		this.level = 1;
		this.speed = 1;
		this.monsters.splice(0, this.monsters.length);
		this.arrSrcMonster = getArrSrcMonster();
		this.sizeMonster = 70;
		this.arrPointMonster = getArrPointMonster();
		this.distance = 230;
		this.bloods.splice(0, this.bloods.length);
		this.sizeBlood = 70;
	}
	
	this.newMonster = function() {
		if (seft.isRun) {
			var monster = randomMonster();
			seft.monsters.push(monster);
		}
	}
	
	function randomMonster() {
		/* Hình ảnh đại diện */
		var avatar = new Image();
		avatar.src = seft.arrSrcMonster[Math.floor(Math.random() * seft.arrSrcMonster.length)];
		
		/* Điểm xuất phát */
		var iPoint = Math.floor(Math.random() * seft.arrPointMonster.length);
		var x = seft.arrPointMonster[iPoint].x;
		var y = seft.arrPointMonster[iPoint].y;
		
		/* Hướng di chuyển */
		var directionX = 1;
		var directionY = 1;
		if ((x === (layout.width - seft.sizeMonster) / 2) &&
				(y === (layout.height - seft.sizeMonster) / 2)) {		// TH đặc biệt: Trung tâm -> Di chuyển tự do
			do {
				directionX = Math.floor(Math.random() * 3 - 1);							// -1, 0, 1
				directionY = Math.floor(Math.random() * 3 - 1);							// -1, 0, 1
			} while(directionX === 0 && directionY === 0);		// nếu cả hướng của x và y đều bằng 0 -> đặt lại
		} else {																								// TH ở biên
			if (x >= (layout.width - seft.sizeMonster) / 2) {
				directionX = (x === (layout.width - seft.sizeMonster) / 2) ? 0 : -1;
			}
			if (y >= (layout.height - seft.sizeMonster) / 2) {
				directionY = (y === (layout.height - seft.sizeMonster) / 2) ? 0 : -1;
			}
		}
		
		/* Nếu là Monster trung tâm thì không cần đảo hướng. Ngược lại, đảo hướng 1 lần */
		var reverse = ((x === (layout.width - seft.sizeMonster) / 2) &&
									(y === (layout.height - seft.sizeMonster) / 2))
									? 0 : 1;
		
		return new Monster(avatar, seft.sizeMonster, x, y, directionX, directionY, reverse);
	}
	
	function getArrSrcMonster() {
		var arrSrc = new Array();
		var dir = "img/monsters/";
		for (let i = 1; i <= 15; i++) {
			arrSrc.push(dir + i + ".png");
		}
		return arrSrc;
	}
	
	/* create array 9 position monster entry */
	function getArrPointMonster() {
		var arrPoint = new Array();
		for (let jY = 0; jY <= layout.height - seft.sizeMonster;
					jY += (layout.height - seft.sizeMonster) / 2) {
			for (let iX = 0; iX <= layout.width - seft.sizeMonster;
						iX += (layout.width - seft.sizeMonster) / 2) {
				arrPoint.push({ x: iX, y: jY });
			}
		}
		return arrPoint;
	}
	
	this.start = function() {
		if (!seft.lose) {
			if (seft.heart < 0) {
				gameOver();
			} else if (seft.isRun) {
				seft.display();
				seft.process();
			}
		}
		
		requestAnimationFrame(seft.start);
	}
	
	function gameOver() {
		drawAction();
		drawLayout();
		seft.lose = true;
		seft.isRun = false;
    contextLayout.fillStyle = "red";
    contextLayout.font = "69px Arial";
    contextLayout.fillText("Game over", 100, 200);
    contextLayout.font = "30px Ravie";
    contextLayout.fillStyle = "orange";
    contextLayout.fillText("Score = " + seft.score, 180, 200 + 69);
	}
	
	this.display = function() {
		drawAction();
		drawLayout();
	}
	
	function drawAction() {
		contextAction.clearRect(0, 0, action.width, action.height);
    contextAction.fillStyle = "yellow";
    contextAction.font = "18px Arial";
    contextAction.fillText("Score: " + seft.score, 15, 30);
    contextAction.fillText("Random Monster: " + seft.monsters.length, 200, 30);
    contextAction.fillText("Heart: ", 15, 60);
		contextAction.fillText("Level: " + seft.level, 15, 90);
    contextAction.fillText("Speed: " + seft.speed, 15, 120);

    for (let i = 0; i < seft.heart; i++) {
			contextAction.drawImage(heartImage, (69 + i * 15), 45, 15, 15);
    }
		
		contextAction.drawImage(imgBoom, btnBoom.x, btnBoom.y, btnBoom.size, btnBoom.size);
		contextAction.drawImage(imgRestart, btnRestart.x, btnRestart.y, btnRestart.size, btnRestart.size);
		contextAction.drawImage(imgPause, btnPause.x, btnPause.y, btnPause.size, btnPause.size);
    contextAction.fillStyle = "red";
    contextAction.font = "30px Arial";
    contextAction.fillText(seft.boom, btnBoom.x + btnBoom.size, btnBoom.y + btnBoom.size - 10);
	}

	function drawLayout() {
		contextLayout.clearRect(0, 0, layout.width, layout.height);
		
		// Draw monsters
		seft.monsters.forEach(function(element) {
			contextLayout.drawImage(element.avatar, element.currentX, element.currentY,
															element.size, element.size);
		});
		
		// Draw bloods
		let iBlood = 0;
		while (iBlood < seft.bloods.length) {
			var timeNow = Date.now();
			if (timeNow - seft.bloods[iBlood].timeDie <= 5000) {
				contextLayout.drawImage(imgBlood, seft.bloods[iBlood].x, seft.bloods[iBlood].y,
																seft.sizeBlood, seft.sizeBlood);
			} else {
				seft.bloods.splice(iBlood, 1);
				continue;
			}
			iBlood++;
		}
	}
	
	this.process = function() {
		updateMonsters();
		updateLevel();
	}
	
	/* Update monsters */
	function updateMonsters() {
		let iMon = 0;
		while (iMon < seft.monsters.length) {
			seft.monsters[iMon].update(seft.speed, seft.distance, layout);
			if (!seft.monsters[iMon].exist) {
				seft.heart--;
				seft.monsters.splice(iMon, 1);
				continue;
			}
			iMon++;
		}
	}
	
	/* Update level */
	function updateLevel() {
		if (seft.level <= Math.floor(seft.score / 100)) {
			if (seft.heart < 5) {
				seft.heart++;
			}
			seft.boom++;
			
			if (seft.level < 10) {
				var level_old = seft.level;
				seft.level = Math.floor(seft.score / 100) + 1;
				if (seft.level > level_old) {
					seft.speed += .5;
				}
			}
		}
	}
	
	/* Event click */
	this.addEventClick = function() {
		actionClick();
		layoutClick();
	}
	
	function actionClick() {
		action.addEventListener("click", function(e) {
			let xPosition = e.pageX - this.offsetLeft;
			let yPosition = e.pageY - this.offsetTop;
			
			if (!seft.lose)	{															// Game chưa kết thúc
				if ((xPosition >= btnBoom.x && xPosition <= btnBoom.x + btnBoom.size) &&
						(yPosition >= btnBoom.y && yPosition <= btnBoom.y + btnBoom.size)) {
					if (seft.isRun && (seft.boom > 0)) {			// Game đang chạy & còn boom
						seft.score += seft.monsters.length * 10;
						while (seft.monsters.length != 0) {
							seft.bloods.push({ x: seft.monsters[0].currentX, y: seft.monsters[0].currentY,
																timeDie: Date.now() });
							seft.monsters.splice(0, 1);
						}
						seft.boom--;
					}
				}
				
				if ((xPosition >= btnPause.x && xPosition <= btnPause.x + btnPause.size) &&
						(yPosition >= btnPause.y && yPosition <= btnPause.y + btnPause.size)) {
					seft.isRun = !seft.isRun;
				}
			}
			
			if ((xPosition >= btnRestart.x && xPosition <= btnRestart.x + btnRestart.size) &&
					(yPosition >= btnRestart.y && yPosition <= btnRestart.y + btnRestart.size)) {
				seft.init();
			}
		});
	}
	
	function layoutClick() {
		layout.addEventListener("click", function(e) {
			if (seft.isRun) {
				let xPosition = e.pageX - this.offsetLeft;
				let yPosition = e.pageY - this.offsetTop;
				
				var target = -1;
				seft.monsters.forEach(function(element) {
					if ((xPosition >= element.currentX && xPosition <= element.currentX + element.size) &&
							(yPosition >= element.currentY && yPosition <= element.currentY + element.size)) {
						target = seft.monsters.indexOf(element);
						seft.monsters[target].exist = false;
					}
				});
				
				if (target != -1) {
					seft.score += 10;
					seft.bloods.push({ x: seft.monsters[target].currentX, y: seft.monsters[target].currentY,
														timeDie: Date.now() });
					seft.monsters.splice(target, 1);
				} else {
					seft.score = (seft.score >= 5) ? seft.score - 5 : 0;
					seft.heart--;
				}
			}
		});
	}
}