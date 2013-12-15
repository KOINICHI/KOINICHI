function moveKOINICHI(sign)
{
	var KOINICHI = document.getElementById("KOINICHI");
	pos = KOINICHI.style.marginLeft;
	pos = parseInt(pos.slice(0,-2)) + (10*sign) + "px";
	console.log("new pos: " + pos);
	KOINICHI.style.marginLeft = pos;
}
function jumpKOINICHI(step)
{
	var KOINICHI = document.getElementById("KOINICHI");
	
	var pos = KOINICHI.style.marginBottom;
	pos = (490.5*step - 0.5*9.81*step*step)/100;
	console.log("new pos: " + pos);
	KOINICHI.style.marginBottom = pos + "px";
}

var keys = {}
var jumping = false;
$(document).keydown(function(e) {
	if (e.which == 37) { moveKOINICHI(-1); } // move Left
	if (e.which == 39) { moveKOINICHI(+1); } // move Right
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
