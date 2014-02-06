/*
 * Orihime v0.0
 * A Web-based demo system
 *
 * by stage7 of Genshiken
 *
 * This software is released under Yet-To-Be-Decided License.
 */

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	//function loadOrihimePictureFile(file){
		var reader = new FileReader();

		reader.onload = function(e) {
			var rawData = reader.result;
		}

		reader.readAsBinaryString("./equipos.txt");
		reader.onloadend = function(e){
			console.log(e);
			if (e.target.readyState == FileReader.DONE) {
				console.log(e.target.result);
			}
		}
	//}
} else {
	alert('The File APIs are not fully supported in this browser.');
}