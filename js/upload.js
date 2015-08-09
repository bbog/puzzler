


function errorHandler (ev) {

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

    reader.onerror = errorHandler;
    
    //reader.onprogress = updateProgress;
    
    reader.onabort = function(e) {
    	alert('File read cancelled');
    };

    reader.onloadstart = function(e) {
    
    };

    reader.onload = function(e) {

    	var imgData = reader.result;
    	initStepTwo(imgData);
    }

    // Read in the image file as a binary string.
    reader.readAsDataURL(ev.target.files[0])

}


function bindUploadHandlers (uploadButton, uploadFile) {

	// styling for the upload button
	uploadButton.onchange = function () {
		uploadFile.value = this.value;
	};


	uploadButton.addEventListener('change', handleFileSelect, false);
}


function initFirstStep () {

	var uploadButton = document.getElementById("upload-button"),
		uploadFile   = document.getElementById("upload-file");

	bindUploadHandlers(uploadButton, uploadFile);
}