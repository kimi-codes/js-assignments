/*
**** IMPORTANT NOTE: ****
It is stated in the assignment instructions that each question will have 4 possible answers, 
I took the liberty to not strictly stick to this requirement since I wanted to create a more flexible quizlet.
One answer can correspond to multiple result-characters in my code, so some questions do not need to have 4 answers.

But if the instructions were ment to be STRICTLY followed, please let me know and I'll redo this assignment. 


**** DESCRIPTION: ****
-- HOW IT WORKS: --
each answer has a score for every result the answer applies to. 
every possible result keeps its own score. at the end, the result with highest score is chosen.
for example: if the possible results for the quizz are 'cat', 'dog', and 'bird', 
             the answer to the question  'can you fly?' is 'yes' for 'bird' and 'no' for 'cat' AND 'dog'.
             choosing 'yes' will add score to 'cat' and 'dog'.

-- DATA STRUCTURES: --
questions:
- an array of objects, when each object represents a question and the possible answers. 
-- the possible answers are in an array, each item is an object containing the answer and a score object.
--- the score object has keys that corespond to the keys in the 'results' object (will be explained later), 
    and the values is a score.

results object:
- an object containing the text that shown at the end of the quiz.

score object:
Keeps score for every posible result (each key match a key in the results object), 
at the end the result with highest score is chosen. 

---------------------
*/


let questions = [
    {
        question: 'Whats your favorite food?',
        answers: [
            {
                answer: 'meatloaf!',
                score: { finn: 1}
            }, {
                answer: 'Backon pancakes!',
                score: { jake: 1}
            }, {
                answer: 'spaghetti!',
                score: { bubblegum: 1}
            }, {
                answer: 'Ice cream!',
                score: { iceking: 1, jake: 1}
            }
        ]
    }, {
        question: 'Would you rule a kingdom?',
        answers: [
            {
                answer: 'EVERYONE BOW TO ME!',
                score: { iceking: 1, bubblegum: 0.5}
            }, {
                answer: 'Yes!',
                score: { iceking: 1, bubblegum: 1}
            }, {
                answer: 'Nah dude, got other things to do.',
                score: { jake: 1, finn: 1}
            }
        ]
    }, {
        question: 'Where do you want to live?',
        answers: [
            {
                answer: 'A tree house sounds great.',
                score: { jake: 1, finn: 1}
            }, {
                answer: 'A kingdom made of ice of course!',
                score: { iceking: 1, bubblegum: 0.5}
            }, {
                answer: 'A kingdom made of.. candies! yes!',
                score: { iceking: 0.5, bubblegum: 1}
            }
        ]
    }, {
        question: 'Whats your weapon of choice?',
        answers: [
            {
                answer: 'A sword!',
                score: { finn: 1}
            }, {
                answer: 'Shape shifting, they would\'nt see that comming!',
                score: { jake: 1}
            }, {
                answer: 'The power of science! I can create everything and everyone!',
                score: { bubblegum: 1}
            }, {
                answer: 'Magic! I\'ll freeze them! he he he!',
                score: { iceking: 1}
            }
        ]
    }, {
        question: 'What instrument do you prefer?',
        answers: [
            {
                answer: 'A lute!',
                score: { finn: 1}
            }, {
                answer: 'A viola!',
                score: { jake: 1}
            }, {
                answer: 'A trumpet!',
                score: { bubblegum: 1}
            }, {
                answer: 'Drums!',
                score: { iceking: 1}
            }
        ]
    }, {
        question: 'What color do you prefer??',
        answers: [
            {
                answer: 'Green!',
                score: { finn: 1}
            }, {
                answer: 'Yellow.',
                score: { jake: 1}
            }, {
                answer: 'Pink.',
                score: { bubblegum: 1}
            }, {
                answer: 'Blue.',
                score: { iceking: 1, finn: 1}
            }
        ]
    }, {
        question: 'Hair (face or head): yay or nay?',
        answers: [
            {
                answer: 'Yay!',
                score: { finn: 1, bubblegum: 1, iceking: 1}
            }, {
                answer: 'Nay.',
                score: { jake: 1}
            }
        ]
    }, {
        question: 'Whats your head gear of choice?',
        answers: [
            {
                answer: 'A bear shaped hat! yeah!',
                score: { finn: 1}
            }, {
                answer: 'No hat.',
                score: { jake: 1}
            }, {
                answer: 'A crown!',
                score: { bubblegum: 1}
            }
        ]
    }, {
        question: 'Whats your clothing of choice?',
        answers: [
            {
                answer: 'Just a simple T-shirt and shorts.',
                score: { finn: 1}
            }, {
                answer: 'Spider web pants, duh!',
                score: { jake: 1}
            }, {
                answer: 'Every ocasion deservews its own outfit, youll have to be more specific than this.',
                score: { bubblegum: 1}
            }, {
                answer: 'A gown.',
                score: { iceking: 1, bubblegum: 0.5}
            }
        ]
    }, {
        question: 'Whats language do you like the most?',
        answers: [
            {
                answer: 'I\'m not too good with languages.',
                score: { finn: 1, iceking: 1}
            }, {
                answer: 'Korean.',
                score: { jake: 1, bubblegum: 1}
            }, {
                answer: 'German.',
                score: { bubblegum: 1}
            }
        ]
    }, {
        question: 'Whats would you like to write?',
        answers: [
            {
                answer: 'I would\'nt.',
                score: { finn: 1}
            }, {
                answer: 'A newspaper column.',
                score: { jake: 1}
            }, {
                answer: 'A science book.',
                score: { bubblegum: 1}
            }, {
                answer: 'Fan-Fiction!',
                score: { iceking: 1}
            }
        ]
    }
]


