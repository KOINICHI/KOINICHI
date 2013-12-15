function moveKOINICHI(sign)
{
	var KOINICHI = document.getElementById("KOINICHI");
	pos = KOINICHI.style.marginLeft;
	pos = parseInt(pos.slice(0,-2)) + (10*sign) + "px";
	console.log("new pos: " + pos)
	KOINICHI.style.marginLeft = pos;
}

$(document).keydown(function(e) {
	if (e.which == 37) { moveKOINICHI(-1); }
	if (e.which == 39) { moveKOINICHI(+1); }
})