/*
* This module will manage all the events forwarded from
* the main handler index.js
* 
* Disclimer: This module is an adaptation, modularisation and documentation
* based on the material from Packt Book: Building Apps Using Amazon's Alexa and Lex
* Link: https://www.packtpub.com/application-development/building-apps-using-amazons-alexa-and-lex
*
* Developer: Francisco Perez, fcojperez@gmail.com
* Date: 19/03/2018
*/
var logging = require('./helppers/logging'); 
var stock = require('stockMngr');
var cllback = require('callbackMngr');

exports.onSessionStarted = (requestId) => {
 var msg = `'In function sessionMngr.onSessionStarted: 'requestId: ${requestId}`;
 logging.logConsole(msg);
}

exports.onSessionEnded = (requestId) => {
 var msg = `In function sessionMngr.onSessionEnded: requestId: ${requestId}`;
 logging.logConsole(msg);
}

exports.onIntent = (request, callback) => {
 const intentName = request.intent.name;
 var msg = `In function sessionMngr.onIntent: intentName: ${intentName}`;
 logging.logConsole(msg);
 
 	if (intentName === 'GetStockInfo'){
 	 logging.logConsole('GetStockInfo intent and callling stock.getStockInfo()');
		stock.getStockInfo(request, callback);
		
	} else if(intentName === "AMAZON.HelpIntent" ){
	 logging.logConsole('AMAZON.HelpIntent');
	 cllback.handleWelcomeResponse(callback);
	 
	} else if(intentName === "AMAZON.StopIntent" || intentName === "AMAZON.CancelIntent") {
	 logging.logConsole('AMAZON.StopIntent || AMAZON.CancelIntent');
  cllback.handleGoodByeResponse(callback);
  
	} else {
		throw new Error("Could not indentify intent: " + intentName);
	}
 
}

exports.onLaunch = (requestId,callback) => {
 var msg = `In function sessionMngr.onIntent: intentName: ${requestId}`;
 logging.logConsole(msg);
 cllback.handleWelcomeResponse(callback);
}