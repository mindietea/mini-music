function test() {
}

var sounds = [];

// Creating the sound

// Creates and adds the sound object to the array
// DONE
function createSound(soundID, filename, soundname) {

	var sound = new Audio();
	var source = document.createElement("source");
	source.type = "audio/mpeg";
	source.src = filename;
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
	filename = $('#fileInput')[0].files[0].name;
	soundname = $('#nameInput').val();
	createSound(soundID, filename, soundname);
}

/*function updateSoundList() {
	for(var i = 0; i < sounds.length; i++) {
		var soundElement = document.createElement("div");
		soundElement.innerHTML = "Test";
		$('#soundlist').appendChild(soundElement);
	}
}*/