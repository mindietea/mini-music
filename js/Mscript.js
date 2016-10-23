function test() {
	/*var str = "c";
	var charCode = str.charCodeAt(0);
	var charID = charCode - 97;
	alert(charCode + ", Letter ID: " + charID);*/

	/*var soundClass = $('#setter0').attr('class');
	alert(soundClass);*/

}


var sounds = [];
var keymap = new Array(26);

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

// Plays a sound based on index. If it's already playing, pauses it and plays it.
function playSound(soundID) {
	sounds[soundID].audio.load();
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
		var soundID = "sound" + i;
		soundElement.id = soundID;

		var setButton = document.createElement("button");
		setButton.className = "soundsetter";
		var setID = "setter" + i;
		setButton.id = setID;


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
	letterCode = e.keyCode - 97;
	//console.log("keycode " + e.keyCode);
	if(0 <= letterCode && letterCode < 26) {
		if(typeof keymap[letterCode] !== 'undefined') {
			console.log(letterCode + " playing sound " + keymap[letterCode]);
			playSound(keymap[letterCode]);
		}
	}
	if(e.keyCode == "13") {
		playSound(0);
	}
}

function startMapKey(letter) {
	console.log("Starting mapping key");
	// Changes all the "setButtons" for each sound to a function that "setsQSound" to its index
	letter_code = letter.charCodeAt(0) - 97;
	//sconsole.log(letter.charCodeAt(0));
	$('.soundsetter').each(function(i,item) {
		var charCode = letter.charCodeAt(0);
		//console.log("This ID: " + this.id);
		$(item).attr('onclick','mapKey('+letter_code+', this.id);');
	});

	// Turn off clicking all keys, highlight sounds until a setButton is clicked
}

// TODO make it take in this id#
function mapKey(letter_idx, buttonID) {
	//console.log("This 2 ID: " + buttonID);
	var soundID = buttonID.replace('setter', '');
	keymap[letter_idx] = soundID;
	//console.log("Mapping key " + soundID);
}