let results = {
    finn: 'Finn the human!\nYou\'re a brave adventurer fighting the evil!',
    jake: 'Jake the dog!\nYou are a brave adventurer but also laid-back and tend not to worry about things.',
    bubblegum: 'Princess Bubblegum!\nA smart scientist and the ruller of the Candy Kingdom!',
    iceking: 'Simon, the ice king!\nWith great power comes great.. insanity?'
};


const welcome_msg = '***************\nHI! Welcome to the quiz:\nWhat Adventure Time character are you?\n***************';
const results_msg = '***************\nReady to find out what Adventure Time character you are?\n***************\nYou are...';

let score = {
    finn: 0,
    jake: 0,
    bubblegum: 0,
    iceking: 0
};


const readlineSync = require('readline-sync');

question_msg = (num) => {
    num++;
    msg = '\n\nQuestion ' + num +':\n-------------';
    return msg
}

// prints the questions and possible answers, keeps a score.
function play() {
    for (qi in questions) {
        console.log(question_msg(qi));
        answers_obj_arr = questions[qi]['answers']; 
        shuffle(answers_obj_arr); // randomized the answer order
        answers_txt_arr = [];
        for (ai in answers_obj_arr) {
            answers_txt_arr.push(answers_obj_arr[ai]['answer']);
        }
        selection = readlineSync.keyInSelect(answers_txt_arr, questions[qi]['question']);
        if (selection == -1) {
            continue;
        }
        
        for (i in answers_obj_arr[selection]['score']) {
            score[i] += answers_obj_arr[selection]['score'][i];
        }
    }
}


// Shuffles an array randomly using the Fisher-Yates algorithm 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
}

// Finds the result with the highest score and prints it. 
function showResult() {
    bestScore = 0
    bestInd = 0
    for (i in score) {
        if (score[i] > bestScore) {
            bestInd = i;
            bestScore = score[i];
        }
    }
    if (bestScore === 0) {
        console.log('I guess you\'re not an Adventure Time character! :( ');
    }
    else {
        console.log(results_msg);
        console.log(results[bestInd]);
    }
}


console.log(welcome_msg);
play();
showResult();

