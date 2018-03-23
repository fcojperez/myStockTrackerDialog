/*
* Module for handling Amazon Alexa interaction model
* 
* Disclimer: This module is an adaptation, modularisation and documentation
* based on the material from Packt Book: Building Apps Using Amazon's Alexa and Lex
* Link: https://www.packtpub.com/application-development/building-apps-using-amazons-alexa-and-lex
*
* Developer: Francisco Perez, fcojperez@gmail.com
* Date: 19/03/2018
*/

var session = require('sessionMngr');
var logging = require('./helppers/logging'); 


/*
* Main handler event for maneging the events below:
* - new Session
* - Launch Request
* - Intent Request
* - End Session
*/
exports.handler = (event, context, callback) => {
	try{
		
		const requestId = event.request.requestId;
		
		if(event.session.new){
			logging.logConsole("NEW SESSION");
			session.onSessionStarted(requestId);
		}

		switch(event.request.type){
			case "LaunchRequest":
				logging.logConsole("LAUNCH REQUEST");
				session.onLaunch(requestId,callback);
				break;
				
			case "IntentRequest":
				logging.logConsole("INTENET REQUEST");
				session.onIntent(event.request, callback);
				break;
				
			case "SessionEndedRequest":
				logging.logConsole("SESSION END REQUEST");
				session.onSessionEnded(requestId);
				break;
				
			default:
				logging.logConsole("INVALID REQUEST TYPE: " + event.request.type);
				context.fail("INVALID REQUEST TYPE: " + event.request.type);
				break;
		}
	}catch(error){
		context.fail("Exception: " + error);
	}
};