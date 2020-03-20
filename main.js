var image = new Image();
image.src = "happy.png";

var image2 = new Image();
image2.src = "ill.png";

var image3 = new Image();
image3.src = "death.png";

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var populationSize = 48;
var population = [];

for (var i = 0; i < populationSize; i++) {
	population.push(createPerson());
}

var infectedPerson = createPerson();
infectedPerson.infected = true;

population.push(infectedPerson);

setInterval(function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < population.length; i++) {
		population[i].move();
		population[i].draw(ctx);
		if (population[i].infected == true){
			population[i].ill();
		}
	}
	for (var i = 0; i < population.length; i++) {
		for (var j = i + 1; j < population.length; j++) {
			population[i].infect(population[j]);
		}
	}
	
}, 20);

var radius = 20;
var speed = 5;
function createPerson() {
	return {
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,

		velocityX: 3 * (Math.random() - 0.5),
		velocityY: 3 * (Math.random() - 0.5),

		health: 1,

		infectedTime: 0,
		infected: false,
		wasInfected: false,
		death: false,
		imun: (Math.random()+ 0.001) * 0.007,
		move: function() {
			this.x += this.velocityX;
			this.y += this.velocityY;

			if (this.x < 0) {
				this.x = 0;
				this.velocityX *= -1;
			}

			if (this.y < 0) {
				this.y = 0;
				this.velocityY *= -1;
			}

			if (this.x > canvas.width - radius) {
				this.x = canvas.width - radius;
				this.velocityX *= -1;
			}

			if (this.y > canvas.height - radius) {
				this.y = canvas.height - radius;
				this.velocityY *= -1;
			}

			this.infectedTime++;
			if (this.infectedTime > 200) {
				this.infected = false;
			}
		},
		
		infect: function(person) {
			if (this.infected && person.infected) {
				return;
			}
			if (!this.infected && !person.infected) {
				return;
			}
			if (Math.abs(this.x - person.x) < radius && Math.abs(this.y - person.y) < radius) {
				if (!this.wasInfected) {
					this.infected = true;
					this.wasInfected = true;
					this.infectedTime = 0;
				}

				if (!person.wasInfected) {
					person.infected = true;
					person.wasInfected = true;
					person.infectedTime = 0;
				}
			}
		},
		ill: function () {
			if (this.health >= 0) {
				this.health -= this.imun;
			}else{
				this.infected = false;
				this.velocityX = 0;
				this.velocityY = 0;
				this.death = true;
			}
		},

		draw: function(ctx) {
			if(this.death){
				ctx.drawImage(image3, this.x, this.y, radius, radius);				
			}
			else if (this.infected) {
				ctx.drawImage(image2, this.x, this.y, radius, radius);
			}
			else {
				ctx.drawImage(image, this.x, this.y, radius, radius);
			}
		}
	}
}

var canvasChart = document.getElementById("canvasChart");
var ctxChart = canvasChart.getContext("2d");

var shift = 0;
var shiftSize = 10;
var zoom = 10;

setInterval(function() {
	var infectedCount = 0;
	var deathCount = 0;
	for (var i = 0; i < population.length; i++) {
		if(population[i].death){
			deathCount++;
		}
		if (population[i].infected) {
			infectedCount++;
		}
	}
	if (infectedCount == 0 && deathCount > 0) {
		alert("People win!, " + deathCount + " death in this hard fight with coronavirus!");
	}
	else if(deathCount == populationSize){
		alert("Coronavirus win, all people are death!")
	}
	ctxChart.beginPath();
	ctxChart.strokeStyle = "black";
	ctxChart.rect(shift * shiftSize, canvasChart.height - infectedCount * zoom, shiftSize, infectedCount * zoom)
	ctxChart.stroke();

	ctxChart.beginPath();
	ctxChart.strokeStyle = "red";
	ctxChart.rect(shift * shiftSize, canvasChart.height - infectedCount * zoom - deathCount * zoom, shiftSize, deathCount * zoom);
	ctxChart.stroke();
	shift++;
}, 1000);