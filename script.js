function moveKOINICHI(sign)
{
	var pos = $("#KOINICHI").css("margin-left")
	pos = parseInt(pos.slice(0,-2)) + (20*sign) + "px";
	$("#KOINICHI").css("margin-left", pos)
	console.log("new pos: " + pos);
}
function moveArm(sign)
{
	var MAX_DEG = 60, MIN_DEG = -60;
	var leftarm  = document.getElementById("leftarm");
	var rightarm = document.getElementById("rightarm");
	
	var degree        = leftarm.style.Transform;       // Normal
	var msdegree      = leftarm.style.msTransform;     // MS
	var webkitdegree  = leftarm.style.WebkitTransform; // Chrome
	
	if (degree != undefined)       degree = parseInt(degree.slice(7,-4));
	if (msdegree != undefined)     degree = parseInt(msdegree.slice(7,-4));
	if (webkitdegree != undefined) degree = parseInt(webkitdegree.slice(7,-4));
	
	if (sign < 0) degree = Math.max(MIN_DEG, degree+(5*sign));
	if (sign > 0) degree = Math.min(MAX_DEG, degree+(5*sign));
	
	leftarm.style.Transform  = "rotate(" + degree + "deg)"
	rightarm.style.Transform = "rotate(" + degree + "deg)"
	leftarm.style.msTransform  = "rotate(" + degree + "deg)"
	rightarm.style.msTransform = "rotate(" + degree + "deg)"
	leftarm.style.WebkitTransform  = "rotate(" + degree + "deg)"
	rightarm.style.WebkitTransform = "rotate(" + degree + "deg)"
	
	console.log("degree : " + degree)
}
function jumpKOINICHI(step)
{
	var pos = $("#KOINICHI").css("margin-bottom")
	pos = (490.5*step - 0.5*9.81*step*step)/100;
	$("#KOINICHI").css("margin-bottom", pos)
	console.log("new pos: " + pos);
}

var keys = {}
var jumping = false;
$(document).keydown(function(e) {
	if (e.which == 37) { moveKOINICHI(-1); } // move Left
	if (e.which == 39) { moveKOINICHI(+1); } // move Right
	if (e.which == 38) { moveArm(-1); } // arm up
	if (e.which == 40) { moveArm(1); } // arm down
	if (e.which == 32 && !jumping) { // jump
		jumping = true;
		var jumpDuration = 100;
		var stepDuration = 10;
		var step=0;
		var timer = setInterval(function() {
			jumpKOINICHI(step++);
			if (step>jumpDuration) {
				clearInterval(timer);
				jumping = false;
			}} ,stepDuration);
	}   
})
