'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'arn:aws:lambda:us-east-1:197050030901:function:alanWattsQuotes';
var SKILL_NAME = 'Alan Watts Quotes';

/**
 * Array containing quotes by Alan Watts
 */
var QUOTES = [
    "This is the real secret of life—to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play.",
    "The actual trouble is that profit is identified entirely with money, as distinct from the real profit of living with dignity and elegance in beautiful surroundings.",
    "Before you were born there was this same nothing-at-all-forever. And yet you happened. And if you happened once, you can happen again.",
    "Everybody is you’. Everybody is I’. That’s our name. We all share that.",
    "For eternally and always there is only now, one and the same now; the present is the only thing that has no end",
    "In nature the skin is as much a joiner as a divider, being, as it were the bridge whereby the inner organs have contact with air, warmth, and light.",
    "I do not even style myself a Zen Buddhist. For the aspect of Zen in which I am personally interested is nothing that can be organized, taught, transmitted, certified, or wrapped up in any kind of system. It can’t even be followed, for everyone has to find it for himself.",
    "There is no such thing as a single, solitary event. The only possible single event is all events whatsoever. That could be regarded as the only possible atom; the only possible single thing is everything.",
    "People who exude love are apt to give things away. They are in everyz0auawQq way like rivers; they stream. And so when they collect possessions, and things they like, they are apt to give them to other people. Because, have you ever noticed that when you start giving things away, you keep getting more?",
    "It’s one of the great wonders of life: What will it be like to go to sleep and never wake up? And if you think long enough about that, something will happen to you. You will find out, among other things, that it will pose the next question to you: What was it like to wake up after never having gone to sleep? That was when you were born. You see, you can’t have an experience of nothing. Nature abhors a vacuum.",
    "We need to recognize the physical reality of relationship between organisms as having as much substance’ as the organisms themselves, if not more.",
    "In the more intimate sphere of personal life, the problem is the pain of trying to avoid suffering and the fear of trying not to be afraid.",
    "We love to see a child lost in the dance and not performing for an audience. To be happy and know that you are happy is really the overflowing cup of life. To dance as if there was no audience.",
    "Only those who have cultivated the art of living completely in the present have any use for making plans for the future, for when the plans mature they will be able to enjoy the results.",
    "Your soul is not in your body; your body is in your soul.",
    "Tomorrow never comes.",
    "A buddha would see you all as being exactly right; just where you are, all of you are buddhas. Even for those of you who do not know it, it is right for you not to know it at this moment.",
    "Reality itself is gorgeous. It is the plenum; the fullness of total joy.",
    "When you know that this moment is the Tao, and this moment is considered by itself without past and without future—eternal, neither coming into being nor going out of being—there is nirvana.",
    "ecause we cannot relate to the sensuous and material present we are most happy when good things are expected to happen, not when they are happening.",
    "There are, then, two ways of understanding an experience. The first is to compare it with the memories of other experiences, and so to name and define it. This is to interpret it in accordance with the dead and the past. The second is to be aware of it as it is, as when, in the intensity of joy, we forget past and future, let the present be all, and then do not even stop to think I am happy.",
    "There is no such thing as the truth’ that can be stated. In other words, ask the question: What is the true position of the stars in the Big Dipper?’ Well it depends on where you’re looking at them from.",
    "The hills are moving into their stillness. They mean something because they are being transformed into my brain, and my brain is an organ of meaning.",
    "Consciousness is radar that is scanning the environment to look out for trouble, in the same way that a ship’s radar is looking for rocks or other ships. The radar does not notice the vast amount of space where there are no rocks and other ships. By and large we scan things over but we pay attention only to what our set of values tells us we should pay attention to.",
    "Not picking and choosing doesn’t mean that you have to cultivate being detached. You can try that, sure. But then you find you’re terribly attached to your non-attachment. Like you’re proud of your humility",
    "For when we stand with our nature, seeing that there is nowhere to stand against it, we are at last able to move unmoved.",
    "You hear the sound of water And that’s quite as important as anything I’ve got to say.",
    "Money is an abstraction. It cannot, of itself, buy any pleasureAlan Watts Boatwhatsoever. Because all pleasures involve skill and love.",
    "I am looking at the world, not confronting it; I am knowing it by a continuous process of transforming it into myself, so that everything around me, the whole globe of space, no longer feels away from me but in the middle.",
    "Light is a relationship between electrical energy and eyeballs. It is you, in other words, who evoke the world and you evoke the world in accordance with what kind of a you’ you are.",
    "Thoughts, ideas, and words are coins for real things. They are not those things, and though they represent them, there are many ways in which they do not correspond at all. As with money and wealth, so with thoughts and things; ideas and words are more or less fixed, whereas real things change",
    "The more complete kind of mind, which can feel as well as think, remains to indulge’ the odd sense of mystery which comes from contemplating the fact that everything is at base something which cannot be known.",
    "Transiency is a mark of spirituality. A lot of people think the opposite that the spiritual things are the everlasting things. But, you see, the more a things tends to be permanent, the more it tends to be lifeless.",
    "We’ve run into a cultural situation where we’ve confused the symbol with the physical reality; the money with the wealth; and the menu with the dinner. And we’re starving on eating menus.",
    "The ego is a kind of flip, a knowing of knowing, a fearing of fearing. It’s a curlicue, an extra jazz to experience, a sort of double-take or reverberation, a dithering of consciousness which is the same as anxiety.",
    "You might imagine there being a space without any solid in it, but you will never, never encounter one, because you will be there in the form of a solid to find out about it.",
    "You are in relationships with the external world that are, on the whole, incredibly harmonious. But we have this rather myopic way of looking at things. And we screen out from attention anything that is not immediately important to a scanning system based on sensing danger.",
    "When you look out of your eyes, at nature happening out there, you’re looking at you. That’s the real you. The you that goes on of itself",
    "What you are in your in-most being escapes your examination in rather the same way that you can’t look directly into your own eyes without using a mirror, you can’t bite your own teeth, you can’t taste your own tongue, and you can’t touch the tip of this finger with the tip of this finger.",
    "Is it possible that myself, my existence, so contains being and nothing that death is merely the off’ interval in an on/off pulsation which must be eternal—because every alternative to this pulsation (e.g., its absence) would in due course imply its presence?",
    "Faith is, above all, open-ness—an act of trust in the unknown.",
    "If we came to our senses, we would be aware of ourselves not as only on the inside of our skins. But we would be aware that the outside is us too.",
    "The word person’ comes from the latin word persona’ which referred to the masks worn by actors in which sound would come through. The person’ is the mask—the role you’re playing. And all of your friends and relations and teachers are busy telling you who you are and what your role in life is.",
    "Light is an inseparable trinity of sun, object, and eye.",
    "There’s no need to possess [the Tao]. You are it, and by trying to possess it you imply that you’re not. So, by trying to catch hold of it, you as it were, push it away. Although you can’t really push it away because the very pushing is all it. You see?",
    "The gift of remembering and binding time creates the illusion that the past stands to the present as agent to act, mover to moved. Living thus from the past, with echoes taking the lead, we are not truly here, and are always a bit late to the feast.",
    "If you say making money is the most important thing, you will spend your life completely wasting your time. You’ll be doing things you don’t like doing in order to go on living. That is, to go on doing things you don’t like doing. Which is stupid. Better to have a short life, which is full of what you like doing, than a long one spent in a miserable way.",
    "This very moment, this very world, this very body is the point. Now. You see? But, if you’re seeking something beyond all the time, you never get with it. You’re never here",
    "The physical world is diaphanous. It’s like music. When you play music, it simply disappears. There’s nothing left. And, for that very reason it is one of the highest and most spiritual of the arts, because it is the most transient.",
    "We’re living in a fluid universe, in which the art of faith is not in taking one’s stand, but in learning to swim",
    "Buddha is the man who woke up, who discovered who he really was.",
    "What do we mean by I? We mean the symbol of ourselves. Now ourselves, in this case, is the whole psycho-physical organism—conscious and unconscious, plus its environment. That’s your real self. Your real self, in other words, is the universe as centered on your organism.",
    "Consciousness is rather unfolding, the e-volution,’ of what has always been hidden in the heart of the primordial universe of stars. It is in the living organism that the whole world feels; it is only by virtue of eyes that the stars themselves are light.",
    "Money is the same order of reality as inches, grams, or lines of longitude and latitude. It is an abstraction. It is a method of bookkeeping to obviate the cumbersome procedures of barter. But our culture, our civilization, is entirely hung up on the notion that money has an independent reality of its own.",
    "Supposing you knew the future and could control it perfectly, what would you do? You’d say. Let’s shuffle the deck and have another deal.",
    "I see that resistance, ego, is just an extra vortex in the stream—part of it—and that in fact there is no actual resistance at all. There is no point from which to confront life, or stand against it",
    "The physical universe is basically playful. There’s no necessity for it whatsoever. It isn’t going anywhere; that is to say, it doesn’t have a destination that it ought to arrive at. But it is best understood by analogy to music, because music as an art form is essentially playful.",
    "We have been hypnotized—literally hypnotized—by social convention into feeling and sensing that we exist only inside of our skins. That we are not the original big bang, but just something out on the end of it. And therefore, everybody feels unhappy and miserable.",
    "When you are not getting in the way of yourself, you will begin to find out that all the great things you do are really happenings. All growth is something that happens. For growth to happen two things are important. You must have the technical ability to express what happens. And secondly, you must get out of your own way.",
    "Let’s ask, How big is the sun?’ Are we going to define the sun as limited by the extent of its fire? That’s one possible definition. But we could equally well define the sphere of the sun by the extent of its light.",
    "The more it sides with itself, the more the good soul reveals its inseparable shadow, and the more it disowns its shadow the more it becomes it",
    "Nature is really formless, in the sense that it is one form. Naming a cloud a cloud does not separate the cloud from the sky. Just as when you pick up water into a sieve, you don’t succeed in separating the water into strips.",
    "The possibility of seeing down into something goes on forever and unnamedever. When you work with mantras, you can learn to hear similar infinite depths in sound.",
    "For when no knowledge is held to be respectable which is not objective knowledge, what we know will always seem to be not ourselves, not the subject. Thus we have the feeling of knowing things only from the outside, never from within, of being confronted eternally with a world of impenetrable surfaces within surfaces within surfaces",
    "Nirvana is right where you are, provided that you don’t object to it.",
    "I am not one who believes that it is any necessary virtue in the philosopher to spend his life defending a consistent position. It is surely a kind of spiritual pride to refrain from thinking out loud,’ and to be unwilling to let a thesis appear in print until you are prepared to champion it to the death. Philosophy, like science, is a social function, for a man cannot think rightly alone, and the philosopher must publish his thoughts as much to learn from criticism as to contribute to the sum of wisdom. If, then, I sometimes make statements in an authoritative and dogmatic manner, it is for the sake of clarity rather than from the desire to pose as an oracle.",
    "You can’t live at all unless you can live fully now.",
    "Thus the conventional saint and the conventional sinner, the ascetic and the sensualist, the metaphysician and the materialist may have so much in common that their opposition is quite trivial. Like alternating heat and cold, they may be symptoms of the same fever",
    "A baby has for a long time been part of its mother and has floated in the ocean of the womb. So it has the sense from the beginning of what is really to an enlightened person totally obvious—that the universe is one single organism",
    "The extraordinary capacity to feel an event inwardly, as distinct from bursting into precipitate action to avoid the tension of feeling—this capacity is in fact a wonderful power of adaptation to life, not unlike the instant responses of flowing water to the contours of the ground over which it flows",
    "I prefer not to translate the word Tao at all because to us Tao is a sort of nonsense syllable, indicating the mystery that we can never understand—the unity that underlies the opposites",
    "A proper exposition of Zen should tease us out of thought;, and leave the mind lie an open window instead of a panel of stained glass.",
    "It is as necessary to have air, water, plants, insects, birds, fish, and mammals as it is to have brains, hearts, lungs, and stomachs. The former are our external organs in the same way that the latter are our internal organs",
    "The physical world—clouds, mountains, humans—is wiggly. When you try to pick up a fish with your bare hands, it wiggles and slips out. What do you do? You use a net. And the net is the basic thing we have for getting hold of the wiggly world. And then somehow we think we understand when we have translated it into terms of straight lines and squares. But it doesn’t fit in nature.",
    "Solidity is a neurological invention, and, I wonder, can the nerves be solid to themselves? Where do we begin? Does the order of the brain create the order of the world, or the order of the world the brain?",
    "This is where the world begins. Only you’re not doing it by straining. A you deeper than the straining you’ is doing all of this. The same you that is growing your hair, coloring your eyes, and making your thumbprints. You don’t think about it. You don’t strain muscles to do it. But that is what is creating the world.",
    "You are all Vishnu playing that you’re in this mess, which is part of the cosmic dance. So, if that’s the case, dig it! You see? I mean, get with it! Be that!",
    "How can truth be known if it can never be defined? Zen would answer: by not trying to grasp or define it",
    "When you get to a deep ethical problem—where there is no easy decision one way or the other, you must look at the problem from the point of view of an artist. Which way of doing this is, in some sense, greater? It may be better to go off with a bang than a whimper",
    "Man has to realize that he is an integral part of nature, that he is just as much a natural form as a seagull or a wave, or a mountain. And if he doesn’t recognize that, he uses his technical powers to destroy his environment, to foul his own nest",
    "Your skin does not separate you from the world. It’s a bridge through which the external world flows into you. And you flow into it",
    "Every effort to change what is being felt or seen predisposes and confirms the illusion of the independent knower or ego, and to try to get rid of what isn’t there is only to prolong confusion",
    "What happens if you know that there is nothing you can do to be better? It’s kind of a relief isn’t it? You say Well, now what do I do?’ When you are freed from being out to improve yourself, your own nature will begin to take over",
    "We can see that the eternal is the transient, for the changing panorama of sense experience is not just a sum of appearing and disappearing things; it is a stable pattern or relationship manifested as, and by, transient forms",
    "Education, in the real sense, is not preparation for life, it is actually living. It is the child participating in adult concerns. And doing it now and realizing that the point of the process in which the child is engages, is not to prepare the child for the future, but to enjoy doing the thing today",
    "Your real self, the real you, is everything there is but concentratedAlan Watts in meditation and expressing itself at the point called your physical organism",
    "Your ego has about as much control over what goes on as a child sitting next to his father in a car with a plastic steering wheel",
    "Thought is a means of concealing truth, despite the fact that it’s an extraordinarily useful faculty",
    "When you know that you have to go with the river, suddenly you acquire—behind everything that you do—the power of the river",
    "the transformation of consciousness undertaken in Taoism and Zen is more like the correction of faulty perception or the curing of a disease. It is not an acquisitive process of learning more and more facts or greater and greater skills, but rather an unlearning of wrong habits and opinions",
    "The reality of our existence is that we are both the natural environment, which is ultimately the whole universe, and the organism, playing together. Why don’t we feel that way? Well obviously, because this other feeling gets in the way of it. This socially-induced feeling",
    "The bud has opened and the fresh leaves fan out and curve back with a gesture which is unmistakably communicative but doesn’t say anything except, Thus!’ And somehow that is quite satisfactory, even startlingly clear.” ~The Joyous Cosmology",
    "We are all floating in a tremendous river and the river carries you along. Some of the people in the river are swimming against the current, but they are still being carried along. Others have learned that the art of the thing is to swim with it. You have to flow with the river. There is no other way. You can swim against it, and pretend not to be flowing with it. But you still flow with the river.",
    "We can’t say anything sensible about everything, about the universe, because we can’t find something that’s not the universe",
    "This is why human beings find it difficult to learn and adapt to new situations: because we are always looking for precedence, for authority from the past on what we’re supposed to do now. And that gives us the impression that the past is all-important.",
    "The sure foundation upon which I had sought to stand has turned out to be the center from which I seek",
    "One solitary fact or thing cannot exist by itself, since it would be infinite—without delineating limits, without anything other. Now this essential duality and multiplicity of facts should be the clearest evidence of their interdependence and inseparability",
    "The hostile attitude of conquering nature ignores the basic interdependence of all things and events—that the world beyond the skin is actually an extension of our own bodies—and will end in destroying the very environment from which we emerge and upon which our whole life depends",
    "When the police enter a house in which there are thieves, the thieves go up from the ground floor to the first floor. When the police arrive on the first floor, the thieves have gone up to the second, and so to the third and finally out to the roof. And so, when the ego is about to be unmasked, it immediately identifies with a higher self. It goes up a level. Because the religious game is simply a refined and highbrow version of the ordinary game. How can I outwit me? How can I one up me?",
    "Love is a spectrum. There is not, as it were, nice love and nasty unnamedlove spiritual love, and material love mature affection on the one hand and infatuation on the other. These are all forms of the same energy, and you have to take it and let it grow where you find it. If you find that only one of these forms exist in you, if at least you will water it, the rest of the plant will blossom as well"
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