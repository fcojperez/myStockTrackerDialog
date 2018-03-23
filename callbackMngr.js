/*
* Module for handling Amazon Alexa Callback
* 
* Disclimer: This module is an adaptation, modularisation and documentation
* based on the material from Packt Book: Building Apps Using Amazon's Alexa and Lex
* Link: https://www.packtpub.com/application-development/building-apps-using-amazons-alexa-and-lex
*
* Developer: Francisco Perez, fcojperez@gmail.com
* Date: 19/03/2018
*/

var logging = require('./helppers/logging'); 
var speech = require('./helppers/speech'); 


exports.handleWelcomeResponse = (callback) => {
	logging.logConsole('In function callbackMngr.handleWelcomeResponse:');
	
	const title = "Welcome";
	const speechOutput = "What stock whould you like information on?" + " " + 
						"I have information on Apple, Google, VMWare, IBM and Amazon";

	const repromptText = "I'm sorry I didn't get you. " + speechOutput;

	const speechletResponse = speech.buildSpeechletResponse(title, speechOutput, repromptText, false);
	const sessionAttributes = {};

	callback(null, speech.generateResponse( speechletResponse, sessionAttributes));
}

exports.handleGoodByeResponse = (callback) => {
	logging.logConsole('In function callbackMngr.handleGoodByeResponse:');
	
	const title = "Goodbye";
	const speechOutput = "Thank you for trying My Personal Stock Tracker Dialog. Have a nice day!";

	const speechletResponse = speech.buildSpeechletResponse(title, speechOutput, null, true);
	const sessionAttributes = {};

	callback(null, speech.generateResponse( speechletResponse, sessionAttributes));
}