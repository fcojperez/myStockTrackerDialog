/*
* Module for handling the communication to the Web Service
* 
* Disclimer: This module is an adaptation, modularisation and documentation
* based on the material from Packt Book: Building Apps Using Amazon's Alexa and Lex
* Link: https://www.packtpub.com/application-development/building-apps-using-amazons-alexa-and-lex
*
* Developer: Francisco Perez, fcojperez@gmail.com
* Date: 19/03/2018
*/


var https = require('https');
var speech = require('helppers/speech');
var logging = require('./helppers/logging'); 

exports.getStockInfo = (request, callback) =>{
	var msg = `In function stockMngr.getStockInfo`;
 logging.logConsole(msg);

	//Checking all Slots are filled
	fillSlots(request, callback);

	var slots = request.intent.slots;

	var stockName = slots.StockName.value;
	var stockDate = slots.StockDate.value;
	var priceType = slots.PriceType.value;

	logging.logConsole(`All slots filled: StockName: ${stockName}, StockDate: ${stockDate} and PriceType: ${priceType}`);

	getStockPrice(stockName, stockDate, priceType, callback);
}

function fillSlots(request, callback){
	var msg = `In function stockMngr.fillSlots`;
 logging.logConsole(msg);

	//Recording the dialog state if it is started, missed slots, etc.
	logging.logConsole('Dialog state: ' + request.dialogState);
	logging.logConsole('Intent: ' + request.intent);


	if(request.dialogState !== "COMPLETED"){
		logging.logConsole('Dialog.Delgate directive to prompt for mor information');

		const speechletResponse = {
			outputSpeech: null,
			card: null,
			reprompt: null,
			shouldEndSession: false,
			directives: [{
				type: "Dialog.Delegate"
			}]
		};

		callback(null, speech.generateResponse(speechletResponse, {}));
	}
}

function getStockPrice(stockName, stockDate, priceType, callback){
var msg = `In function stockMngr.getStockPrice`;
 logging.logConsole(msg);
	

	msg = `All slots filled: StockName: ${stockName}, StockDate: ${stockDate} and PriceType: ${priceType}`;
	logging.logConsole(msg);

    var stockMap = {
    	"apple": "AAPL",
    	"vmware": "VMW",
    	"ibm": "IBM",
    	"google": "GOOG",
    	"amazon": "AMZN"
    };

    var priceMap = {
    	"opening": "open_price",
    	"closing": "close_price",
    	"maximum": "high_price",
    	"high": "high_price",
    	"low": "low_price",
    	"minimum": "low_price"
    };

	var stockTicker = stockMap[stockName.toLowerCase()];
	var priceTicker = priceMap[priceType.toLowerCase()];
	
	var hPrice = 0;

	
	logging.logConsole(`Values mapped for stockTicker ${stockTicker} and priceTicker ${priceTicker}`);

	var pathString = "/historical_data?ticker=" + stockTicker +
		"&item=" + priceTicker + 
		"&start_date=" + stockDate +
		"&end_date=" + stockDate;

	logging.logConsole('Path string: ' + pathString);
	
	var username = "64f628fe9b7cb7142daa9d65696f9aae";
	var password = "d7a40020fbdb9694ba8e05ee1e20e676";

	var auth = "Basic " + new Buffer(username + ":" + password).toString('base64');
	
	
	
	
		var request = https.get({
		host: "api.intrinio.com",
		port: 443,
		path: pathString,
		headers: {
			"Authorization": auth
		}
	}, function(response) {
		var json = "";
		response.on('data', function(chunk) {
		    logging.logConsole("Received json response: " + chunk);
			json += chunk;
		});
		response.on('end', function() {
			var jsonData = JSON.parse(json);
			var stockPrice = jsonData.data[0].value;
	
			
				
				const title = "Stock Price";
				var speechletResponse = null;
				var speechOutput = "";
					logging.logConsole("Processing response in plain text");
					//speechOutput = stockName + " " + priceType + " price was at " + stockPrice + " for " + stockDate;
					

						speechOutput = `${stockName} ${priceType} price was at ${stockPrice} for ${stockDate}`;
						logging.logConsole(speechOutput);
						speechletResponse = speech.buildSpeechletResponse(title, speechOutput, null, true);
					 


					
				callback(null, speech.generateResponse(speechletResponse, {}));
			
			
		});
	});
	
}