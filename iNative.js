/*
	iNative.js
	Simple script to make your web apps look more native on ios
*/

//Prevent Safari spring behavoir
document.addEventListener("touchmove",function(e) {
	e.preventDefault();
});

window.onorientationchange = function() 
{
	if (Math.abs(window.orientation) === 90) 
	{
    	// Landscape
    	landscape();
	} 
	else 
	{
		// Portrait
		portrait();
	}
}