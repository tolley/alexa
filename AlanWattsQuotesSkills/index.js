'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'arn:aws:lambda:us-east-1:197050030901:function:alanWattsQuotes';
var SKILL_NAME = 'Alan Watts Quotes';

/**
 * Array containing quotes by Alan Watts
 */
var QUOTES = [
    // Watercourse way
    {
        source: "The Watercourse Way",
        quote: "Let us remind ourselves that Taoism is based on the recognition that the world as described is included in but is not the same as the world as it is. As a way of contemplation, it is being aware of life without thinking about it, and then carrying this on even while one is thinking, so that thoughts are not confused with nature. This sounds contradictory until one has experienced it."
    },
    {
        source: "The Watercourse Way",
        quote: "And those who seek to satisfy the mind of man by fussing with ceremonies and music and preaching charity and duty to one's neighbor, thereby destroy the intrinsic nature of things. Things which are curved require no arcs."
    },
    {
        source: "The Watercourse Way",
        quote: "Taoists contributed far more to Chinese science than the Confucians, for whereas the latter had their noses in books and were concerned with the following of rules, the former were observers of nature. Taoist literature abounds with comments on the behavior of animals, insects, reptiles, plants, wind, water, and the heavenly bodies, whereas Confucian literature is almost exclusively preoccupied with political and social relations....What is important for the mystic is not belief in the right doctrine, but attainment of the true experience."
    },
    {
        source: "The Watercourse Way",
        quote: "Taoism is not a philosophy of compelling oneself to be calm and dignified under all circumstances. The real and astonishing calm of people like Lao-Tzu comes from the fact that they are ready and willing, without shame, to do whatever comes naturally in all circumstances. The unbelievable result is that they are far more sociable and civilized than those who try to live rigorously and by laws and watchwords."
    },
    {
        source: "The Watercourse Way",
        quote: "Simply be aware of what actually is without giving it names and without judging it, for you are now feeling out reality itself instead of ideas and opinions about it."
    },
    {
        source: "The Watercourse Way",
        quote: "When no risk is taken there is no freedom."
    },
    {
        source: "The Watercourse Way",
        quote: "It is the great and imaginary terror of Western man that nothingness will be the permanent end of the universe. We do not easily grasp the point that the void is creative, and that being comes from nonbeing as sound from silence and light from space."
    },
    {
        source: "The Watercourse Way",
        quote: "The art of life is more like navigation than warfare, for what is important is to understand the winds, the tides, the currents, the seasons, and the principles of growth and decay, so that one's actions may use them and not fight them."
    },
    {
        source: "The Watercourse Way",
        quote: "As human beings have to make the gamble of trusting one another in order to have any kind of workable community we must also take the risk of trimming our sails to the winds of nature. For our 'selves' are inseparable from this kind of universe, and there is nowhere else to be."
    },
    {
        source: "The Watercourse Way",
        quote: "Confucians, along with Hebrew, Islamic, and Catholic scholastics, as well as Protestant fundamentalists, are like tourists who study guidebooks and maps instead of wandering freely and looking at the view. Speech and writing are undoubtedly marvelous, but for this very reason they have a hypnotic and fascinating quality which can lead to the neglect of nature itself until they become too much of a good thing."
    },
    {
        source: "The Watercourse Way",
        quote: "As Chuang-tzu says, \“It may be attained but not seen,\” or, in other words, felt but not conceived, intuited but not categorized, divined but not explained. In a similar way, air and water cannot be cut or clutched, and their flow ceases when they are enclosed. There is no way of putting a stream in a bucket or the wind in a bag. Verbal"
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Problems that remain persistently insoluble should always be suspected as questions asked in the wrong way."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "How is it possible that a being with such sensitive jewels as the eyes, such enchanted musical instruments as the ears, and such fabulous arabesque of nerves as the brain can experience itself anything less than a god."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Other people teach us who we are. Their attitudes to us are the mirror in which we learn to see ourselves, but the mirror is distorted. We are, perhaps, rather dimly aware of the immense power of our social enviornment."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "We seldom realize, for example, that our most private thoughts and emotions are not actually our own. For we think in terms of languages and images which we did not invent, but which were given to us by our society."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Irrevocable commitment to any religion is not only intellectual suicide; it is positive unfaith because it closes the mind to any new vision of the world. Faith is, above all, openness - an act of trust in the unknown."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Real travel requires a maximum of unscheduled wandering, for there is no other way of discovering surprises and marvels, which, as I see it, is the only good reason for not staying at home."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Just as true humor is laughter at oneself, true humanity is knowledge of oneself."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "For if you know what you want, and will be content with it, you can be trusted. But if you do not know, your desires are limitless and no one can tell how to deal with you. Nothing satisfies an individual incapable of enjoyment."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "We do not come into this world; we come out of it, as leaves from a tree."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Peace can be made only by those who are peaceful, and love can be shown only by those who love. No work of love will flourish out of guilt, fear, or hollowness of heart, just as no valid plans for the future can be made by those who have no capacity for living now."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Suppressing the fear of death makes it all the stronger. The point is only to know, beyond any shadow of doubt, that \"I\" and all other \"things\" now present will vanish, until this knowledge compels you to release them - to know it now as surely as if you had just fallen off the rim of the Grand Canyon."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Nothing fails like success, because the self-imposed task of our society and all its members is a contradiction: to force things to happen which are acceptable only when they happen without force."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Society is our extended mind and body."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Man aspires to govern nature, but the more one studies ecology, the more absurd it seems to speak of any one feature of an organism, or of an organism/environment field, as governing or ruling others."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Make a spurious division of one process into two, forget that you have done it, and then puzzle for centuries as to how the two get together."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "For unless one is able to live fully in the present, the future is a hoax. There is no point whatever in making plans for a future which you will never be able to enjoy. When your plans mature, you will still be living for some other future beyond. You will never, never be able to sit back with full contentment and say, “Now, I’ve arrived!” Your entire education has deprived you of this capacity because it was preparing you for the future, instead of showing you how to be alive now."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "But when you know for sure that your separate ego is a fiction, you actually feel yourself as the whole process and pattern of life. Experience and experiencer become one experiencing, known and knower one knowing."
    },
    {
        source: "The Book on the taboo against knowing who you are",
        quote: "Just as true humour is laughter at oneself. true humanity is knowledge of oneself."
    }
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
        var speechOutput = "From the book " + randomQuote.source + '. ' + randomQuote.quote;

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
