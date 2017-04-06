'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'arn:aws:lambda:us-east-1:197050030901:function:SpiritualScientist';
var SKILL_NAME = 'The Spiritual Scientist';

/**
 * Array containing spiritual quotes from scientists
 */
var QUOTES = [
    {
        source: "Erwin Schrodinger",
        quote: "The task is not to see what has never been seen before, but to think what has never been thought before about what you see everyday."
    },
    {
        source: "Erwin Schrodinger",
        quote: "Consciousness is a singular for which there is no plural."
    },
    {
        source: "Erwin Schrodinger",
        quote: "If a man never contradicts himself, the reason must be that he virtually never says anything at all."
    },
    {
        source: "Erwin Schrodinger",
        quote: "The total number of minds in the universe is one."
    },
    {
        source: "Erwin Schrodinger",
        quote: "The multiplicity is only apparent. This is the doctrine of the Upanishads. And not of the Upanishads only. The mystical experience of the union with God regularly leads to this view, unless strong prejudices stand in the West."
    },
    {
        source: "Erwin Schrodinger",
        quote: "I am very astonished that the scientific picture of the real world around me is very deficient. It gives a lot of factual information, puts all our experiences in a magnificently consistent order, but is ghastly silent about all and sundry that is really near to our heart, that really matters to us. It cannot tell us a word about red and blue, bitter and sweet, physical pain and physical delight; it knows nothing of beautiful and ugly, good or bad, god and eternity."
    },
    {
        source: "Erwin Schrodinger",
        quote: "The present is the only things that has no end."
    },
    {
        source: "Erwin Schrodinger",
        quote: "We must not wait for things to come, believing that they are decided by irrescindable destiny. If we want it, we must do something about it."
    },
    {
        source: "Erwin Schrodinger",
        quote: "Every man's world picture is and always remains a construct of his mind and cannot be proved to have any other existence."
    },
    {
        source: "Erwin Schrodinger",
        quote: "Our perceiving self is nowhere to be found in the world-picture, because it itself is the world-picture."
    },
    {
        source: "Erwin Schrodinger",
        quote: "The world is given to me only once, not one existing and one perceived. Subject and object are only one."
    },
    {
        source: "Albert Einstein",
        quote: "My religion consists of a humble admiration of the illimitable superior spirit who reveals himself in the slight details we are able to perceive with our frail and feeble mind."
    },
    {
        source: "Albert Einstein",
        quote: "Every one who is seriously involved in the pursuit of science becomes convinced that a spirit is manifest in the laws of the Universe-a spirit vastly superior to that of man, and one in the face of which we with our modest powers must feel humble."
    },
    {
        source: "Albert Einstein",
        quote: "The intuitive mind is a sacred gift and the rational mind is a faithful servant. We have created a society that honors the servant and has forgotten the gift."
    },
    {
        source: "Albert Einstein",
        quote: "The most beautiful thing we can experience is the mysterious; It is the source of all true art and science."
    },
    {
        source: "Albert Einstein",
        quote: "We should take care not to make the intellect our god; it has, of course, powerful muscles, but no personality."
    },
    {
        source: "Albert Einstein",
        quote: "Whoever undertakes to set himself up as a judge of Truth and Knowledge is shipwrecked by the laughter of the Gods."
    },
    {
        source: "Albert Einstein",
        quote: "The man who regards his own life and that of his fellow creatures as meaningless is not merely unfortunate but almost disqualified for life."
    },
    {
        source: "Albert Einstein",
        quote: "The real problem is in the hearts and minds of men. It is easier to denature plutonium than to denature the evil spirit of man."
    },
    {
        source: "Albert Einstein",
        quote: "True religion is real living; living with all one’s soul, with all one’s goodness and righteousness."
    },
    {
        source: "Albert Einstein",
        quote: "What I see in Nature is a magnificent structure that we can comprehend only very imperfectly, and that must fill a thinking person with a feeling of humility. This is a genuinely religious feeling that has nothing to do with mysticism."
    },

    {
        source: "Carl Sagan",
        quote: "Somewhere, something incredible is waiting to be known."
    },
    {
        source: "Carl Sagan",
        quote: "Every one of us is, in the cosmic perspective, precious. If a human disagrees with you, let him live. In a hundred billion galaxies, you will not find another."
    },
    {
        source: "Carl Sagan",
        quote: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff."
    },
    {
        source: "Carl Sagan",
        quote: "Science is not only compatible with spirituality; it is a profound source of spirituality."
    },
    {
        source: "Carl Sagan",
        quote: "If you wish to make an apple pie from scratch, you must first invent the universe."
    },
    {
        source: "Carl Sagan",
        quote: "For me, it is far better to grasp the Universe as it really is than to persist in delusion, however satisfying and reassuring."
    },
    {
        source: "Carl Sagan",
        quote: "For small creatures such as we the vastness is bearable only through love."
    },
    {
        source: "Carl Sagan",
        quote: "Imagination will often carry us to worlds that never were, but without it we go nowhere."
    },
    {
        source: "Carl Sagan",
        quote: "The universe is a pretty big place. If it's just us, seems like an awful waste of space."
    },
    {
        source: "Carl Sagan",
        quote: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
    },
    {
        source: "Werner Heisenberg",
        quote: "Not only is the Universe stranger than we think, it is stranger than we can think."
    },
    {
        source: "Werner Heisenberg",
        quote: "The first gulp from the glass of natural sciences will turn you into an atheist, but at the bottom of the glass God is waiting for you."
    },
    {
        source: "Werner Heisenberg",
        quote: "The reality we can put into words is never reality itself."
    },
    {
        source: "Werner Heisenberg",
        quote: "Whenever we proceed from the known into the unknown we may hope to understand, but we may have to learn at the same time a new meaning of the word 'understanding’."
    },
    {
        source: "Werner Heisenberg",
        quote: "Quantum theory provides us with a striking illustration of the fact that we can fully understand a connection though we can only speak of it in images and parables."
    },
    {
        source: "Werner Heisenberg",
        quote: "The atoms or elementary particles themselves are not real; they form a world of potentialities or possibilities rather than one of things or facts."
    },
    {
        source: "Werner Heisenberg",
        quote: "Whether we like it or not, modern ways are going to alter and in part destroy traditional customs and values."
    },
    {
        source: "Werner Heisenberg",
        quote: "In classical physics, science started from the belief – or should one say, from the illusion – that we could describe the world, or least parts of the world, without any reference to ourselves."
    },
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
        var speechOutput = randomQuote.source + ' said, ' + randomQuote.quote;

        this.emit( ':tellWithCard', speechOutput, SKILL_NAME, speechOutput );
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say ask spiritual scientist for a quote, or, you can say exit... What can I help you with?";
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
