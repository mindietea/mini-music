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
function playSound(soundID, letterCode) {
	sounds[soundID].audio.load();
	sounds[soundID].audio.play();

	sounds[soundID].audio.onended = function() {
				var char = String.fromCharCode(letterCode + 97);
    $('#' + char).css('background-color','#0ad6ff')
};
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
	if(0 <= letterCode && letterCode < 26) {
		if(typeof keymap[letterCode] !== 'undefined') {
			console.log(letterCode + " playing sound " + keymap[letterCode]);
			playSound(keymap[letterCode], letterCode);

			// Changes key color until sound is over
			var char = String.fromCharCode(letterCode + 97);
			$('#' + char).css('background-color', '#ff5ecc');
			var soundTime = sounds[keymap[letterCode]].audio.duration * 1000;

			/*setTimeout(function() {
    $('#' + char).css('background-color','#0ad6ff');
},soundTime);*/

		}
	}
}

function startMapKey(letter) {

	// Fade other buttons
	$('.key').each(function() {
		if(this.id != letter) {
			$(this).fadeTo(0.5, 0.5);
	}
	});


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

	// Visible other buttons
	$('.key').each(function() {
		
			$(this).fadeTo(0.5, 1);
	
	});

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

	createSound(1, "pop/popbeat.wav", "introbeat");
	mapKey(22, "setter1");

	createSound(2, "pop/Ho.wav", "Oh!");
	mapKey(15, "setter2");


	fullUpdateSoundList();
}
