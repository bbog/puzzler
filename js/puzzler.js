(function () {

	// global references
	var imageData,
		uploadedImage,
		puzzle;

	var uploadButton = $('upload-button'),
		uploadFile   = $('upload-file'),
		canvas  = $('processing-canvas'),
		canvasForPieces = document.createElement('canvas'),
		context = canvas.getContext('2d'),
		gridSizeRowsContainer = $('grid-size-rows'),
		gridSizeColumnsContainer = $('grid-size-columns'),
		increaseGridRowsButton = $('increase-grid-rows-button'),
		decreaseGridRowsButton = $('decrease-grid-rows-button'),
		increaseGridColumnsButton = $('increase-grid-columns-button'),
		decreaseGridColumnsButton = $('decrease-grid-columns-button'),
		increaseGridButton = $('increase-grid-size-button'),
		decreaseGridButton = $('decrease-grid-size-button'),
		createPuzzleButton = $('create-puzzle-button');

	// default values
	var grid = {
		rows: 4,
		columns: 4
	};
	var gridOptions = {
		minRows: 3,
		maxRows: 10,
		minColumns: 3,
		maxColumns: 10
	};


	/** Common utility methods **/
	function showContainer (container) {

		container.style.display = 'block';
	};

	// we don't need no jQuery
	function $(id) {

		return document.getElementById(id);
	};



	/** Step one - upload **/
	function uploadErrorHandler (ev) {

		switch(ev.target.error.code) {

	  		case ev.target.error.NOT_FOUND_ERR:
	    		alert('File Not Found!');
	    		break;
	  		
	  		case ev.target.error.NOT_READABLE_ERR:
	    		alert('File is not readable');
	    		break;
	  		
	  		case ev.target.error.ABORT_ERR:
	    		break;
	  		default:
	    		alert('An error occurred reading this file.');
	    		break;
		};
	};


	function handleFileSelect (ev) {

	    var reader = new FileReader();

	    reader.onerror = uploadErrorHandler;
	    
	    //reader.onprogress = updateProgress;
	    
	    reader.onabort = function(e) {
	    	alert('File read cancelled');
	    };

	    reader.onloadstart = function(e) {
	    
	    };

	    reader.onload = function(e) {

	    	imageData = reader.result;
	    	initStepTwo(imageData);
	    }

	    // Read in the image file as a binary string.
	    reader.readAsDataURL(ev.target.files[0])
	};


	function bindUploadHandlers (uploadButton, uploadFile) {

		// styling for the upload button
		uploadButton.onchange = function () {
			uploadFile.value = this.value;
		};

		uploadButton.addEventListener('change', handleFileSelect, false);
	};


	function initFirstStep () {
		bindUploadHandlers(uploadButton, uploadFile);
	};


	/** Step two - grid settings **/
	function setGridSize (newGrid) {

		newGrid = newGrid || {};

		if (newGrid.rows) {
			grid.rows = newGrid.rows;	
		}

		if (newGrid.columns) {
			grid.columns = newGrid.columns;
		}
		

		updateGridText();

		updateCanvas();
	};


	function updateGridText () {

		gridSizeRowsContainer.innerHTML = grid.rows;
		gridSizeColumnsContainer.innerHTML = grid.columns;
	};


	function updateCanvas () {

		drawImageInCanvas();
	};


	function drawCanvasLine (originX, originY, endX, endY) {

		context.setLineDash([5]);
		context.strokeStyle = '#ff0000';

		context.beginPath();
		context.moveTo(originX, originY);
		context.lineTo(endX, endY);
		context.stroke();
	};


	function drawGuidelinesOnCanvas () {

		var width  = canvas.width,
			height = canvas.height,
			rowHeight = Math.round(height / grid.rows),
			columnWidth = Math.round(width / grid.columns);

		// drawing the row lines
		var rowIndex = 1,
			totalRows = grid.rows;
		for ( ; rowIndex < totalRows; rowIndex++) {

			var originX = 0,
				originY = rowIndex * rowHeight;
				endX = width,
				endY = originY;

			drawCanvasLine(originX, originY, endX, endY);
		}


		// drawing the column lines
		var columnIndex = 1,
			totalColumns = grid.columns;
		for ( ; columnIndex < totalColumns; columnIndex++) {

			var originX = columnIndex * columnWidth,
				originY = 0;
				endX = originX,
				endY = height;

			drawCanvasLine(originX, originY, endX, endY);
		}
	};


	function clearCanvas (canvas, context) {

		context.clearRect(0, 0, canvas.width, canvas.height);
	};


	function drawImageInCanvas () {

		uploadedImage = new Image();

		uploadedImage.onload = function () {

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

			clearCanvas(canvas, context);
			context.drawImage(uploadedImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);

			drawGuidelinesOnCanvas();
		}

		uploadedImage.src = imageData;
	};


	function bindGridSizeActions () {

		increaseGridButton.onclick = function () {

			var columns = grid.columns + 1,
				rows = grid.rows + 1;

			if (rows > gridOptions.maxRows) {
				rows = gridOptions.maxRows;
			}

			if (columns > gridOptions.maxColumns) {
				columns = gridOptions.maxColumns;
			}

			setGridSize({
				rows: rows, 
				columns: columns
			});
		};

		increaseGridRowsButton.onclick = function () {

			var rows = grid.rows + 1;
			if (rows <= gridOptions.maxRows) {
				setGridSize({
					rows: rows
				});
			}
		};

		decreaseGridRowsButton.onclick = function () {

			var rows = grid.rows - 1;
			if (rows >= gridOptions.minRows) {
				setGridSize({
					rows: rows
				});
			}
		};



		decreaseGridButton.onclick = function () {

			var columns = grid.columns - 1,
				rows = grid.rows - 1;

			if (rows < gridOptions.minRows) {
				rows = gridOptions.minRows;
			}

			if (columns < gridOptions.minColumns) {
				columns = gridOptions.minColumns;
			}

			setGridSize({
				rows: rows, 
				columns: columns
			});
		};


		increaseGridColumnsButton.onclick = function () {

			var columns = grid.columns + 1;
			if (columns <= gridOptions.maxColumns) {
				setGridSize({
					columns: columns
				});
			}
		};

		decreaseGridColumnsButton.onclick = function () {

			var columns = grid.columns - 1;
			if (columns >= gridOptions.minColumns) {
				setGridSize({
					columns: columns
				});
			}
		};
	};


	function bindCanvasHandlers () {

		bindGridSizeActions();

		createPuzzleButton.onclick = function () {
			initStepThree();
		};
	};


	function initStepTwo(imageData) {

		bindCanvasHandlers();

		updateGridText();
		updateCanvas();

		var stepTwoContainer = $('step-two-container');
		showContainer(stepTwoContainer);
	};


	/** Step three - actual puzzle **/
	function initCanvasForPieces () {

		var sourceCanvasWidth  = parseInt(canvas.width),
			sourceCanvasHeight = parseInt(canvas.height);

		var pieceWidth  = sourceCanvasWidth / grid.columns,
			pieceHeight = sourceCanvasHeight / grid.rows;

		canvasForPieces.width  = pieceWidth,
		canvasForPieces.height = pieceHeight;
	};

	function getPuzzlePartImage (rowIndex, columnIndex) {

		var context = canvasForPieces.getContext('2d'),
			canvasWidth = canvasForPieces.width,
			canvasHeight = canvasForPieces.height;

		clearCanvas(canvasForPieces, context);

		var srcX = columnIndex * canvasWidth,
			srcY = rowIndex * canvasHeight,
			srcW = canvasWidth,
			srcH = canvasHeight;

		var destX = 0,
			destY = 0,
			destW = canvasWidth,
			destH = canvasHeight;

		context.drawImage(uploadedImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
		return canvasForPieces.toDataURL();
	};

	function createPuzzleMatrix () {
		
		puzzle = [];

		var order = 0;
		
		var rowIndex = 0,
			totalRows = grid.rows,
			columnIndex = 0,
			totalColumns = grid.columns;

		for ( ; rowIndex < totalRows; rowIndex++) {

			puzzle[rowIndex] = [];

			for (columnIndex = 0; columnIndex < totalColumns; columnIndex++) {

				puzzle[rowIndex][columnIndex] = {
					order: order
				};

				order++;
			}
		}
	};

	function populatePuzzleMatrix () {

		var rowIndex = 0,
			totalRows = grid.rows,
			columnIndex = 0,
			totalColumns = grid.columns;

		for ( ; rowIndex < totalRows; rowIndex++) {

			for (columnIndex = 0; columnIndex < totalColumns; columnIndex++) {

				var puzzlePartImage = getPuzzlePartImage(rowIndex, columnIndex);
				puzzle[rowIndex][columnIndex].image = puzzlePartImage;
			}
		}	
	};


	function initStepThree () {

		createPuzzleMatrix();

		initCanvasForPieces();

		populatePuzzleMatrix();

		var stepThreeContainer = $('step-three-container');
		showContainer(stepThreeContainer);
	};



	// Ready, set, go!
	initFirstStep();

})();











          


          function createImageParts (imageData) {

            var canvas = document.createElement('canvas');

          }

          

          // read image

          // split image into equal parts inside the canvas

          // generate canvas images

          // place canvas images inside the puzzle


/*

          var container = document.getElementById('container');
            var mc = new Hammer(container);

            Hammer.defaults.domEvents = true;

            var width  = parseInt(container.clientWidth, 10),
                height = parseInt(container.clientHeight, 10),
                x = parseInt(container.offsetLeft, 10),
                y = parseInt(container.offsetTop, 10);

            mc.on("pan", function(ev) {

              if (ev.srcEvent.target.className.indexOf('corner') === -1) {

                container.style.left = x + ev.deltaX + 'px';
                container.style.top  = y + ev.deltaY + 'px';
              }
            });

            mc.on("panend", function(ev) {

                x = parseInt(container.offsetLeft, 10),
                y = parseInt(container.offsetTop, 10);
            });

            var corner = document.getElementById('corner');
            cornerMc = new Hammer(corner);

            cornerMc.on('pan', function (ev) {
                container.style.width  = width + ev.deltaX + 'px';
                container.style.height = height + ev.deltaY + 'px';
            });

            */