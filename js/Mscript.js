function test() {
	/*var str = "c";
	var charCode = str.charCodeAt(0);
	var charID = charCode - 97;
	alert(charCode + ", Letter ID: " + charID);*/

	/*var soundClass = $('#setter0').attr('class');
	alert(soundClass);*/

}

// TODO Gray out all but the clicked key when clicked
// Cancel the startMapKey if click anywhere but a sound button

var sounds = [];
var keymap = new Array(26);

var mappedSound = null;
// Creating the sound

// Creates and adds the sound object to the array
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

	// Clear form
	document.getElementById('fileInput').value = "";
	document.getElementById('nameInput').value = "";
}

function fullUpdateSoundList() {
	$('#soundlist').empty();
	for(var i = 0; i < sounds.length; i++) {
		var soundElement = document.createElement("span");
		var displayIndex = i + 1;
		soundElement.innerHTML = "<br>" + displayIndex + ". " + sounds[i].name;
		var soundID = "sound" + i;
		soundElement.id = soundID;

		var setButton = document.createElement("button");
		setButton.innerHTML = "select";
		setButton.className = "soundsetter";
		setButton.style.visibility = "hidden";
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
		$(item).attr('onclick','mapKey(' + letter_code + ', this.id);');
		this.style.visibility = "visible";
	});

	// Turn off clicking all keys, highlight sounds until a setButton is clicked
}

// letter_idx is 0 to 25
// buttonID is setter
function mapKey(letter_idx, buttonID) {

	// Re-hides the setting buttons
	$('.soundsetter').each(function(i,item) {
		this.style.visibility = "hidden";
	});


	var soundID = buttonID.replace('setter', '');
	keymap[letter_idx] = soundID;

	// Adds sound to tooltip
	var char = String.fromCharCode(letter_idx + 97);
	$('#' + char).attr('data-tooltip', sounds[soundID].name);
}

/*----------------------------------------------*/

function music() {

	createSound(0, "pop/VivaLaVida.wav", "Viva la Vida");
	mapKey(16, "setter0");

	createSound(1, "pop/popculturebeat.wav", "introbeat");
	mapKey(0, "setter1");

	createSound(2, "pop/Ho.wav", "Oh!");
	mapKey(15, "setter2");



	fullUpdateSoundList();
}
