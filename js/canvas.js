

var gridSize,
	canvasImage;

var minRows = 3,
	maxRows = 10,
	minColumns = 3,
	maxColumns = 10;

function getGridSize () {
	// fixed hardcoded value for now
	if (!gridSize) {
		gridSize = {
			rows: 4,
			columns: 4
		};
	}

	return gridSize;
}

function setGridSize (newSize) {
	gridSize = newSize;

	var gridSizeContainer = document.getElementById('grid-size');
	gridSizeContainer.innerHTML = gridSize.rows + ' x ' + gridSize.columns;

	var canvas = document.getElementById('processing-canvas');
	clearCanvas(canvas);
	drawImageInCanvas(canvasImage, canvas);
	drawGuidelinesOnCanvas(canvas);
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


function clearCanvas (canvas) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
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


function bindGridSizeActions () {

	var decreseGridButton = document.getElementById('decrease-grid-size-button'),
		increseGridButton = document.getElementById('increase-grid-size-button'),
		gridSizeContainer = document.getElementById('grid-size');

	var gridSize = getGridSize();

	increseGridButton.onclick = function () {

		gridSize.columns++;
		gridSize.rows++;

		if (gridSize.rows <= maxRows && gridSize.columns <= maxColumns) {
			setGridSize(gridSize);
		}
	};

	decreseGridButton.onclick = function () {

		gridSize.columns--;
		gridSize.rows--;

		if (gridSize.rows >= minRows && gridSize.columns >= minColumns) {
			setGridSize(gridSize);
		}
	};
}


function bindCanvasHandlers () {

	bindGridSizeActions();
}


function initStepTwo(imageData) {

	var stepTwoContainer = document.getElementById('step-two-container'),
		canvas = document.getElementById('processing-canvas');

	canvasImage = imageData;

	bindCanvasHandlers();
		
	drawImageInCanvas(imageData, canvas);

	showContainer(stepTwoContainer);
}