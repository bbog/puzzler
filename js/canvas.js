


function getGridSize () {
	// fixed hardcoded value for now
	return {
		rows: 4,
		columns: 4
	};
}


function drawGuidelinesOnCanvas (canvas) {

	var width  = canvas.width,
		height = canvas.height,
		gridSize = getGridSize();


}


function drawImageInCanvas (imageData, canvas) {

	var context = canvas.getContext('2d');

	var image = new Image();

	image.onload = function () {

		var imageWidth  = this.width,
			imageHeight = this.height;

		canvas.width  = imageWidth;
		canvas.height = imageHeight;

		var srcX = 0,
			srcY = 0,
			srcW = imageWidth,
			srcH = imageHeight;

		var destX = 0,
			destY = 0,
			destW = imageWidth,
			destH = imageHeight;

		context.drawImage(image, srcX, srcY, srcW, srcH, destX, destY, destW, destH);

		drawGuidelinesOnCanvas(canvas);
	}

	image.src = imageData;
}


function initStepTwo(imageData) {

	var stepTwoContainer = document.getElementById('step-two-container'),
		canvas = document.getElementById('processing-canvas');
		
	drawImageInCanvas(imageData, canvas);

	showContainer(stepTwoContainer);
}