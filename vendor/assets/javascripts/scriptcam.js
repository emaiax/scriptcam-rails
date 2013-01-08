//   _____           _       _   _____                 
//  /  ___|         (_)     | | /  __ \                
//  \ `--.  ___ _ __ _ _ __ | |_| /  \/ __ _ _ __ ___  
//   `--. \/ __| '__| | '_ \| __| |    / _` | '_ ` _ \ 
//  /\__/ / (__| |  | | |_) | |_| \__/\ (_| | | | | | |
//  \____/ \___|_|  |_| .__/ \__|\____/\__,_|_| |_| |_|
//                  | |                              
//  Version 1.1.7   |_| (c) Tele-Line Videotex Services

// Use jscompress.com to compress this file

;(function($) {
	$.fn.scriptcam=function(options) {
		// merge passed options with default values
		var opts=$.extend({}, $.fn.scriptcam.defaults, options);
		// off we go
		return this.each(function() {
			// add flash to div
			opts.id=this.id; // add id of plugin to the options structure
			data=opts; // pass options to jquery internal data field to make them available to the outside world
			$('#'+opts.id).html(opts.noFlashFound); // inject no flash found message
			// forward incoming flash movie calls to outgoing functions
			$.scriptcam.SC_promptWillShow=data.promptWillShow;
			$.scriptcam.SC_onMotion=data.onMotion;
			$.scriptcam.SC_onError=data.onError;
			$.scriptcam.SC_onWebcamReady=data.onWebcamReady;
			$.scriptcam.SC_connected=data.connected;
			$.scriptcam.SC_onPictureAsBase64=data.onPictureAsBase64;
			$.scriptcam.SC_disconnected=data.disconnected;
			$.scriptcam.SC_setVolume=data.setVolume;
			$.scriptcam.SC_timeLeft=data.timeLeft;
			$.scriptcam.SC_addChatText=function(value) {
				value = value.replace(":{", '<img src="'+data.path+'angry.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":-{", '<img src="'+data.path+'angry.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":)", '<img src="'+data.path+'smile.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":-)", '<img src="'+data.path+'smile.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":D", '<img src="'+data.path+'biggrin.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":-D", '<img src="'+data.path+'biggrin.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":O", '<img src="'+data.path+'ohmy.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":-O", '<img src="'+data.path+'ohmy.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":(", '<img src="'+data.path+'sad.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":-(", '<img src="'+data.path+'sad.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":p", '<img src="'+data.path+'tongue.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(":-p", '<img src="'+data.path+'tongue.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(";)", '<img src="'+data.path+'wink.gif" width="16" height="16" class="smiley"/>');
				value = value.replace(";-)", '<img src="'+data.path+'wink.gif" width="16" height="16" class="smiley"/>');
				$('#'+data.chatWindow).append(value+'<br/>');
				$('#'+data.chatWindow).animate({ scrollTop: $('#'+data.chatWindow).prop("scrollHeight") - $('#'+data.chatWindow).height() }, 100);
			}
			var newWidth=opts.width;
			if (opts.chatRoom) {
				newWidth=(newWidth*2)+5; // make room for two video windows with a margin of 5 when chatting
			}
			if (opts.chatRoom || opts.fileName || opts.daeFilename) {
				// use GPU acceleration when recording, chatting or AR
				var params = {
					menu: 'false',
					wmode: 'direct'
				};
			}
			else {
				// enable HTML overlay when in snapshot mode
				var params = {
					menu: 'false',
					wmode: 'transparent'
				};
			}
			// Escape all values contained in the flashVars (IE needs this)
			for (var key in opts) {
				opts[key] = encodeURIComponent(opts[key]);
			};
			swfobject.embedSWF('/assets/scriptcam.swf', opts.id, newWidth, opts.height, '11.4', false, opts, params);
		});
	};
	
	$.scriptcam={};
	
	// outgoing functions (calling the flash movie)
	
	$.scriptcam.getFrameAsBase64=function() {
        return $('#'+data.id).get(0).SC_getFrameAsBase64();
	}

	$.scriptcam.version=function() {
		return $('#'+data.id).get(0).SC_version();
	}

	$.scriptcam.getMotionParameters=function() {
		$('#'+data.id).get(0).SC_getMotionParameters();
	}

	$.scriptcam.getBarCode=function() {
		return $('#'+data.id).get(0).SC_getBarCode();
	}
	
	$.scriptcam.startRecording=function() {
		$('#'+data.id).get(0).SC_startRecording();
	}
	
	$.scriptcam.closeCamera=function() {
		$('#'+data.id).get(0).SC_closeCamera();
	}
	
	$.scriptcam.changeVolume=function(value) {
		$('#'+data.id).get(0).SC_changeVolume(value);
	}

	$.scriptcam.sendMessage=function(value) {
		$('#'+data.id).get(0).SC_sendMessage(value);
	}

	$.scriptcam.changeCamera=function(value) {
		$('#'+data.id).get(0).SC_changeCamera(value);
	}

	$.scriptcam.changeMicrophone=function(value) {
		$('#'+data.id).get(0).SC_changeMicrophone(value);
	}
	
	// set javascript default values (flash default values are managed in the swf file)
	$.fn.scriptcam.defaults={
		width:320,
		height:240,
		chatWindow:'chatWindow',
		path:'',
		noFlashFound:'<p>You need <a href="http://www.adobe.com/go/getflashplayer">Adobe Flash Player 11.4</a> to use this software. Please click on the link to download the installer.</p>'
	};
})(jQuery);

// incoming functions (calls coming from flash) - must be public and forward calls to the scriptcam plugin

function SC_onError(errorId,errorMsg) {
	$.scriptcam.SC_onError(errorId,errorMsg);
}

function SC_onMotion(decodedString) {
	$.scriptcam.SC_onMotion(decodedString);
}

function SC_promptWillShow() {
	$.scriptcam.SC_promptWillShow();
}

function SC_onWebcamReady(cameraNames,camera,microphoneNames,microphone) {
	$.scriptcam.SC_onWebcamReady(cameraNames,camera,microphoneNames,microphone);
}

function SC_onPictureAsBase64(value) {
	$.scriptcam.SC_onPictureAsBase64(value);
}

function SC_connected() {
	$.scriptcam.SC_connected();
}

function SC_disconnected() {
	$.scriptcam.SC_disconnected();
}

function SC_setVolume(value) {
	$.scriptcam.SC_setVolume(value);
}

function SC_onMotion(motion,brightness,color,facearea) {
	$.scriptcam.SC_onMotion(motion,brightness,color,facearea);
}

function SC_timeLeft(value) {
	$.scriptcam.SC_timeLeft(value);
}

function SC_addChatText(value) {
	$.scriptcam.SC_addChatText(value);
}
