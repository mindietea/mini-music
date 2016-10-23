function test() {
	alert();
}


var sounds = [];
var mappedSound = null;
// Creating the sound

// Creates and adds the sound object to the array
// DONE
function createSound(soundID, file, soundname) {

	var sound = new Audio();
	var source = document.createElement("source");
	source.type = "audio/mpeg";
	source.src = file;
	sound.appendChild(source);


	var soundObject = {index: soundID, name: soundname, audio: sound};
	sounds[soundID] = soundObject;
}

// Plays a sound based on index
// DONE
function playSound(soundID) {
	// TODO replace after implementing sound creation
	sounds[soundID].audio.play();
}

/*--------------------------------------------------*/
// Uploading a sound

function addSound() {
	soundID = sounds.length;

	// TODO Make this work for file uploads
	//filename = $('#fileInput').val();

	var filename = document.getElementById('fileInput');
	var file = URL.createObjectURL(filename.files[0]);

	soundname = $('#nameInput').val();
	// TODO set default string if soundname is empty

	createSound(soundID, file, soundname);
	fullUpdateSoundList();
}

function fullUpdateSoundList() {
	$('#soundlist').empty();
	for(var i = 0; i < sounds.length; i++) {
		var soundElement = document.createElement("div");
		soundElement.innerHTML = sounds[i].name;

		var setButton = document.createElement("button");
		setButton.onclick = function() {
			setKeySound(i);
		}

		$('#soundlist').append(soundElement);
		$('#soundlist').append(setButton);
	}
}

function setKeySound(index) {
	mappedSound = sounds[index];
}

/*------------------*/
// Pressing keys to play sound

window.addEventListener("keypress", checkKey, false);

function checkKey(e) {
	if(e.keyCode == "13") {
		playSound(0);
	}
}

function mapKey(letter) {
	// Changes all the "setButtons" for each sound to a function that "setsQSound" to its index
	
}


