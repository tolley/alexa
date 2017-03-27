'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'arn:aws:lambda:us-east-1:197050030901:function:alanWattsQuotes';
var SKILL_NAME = 'Alan Watts Quotes';

/**
 * Array containing quotes by Alan Watts
 */
var QUOTES = [
    "Quotes coming soon!!!"
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    callback();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetQuote');
    },
    'GetQuoteIntent': function () {
        this.emit('GetQuote');
    },
    'GetQuote': function () {
        // Get a random space fact from the space facts list
        var quoteIndex = Math.floor(Math.random() * QUOTES.length);
        var randomQuote = QUOTES[quoteIndex];

        // Create speech output
        var speechOutput = "Here is your quote: " + randomQuote;

        this.emit( ':tellWithCard', speechOutput, SKILL_NAME, randomQuote );
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say give me a quote by Alan Watts, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
