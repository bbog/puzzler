


function getGridSize () {
	// fixed hardcoded value for now
	return {
		rows: 4,
		columns: 4
	};
}


function drawCanvasLine (context, originX, originY, endX, endY) {

	context.setLineDash([5]);
	context.strokeStyle = '#ff0000';

	context.beginPath();
	context.moveTo(originX, originY);
	context.lineTo(endX, endY);
	context.stroke();
}


function drawGuidelinesOnCanvas (canvas) {

	var context = canvas.getContext('2d');

	var width  = canvas.width,
		height = canvas.height,
		gridSize = getGridSize(),
		rowHeight = Math.round(height / gridSize.rows),
		columnWidth = Math.round(width / gridSize.columns);

	// drawing the row lines
	var rowIndex = 1,
		totalRows = gridSize.rows;
	for ( ; rowIndex < totalRows; rowIndex++) {

		var originX = 0,
			originY = rowIndex * rowHeight;
			endX = width,
			endY = originY;

		drawCanvasLine(context, originX, originY, endX, endY);
	}


	// drawing the column lines
	var columnIndex = 1,
		totalColumns = gridSize.columns;
	for ( ; columnIndex < totalColumns; columnIndex++) {

		var originX = columnIndex * columnWidth,
			originY = 0;
			endX = originX,
			endY = height;

		drawCanvasLine(context, originX, originY, endX, endY);
	}

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