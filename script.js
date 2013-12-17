function moveKOINICHI(sign)
{
	var pos = $("#KOINICHI").css("left")
	pos = parseInt(pos.slice(0,-2)) + (10*sign) + "px";
	$("#KOINICHI").css("left", pos)
	//console.log("new pos: " + pos);
}
function moveArm(sign)
{
	var MAX_DEG = 60, MIN_DEG = -60;
	var leftarm  = document.getElementById("leftarm");
	var rightarm = document.getElementById("rightarm");
	
	var degree        = leftarm.style.Transform;       // Normal
	var msdegree      = leftarm.style.msTransform;     // MS
	var mozdegree     = leftarm.style.MozTransform;    // FireFox
	var webkitdegree  = leftarm.style.WebkitTransform; // Chrome
	
	if (degree != undefined)       degree = parseInt(degree.slice(7,-4));
	if (msdegree != undefined)     degree = parseInt(msdegree.slice(7,-4));
	if (mozdegree != undefined)    degree = parseInt(mozdegree.slice(7,-4));
	if (webkitdegree != undefined) degree = parseInt(webkitdegree.slice(7,-4));
	
	if (sign < 0) degree = Math.max(MIN_DEG, degree+(5*sign));
	if (sign > 0) degree = Math.min(MAX_DEG, degree+(5*sign));
	
	leftarm.style.Transform  = "rotate(" + degree + "deg)"
	rightarm.style.Transform = "rotate(" + degree + "deg)"
	leftarm.style.msTransform  = "rotate(" + degree + "deg)"
	rightarm.style.msTransform = "rotate(" + degree + "deg)"
	leftarm.style.MozTransform  = "rotate(" + degree + "deg)"
	rightarm.style.MozTransform = "rotate(" + degree + "deg)"
	leftarm.style.WebkitTransform  = "rotate(" + degree + "deg)"
	rightarm.style.WebkitTransform = "rotate(" + degree + "deg)"
	
	//console.log("degree : " + degree)
}
function jumpKOINICHI(step)
{
	var pos = $("#KOINICHI").css("margin-bottom")
	pos = (490.5*step - 0.5*9.81*step*step)/100;
	$("#KOINICHI").css("margin-bottom", pos)
	//console.log("new pos: " + pos);
}
function shakeAntenna(step)
{
	var MAX_DEG = 60, MIN_DEG = 30, DEF_DEG=45;
	
	var leftantenna  = document.getElementById("leftantenna");
	var rightantenna = document.getElementById("rightantenna");
	
	var degree        = leftantenna.style.Transform;       // Normal
	var msdegree      = leftantenna.style.msTransform;     // MS
	var mozdegree     = leftantenna.style.MozTransform;    // FireFox
	var webkitdegree  = leftantenna.style.WebkitTransform; // Chrome
	
	if (degree != undefined)       degree = parseInt(degree.slice(7,-4));
	if (msdegree != undefined)     degree = parseInt(msdegree.slice(7,-4));
	if (mozdegree != undefined)    degree = parseInt(mozdegree.slice(7,-4));
	if (webkitdegree != undefined) degree = parseInt(webkitdegree.slice(7,-4));
	
	degree = 4*Math.sin(Math.PI*step/25) + DEF_DEG;
	
	leftantenna.style.Transform  = "rotate(" + degree + "deg)"
	rightantenna.style.Transform = "rotate(" + -degree + "deg)"
	leftantenna.style.msTransform  = "rotate(" + degree + "deg)"
	rightantenna.style.msTransform = "rotate(" + -degree + "deg)"
	leftantenna.style.MozTransform  = "rotate(" + degree + "deg)"
	rightantenna.style.MozTransform = "rotate(" + -degree + "deg)"
	leftantenna.style.WebkitTransform  = "rotate(" + degree + "deg)"
	rightantenna.style.WebkitTransform = "rotate(" + -degree + "deg)"
	
	console.log("degree: " + degree + " " + step);
}


var keys = {}
var motions = {}


$(document).keydown(function(e) {
	keys[e.which] = true;
	console.log(keys)
})

$(document).keyup(function(e) {
	delete keys[e.which];
})

function createInterval(Duration, stepDuration, moveFunction, motion)
{
	motions[motion] = true;
	var step=0;
	var timer = setInterval(function() {
		moveFunction(step++);
		if (step>Duration) {
			clearInterval(timer);
			motions[motion] = false;
		}} ,stepDuration);
}

function updateMoves()
{
	if (keys[37]) { moveKOINICHI(-1); } // move left
	if (keys[39]) { moveKOINICHI(+1); } // move right
	if (keys[38]) { moveArm(-1); } // arm up
	if (keys[40]) { moveArm(1); }  // arm down
	if (keys[88] && !motions["shaking"]) { 
		var shakeDuration = 100;
		var stepDuration = 1;
		createInterval(shakeDuration, stepDuration, shakeAntenna, "shaking");
	}
	if (keys[90] && !motions["jumping"]) { // jump
		var jumpDuration = 100;
		var stepDuration = 10;
		createInterval(jumpDuration, stepDuration, jumpKOINICHI, "jumping");
	}
}

setInterval(function(){ updateMoves(); }, 25);