function getPixels(canv) {
	var cx = canv.getContext("2d");
	var pixels = cx.getImageData(0,0,25,25);
	return pixels;
};

window.getPixels = getPixels;