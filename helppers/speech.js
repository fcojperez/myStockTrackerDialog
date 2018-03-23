/*
* Module for handling the speach building process
* 
* Disclimer: This module is an adaptation, modularisation and documentation
* based on the material from Packt Book: Building Apps Using Amazon's Alexa and Lex
* Link: https://www.packtpub.com/application-development/building-apps-using-amazons-alexa-and-lex
*
* Developer: Francisco Perez, fcojperez@gmail.com
* Date: 19/03/2018
*/

exports.buildSpeechletResponse = (title, outputText, repromptText, shouldEndSession) => {
	
	return{
		outputSpeech:{
			type: "PlainText",
			text: outputText
		},
		card: {
			type: "Simple",
			title: title,
			content: outputText
		},
		reprompt: {
			outputSpeech : {
				type: "PlainText",
				text: repromptText
			}
		},
		shouldEndSession: shouldEndSession
	};
}

exports.generateResponse = (speechletResponse, sessionAttributes) => {
	
	return{
		version: "1.0",
		sessionAttributes: sessionAttributes,
		response: speechletResponse
	};
}

exports.buildSpeechletResponseSSML = (title, outputText, repromptText, shouldEndSession) => {
	
	return{
		outputSpeech:{
			type: "SSML",
			ssml: outputText
		},
		card: {
			type: "Simple",
			title: title,
			content: outputText
		},
		reprompt: {
			outputSpeech : {
				type: "SSML",
				ssml: repromptText
			}
		},
		shouldEndSession: shouldEndSession
	};
}