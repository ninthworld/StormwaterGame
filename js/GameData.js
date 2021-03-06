'use strict';

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * <https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array>
 * @author Laurens Holst
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var LastState = "TitleState";
var RestartState = "TitleState";

var PPGame = {
    reset: function() {
        this.score = 0;
        this.scoreLock = true;
        this.levelId = 0;

        this.questionsCompleted = 0;
        this.questionOrder = shuffleArray([0, 1, 2, 3, 4]);
        this.questionId = this.questionOrder[0];

        this.optionOrder = [];

        this.chosenOptionId = 0;
    }
};
PPGame.reset();

var FFGame = {
    reset: function() {
        this.score = 0;
        this.completed = 0;

        // This will produce:
        //  1 Correct answer
        //  2 Correct/Wrong answer (50% chance)
        //  3 Wrong answers

        var both = shuffleArray([0, 1, 2, 4, 5, 8]);
        this.options = [
            {
                id: both[0],
                wrong: false,
                done: false
            },
            {
                id: both[1],
                wrong: (Math.random() >= 0.5 ? true : false),
                done: false
            },
            {
                id: both[2],
                wrong: (Math.random() >= 0.5 ? true : false),
                done: false
            }
        ];
        
        var wrongOnly = shuffleArray([3, 6, 7, both[3], both[4], both[5]]);
        for(var i=0; i<3; ++i) {
            this.options.push({
                id: wrongOnly[i],
                wrong: true,
                done: false
            });
        }
    }
};
FFGame.reset();

var TextStyle = {
    centered: {
        font: '12pt "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif',
        align: 'center'
    },
    centeredLarge: {
        font: '14pt "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif',
        align: 'center'
    },
    centeredExtraLarge: {
        font: '16pt "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif',
        align: 'center'
    },
    centeredXXLarge: {
        font: '24pt "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif',
        align: 'center'
    },
    centeredHeader: {
        font: '28pt "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif',
        align: 'center'
    },
    lineSpacing: -8
};

var TextData = {
    intro: [
        "HI FRIENDS! I'M\nPROFESSOR DAVIS GREEN.\nWILL YOU HELP ME PREVENT\nSTORMWATER POLLUTION?",
        "STORMWATER\nIS WATER THAT FLOWS\nACROSS THE GROUND\nWHEN IT RAINS.",
        [
            "STORMWATER RUNOFF\nCAN PICK UP POLLUTANTS\nAS IT FLOWS DOWN GUTTERS\nAND INTO STORMDRAIN\nINLETS IN THE STREET.",
            "POLLUTANTS ARE THINGS\nTHAT MAKE WATER DIRTY."
        ],
        [
            "STORMWATER IS NOT\nCLEANED. IT ISN'T TREATED\nBEFORE IT FLOWS TO\nLOCAL CREEKS, WETLANDS\nAND LOCAL WATERWAYS.",
            "POLLUTED, DIRTY WATER\nCAN MAKE FISH AND\nANIMALS SICK."
        ],
        "LET'S SEE HOW THE SIMPLE\nCHOICES YOU MAKE AFFECT\nTHE WATER QUALITY IN\nLOCAL WETLANDS\nAND WATERWAYS."
    ],
    chooseGame: "PLAY BOTH GAMES\nTO LEARN MORE ABOUT\nPREVENTING\nSTORMWATER POLLUTION!",
    pause: "GAME PAUSED",
    ppIntro: [
        "IN THIS GAME, YOU\nWILL CHOOSE HOW\nTO DEAL WITH\nDIFFERENT PROBLEMS.",
        "AFTER YOU MAKE A CHOICE,\nYOU CAN SEE HOW IT\nAFFECTED THE WATER\nIN LOCAL WETLANDS\nAND WATERWAYS.",
        "TRY TO CHOOSE\nOPTIONS THAT PREVENT\nPOLLUTION AND PROTECT\nOUR WETLANDS\nAND WATERWAYS."
    ],
    ppChoseLevel: "CHOOSE A LEVEL\nTO START THE GAME!",
    ppRain: "OK, LET'S SEE WHAT\nHAPPENS WHEN IT\nRAINS!",
    ffIntro: [
        "IN THIS GAME, YOU WILL\nSEE A NEIGHBORHOOD\nWITH PEOPLE DOING\nDIFFERENT ACTIVITIES.",
        "IF THE ACTIVITY KEEPS\nSTORMWATER CLEAN,\nCHOOSE \"IT'S OK\".",
        "IF THE ACTIVITY MAKES\nSTORMWATER DIRTY—THIS\nIS CALLED POLLUTION—\nCHOOSE \"FIX IT\".",
        "SEE HOW WELL YOU\nCAN DO!"
    ]
};

var PPGameData = {
    resultsHeader: [
        "CORRECT!",
        "OOPS!"
    ],
    finalScore: function(x) {
        return "FINAL SCORE\n" + x + " OUT OF 5 OF YOUR CHOICES\nPROTECTED THE WATERWAYS!"
    },
    levels: [
        [
            {
                name: "pp_1_1",
                options: [
                    {
                        name: "pp_1_1a",
                        correct: false,
                        wetlands: {
                            overlay: 1,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: true,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT SOAP AND DIRTY WATER\nINTO THE GUTTER, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "NEXT TIME, USE A CAR WASH FACILITY—WHERE THE DIRTY\nWATER IS SENT TO THE SEWER TO BE CLEANED.\n\n" +
                                        "IF YOU WASH YOUR CAR AT HOME, USE A SMALL AMOUNT OF\nWATER AND HAVE THE DIRTY WATER FLOW INTO YOUR YARD—JUST\n" +
                                        "MAKE SURE THE DIRTY WATER DOESN'T RUN OFF INTO THE STREET."
                    },
                    {
                        name: "pp_1_1b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "A CAR WASH FACILITY IS A GREAT CHOICE BECAUSE THE\nDIRTY WATER IS SENT TO THE SEWER TO BE CLEANED.\n\n" + 
                                        "IF YOU WASH YOUR CAR AT HOME, USE A SMALL AMOUNT OF\nWATER AND HAVE THE DIRTY WATER FLOW INTO YOUR YARD."
                    },
                    {
                        name: "pp_1_1c",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "IF YOU WASH YOUR CAR AT HOME, USE A SMALL AMOUNT OF\nWATER AND HAVE THE DIRTY WATER FLOW INTO YOUR YARD.\n\n" + 
                                        "A CAR WASH FACILITY IS ANOTHER GREAT CHOICE BECAUSE THE\nDIRTY WATER IS SENT TO THE SEWER TO BE CLEANED."
                    }
                ]
            },
            {
                name: "pp_1_2",
                options: [
                    {
                        name: "pp_1_2a",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT PET WASTE INTO THE GUTTERS, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "PET WASTE CONTAINS HARMFUL BACTERIA THAT CAN\nKILL FISH AND MAKE OTHER ANIMALS SICK.\n\n" +
                                        "ALWAYS PICK UP PET WASTE AND PLACE IT IN THE TRASH."
                    },
                    {
                        name: "pp_1_2b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "PET WASTE CONTAINS HARMFUL BACTERIA THAT CAN\nKILL FISH AND MAKE OTHER ANIMALS SICK.\n\n" +
                                        "ALWAYS PICK UP PET WASTE AND PLACE IT IN THE TRASH."
                    }
                ]
            },
            {
                name: "pp_1_3",
                options: [
                    {
                        name: "pp_1_3a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "IF WASTE IS NOT PLACED IN A BIN WITH A CLOSED LID, IT\nCAN BE BLOWN BY WIND OR WASHED AWAY BY RAIN INTO\nSTORMDRAINS, WHERE IT WILL FLOW OUT TO LOCAL WATERWAYS."
                    },
                    {
                        name: "pp_1_3b",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: true
                        },
                        resultUpperText: "THAT SENT THE BOTTLE INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "IF WASTE IS PLACED ON THE GROUND IT CAN BE BLOWN\nBY WIND OR WASHED AWAY BY RAIN INTO STORMDRAINS,\n" +
                                        "WHERE IT WILL FLOW OUT TO LOCAL WATERWAYS.\n\nNEXT TIME, HOLD ONTO YOUR BOTTLE\nUNTIL YOU FIND A RECYCLING BIN THAT HAS SPACE INSIDE."
                    },
                    {
                        name: "pp_1_3c",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: true
                        },
                        resultUpperText: "THAT SENT THE BOTTLE INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "IF WASTE IS PLACED ON THE TOP OF A BIN IT CAN BE BLOWN\nBY WIND OR WASHED AWAY BY RAIN INTO STORMDRAINS,\n" +
                                        "WHERE IT WILL FLOW OUT TO LOCAL WATERWAYS.\n\nNEXT TIME, HOLD ONTO YOUR BOTTLE\nUNTIL YOU FIND A RECYCLING BIN THAT HAS SPACE INSIDE."
                    }
                ]
            },
            {
                name: "pp_1_4",
                options: [
                    {
                        name: "pp_1_4a",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: true,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT TRASH INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "LIDS ON TRASH BINS SHOULD BE CLOSED TO KEEP RAINWATER\nOUT AND PREVENT WIND FROM BLOWING TRASH OUT OF THE\n" +
                                        "BIN AND INTO A STORMDRAIN, WHERE IT WILL FLOW OUT\nTO LOCAL WATERWAYS.\nNEXT TIME, TAKE OUT EXTRA WASTE SO THE LID WILL CLOSE.\n" +
                                        "BETTER YET, TAKE OUT RECYCLABLE AND COMPOSTABLE ITEMS."
                    },
                    {
                        name: "pp_1_4b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "LIDS ON TRASH BINS SHOULD BE CLOSED TO KEEP RAINWATER\nOUT AND PREVENT WIND FROM BLOWING TRASH OUT OF THE\n" +
                                        "BIN AND INTO A STORMDRAIN, WHERE IT WILL FLOW OUT\nTO LOCAL WATERWAYS."
                    }
                ]
            },
            {
                name: "pp_1_5",
                options: [
                    {
                        name: "pp_1_5a",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: true,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT TRASH INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "WHEN TRASH IS LEFT ON THE GROUND, WIND AND RAIN CAN\nCARRY IT TO STORMDRAINS AND OUT TO LOCAL WATERWAYS.\n\n" +
                                        "NEXT TIME, PICK UP TRASH WHEN YOU DROP IT."
                    },
                    {
                        name: "pp_1_5b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "WHEN TRASH IS LEFT ON THE GROUND, WIND AND RAIN CAN\nCARRY IT TO STORMDRAINS AND OUT TO LOCAL WATERWAYS."
                    }
                ]
            }
        ],
        [
            {
                name: "pp_2_1",
                options: [
                    {
                        name: "pp_2_1a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "WHEN YOU WASH BRUSHES IN A SINK, THE DIRTY WATER\nIS SENT TO THE SEWER TO BE CLEANED.\n\n" +
                                        "YOU CAN ALSO WASH THE BRUSHES IN YOUR YARD—JUST MAKE\nSURE THAT THE DIRTY WATER DOESN'T RUN OFF INTO THE STREET."
                    },
                    {
                        name: "pp_2_1b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "JUST MAKE SURE THE DIRTY WATER WILL NOT\nRUN INTO THE STREET.\n\n" +
                                         "YOU CAN ALSO WASH BRUSHES IN THE SINK SO THE\nDIRTY WATER IS SENT TO THE SEWER TO BE CLEANED."
                    },
                    {
                        name: "pp_2_1c",
                        correct: false,
                        wetlands: {
                            overlay: 2,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT PAINT INTO THE GUTTERS, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "NEXT TIME, WASH BRUSHES IN A SINK SO THE DIRTY WATER\nIS SENT TO THE SEWER TO BE CLEANED.\n\n" +
                                         "YOU CAN ALSO WASH THE BRUSHES IN YOUR YARD—JUST MAKE\nSURE THAT THE DIRTY WATER DOESN'T RUN OFF INTO THE STREET." 
                    }
                ]
            },
            {
                name: "pp_2_2",
                options: [
                    {
                        name: "pp_2_2a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "TRASH BIN LIDS SHOULD BE KEPT CLOSED TO KEEP RAINWATER\nOUT AND TO PREVENT WIND FROM BLOWING TRASH OUT OF THE\nBIN" +
                                        " AND INTO THE STORMDRAIN AND LOCAL WATERWAYS."
                    },
                    {
                        name: "pp_2_2b",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: true,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT TRASH INTO THE GUTTERS, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "TRASH BIN LIDS SHOULD ALWAYS BE CLOSED TO KEEP RAINWATER\nOUT AND PREVENT WIND FROM BLOWING TRASH OUT OF THE BIN.\n\n" +
                                         "NEXT TIME, BE SURE TO CLOSE THE LID OF THE TRASH BIN."  
                    }
                ]
            },
            {
                name: "pp_2_3",
                options: [
                    {
                        name: "pp_2_3a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "MAKE SURE YOUR SPRINKLERS AND IRRIGATION TIMERS ARE\nADJUSTED SO THEY DON'T CAUSE WATER TO RUN OFF THE YARD,\n" +
                                         "CARRYING FERTILIZERS AND OTHER CHEMICALS INTO\nSTORMDRAINS AND OUT TO THE LOCAL WATERWAYS."
                    },
                    {
                        name: "pp_2_3b",
                        correct: false,
                        wetlands: {
                            overlay: 3,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT FERTILIZERS INTO THE GUTTERS, DOWN\nTHE STORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "MAKE SURE YOUR SPRINKLERS AND IRRIGATION TIMERS ARE\nADJUSTED SO THEY DON'T CAUSE WATER TO RUN OFF THE YARD,\n" +
                                         "CARRYING FERTILIZERS AND OTHER CHEMICALS INTO\nSTORMDRAINS AND OUT TO THE LOCAL WATERWAYS."  
                    }
                ]
            },
            {
                name: "pp_2_4",
                options: [
                    {
                        name: "pp_2_4a",
                        correct: false,
                        wetlands: {
                            overlay: 1,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT DIRT INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "MUDDY WATER CAN HARM FISH AND OTHER ANIMALS.\n\nNEXT TIME, SWEEP UP THE DIRT AND PUT IT IN YOUR YARD."
                    },
                    {
                        name: "pp_2_4b",
                        correct: false,
                        wetlands: {
                            overlay: 1,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT DIRT INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "MUDDY WATER CAN HARM FISH AND OTHER ANIMALS.\n\nNEXT TIME, SWEEP UP THE DIRT AND PUT IT IN YOUR YARD."
                    },
                    {
                        name: "pp_2_4c",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "RETURNING THE DIRT TO WHERE IT CAME FROM IS A GREAT WAY\nTO PREVENT WIND AND RAIN FROM CARRYING IT INTO\n" +
                                         "THE STORMDRAIN. MUDDY WATER CAN HARM FISH\nAND OTHER ANIMALS IN THE WATER."
                    }
                ]
            },
            {
                name: "pp_2_5",
                options: [
                    {
                        name: "pp_2_5a",
                        correct: false,
                        wetlands: {
                            overlay: 4,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT OIL INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "MOTOR OIL IS A VERY TOXIC POLLUTANT AND HARMS BOTH\nPLANTS AND ANIMALS IN WATERWAYS.\n\n" +
                                         "NEXT TIME, BE SURE TO WIPE UP THE OIL."
                    },
                    {
                        name: "pp_2_5b",
                        correct: false,
                        wetlands: {
                            overlay: 4,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT OIL INTO THE GUTTER, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "IF THE OIL IS NOT CLEANED UP, RAIN WILL EVENTUALLY\nWASH THE OIL INTO THE GUTTER AND DOWN THE STORMTRAIN.\n" +
                                         "MOTOR OIL IS A VERY TOXIC POLLUTANT AND HARMS BOTH\nPLANTS AND ANIMALS IN WATERWAYS.\nNEXT TIME, BE SURE TO WIPE UP THE OIL."
                    },
                    {
                        name: "pp_2_5c",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "WIPING THE OIL OFF IS A GREAT WAY TO PREVENT THE RAIN\nFROM WASHING IT INTO THE STORMDRAIN." 
                    }
                ]
            }
        ],
        [
			{
                name: "pp_3_1",
                options: [
                    {
                        name: "pp_3_1a",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT CHLORINE AND OTHER CHEMICALS INTO\nTHE GUTTER, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "POOL WATER SHOULD BE SENT TO THE SEWER UNLESS IT HAS\nNO CHLORINE AND THE WATER IS CLEAR.\n\n" +
                                         "YOU CAN ALSO WATER YOUR YARD WITH THE POOL WATER—JUST\nMAKE SURE IT DOESN'T RUN OFF INTO THE STREET."
                    },
                    {
						name: "pp_3_1b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "POOL WATER CAN CONTAIN CHLORINE AND OTHER CHEMICALS\nTHAT CAN MAKE FISH AND OTHER ANIMALS SICK.\n\n" + 
                                        "YOU CAN ALSO WATER YOUR YARD WITH THE POOL WATER—JUST\nMAKE SURE IT DOESN'T RUN OFF INTO THE STREET."
                    }
				]	
			},		
            {
                name: "pp_3_2",
                options: [
                    {
                        name: "pp_3_2a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "DOWNSPOUTS CAN CARRY A LOT OF WATER WHEN IT RAINS,\nWASHING OIL OFF PAVEMENTS AND CARRYING LITTER DOWN\n" +
											"STORMDRAINS. DIRECTING DOWNSPOUTS ONTO GRASS\nCAN ALLOW THE WATER TO SOAK INTO THE SOIL INSTEAD."
                    },
                    {
                        name: "pp_3_2b",
                        correct: false,
                        wetlands: {
                            overlay: 5,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: true,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT OIL, DIRT, LITTER AND OTHER POLLUTANTS\n INTO THE GUTTER, DOWN THE STORMDRAIN\n AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "DOWNSPOUTS CAN CARRY A LOT OF WATER WHEN IT\nRAINS, WASHING OIL AND DIRT OFF PAVEMENTS AND\n CARRYING LITTER DOWN STORMDRAINS.\n" +
											"NEXT TIME, YOU CAN DIRECT DOWNSPOUTS ONTO\nGRASS TO ALLOW THE WATER TO SOAK INTO THE SOIL."
                    }
                ]
            },
            {
                name: "pp_3_3",
                options: [
                    {
                        name: "pp_3_3a",
                        correct: false,
                        wetlands: {
                            overlay: 1,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: true,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT DIRT AND MULCH INTO THE GUTTER, DOWN\nTHE STORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "MUDDY WATER CAN HARM FISH AND OTHER ANIMALS AND MULCH\nREMOVES OXYGEN FROM THE WATER AS IT DECOMPOSES.\n\n" + 
										 "NEXT TIME, PLACE A BORDER AT THE EDGE OF THE YARD TO\nKEEP MULCH AND DIRT FROM BEING WASHED OR BLOWN AWAY"
                    },
                    {
                        name: "pp_3_3b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "PLACING A BORDER AT THE EDGE OF THE YARD HELPS TO\nKEEP MULCH AND DIRT FROM BEING WASHED OR BLOWN AWAY.\n" +
										  "MUDDY WATER CAN HARM FISH AND OTHER ANIMAMLS AND MULCH\nREMOVES OXYGEN FROM THE WATER AS IT DECOMPOSES."
                    }

                ]
            },
            {
                name: "pp_3_4",
                options: [
                    {
                        name: "pp_3_4a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "WHEN YOU SWEEP UP DIRT AND WIPE UP OIL, YOU HELP KEEP\nTHESE POLLUTANTS FROM BEING WASHED AWAY BY RAIN AND\n" +
                                         "BLOWN BY WIND INTO THE STORMDRAIN AND\nOUT TO LOCAL WATERWAYS.\n"
                                     
                    },
                    {
                        name: "pp_3_4b",
                        correct: false,
                        wetlands: {
                            overlay: 5,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT DIRT AND OIL INTO THE GUTTER, DOWN\nTHE STORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "NEXT TIME, SWEEP UP THE DIRT AND WIPE UP THE OIL TO\nKEEP THESE POLLUTANTS FROM BEING WASHED INTO THE\n" +
                                        "STORMDRAIN AND OUT TO LOCAL WATERWAYS."
                    }
                ]
            },
            {
                name: "pp_3_5",
                options: [
                    {
                        name: "pp_3_5a",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "LEAVES MAKE A GREAT NATURAL MULCH AND CAN HELP KEEP\nTREES HEALTHY. YOU CAN ALSO RAKE UP THE LEAVES AND\n" +
                                        "PLACE THEM IN YOUR ORGANICS CART."
                    },
                    {
                        name: "pp_3_5b",
                        correct: true,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: true,
                            deadFish: false,
                            soap: false,
                            mulch: false,
                            leaves: false,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "YOU PREVENTED POLLUTION AND KEPT\nTHE LOCAL WATERWAYS CLEAN!",
                        resultLowerText: "YOU CAN ALSO LEAVE THE LEAVES IN YOUR YARD AS MULCH.\nLEAVES MAKE A GREAT NATURAL MULCH\n" +
										 "AND CAN HELP KEEP TREES HEALTHY."
                    },
					{
                        name: "pp_3_5c",
                        correct: false,
                        wetlands: {
                            overlay: 0,
                            lilypad: true,
                            aliveFish: false,
                            deadFish: true,
                            soap: false,
                            mulch: false,
                            leaves: true,
                            trash: false,
                            bottle: false
                        },
                        resultUpperText: "THAT SENT LEAVES INTO THE GUTTER, DOWN\nTHE STORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                        resultLowerText: "LEAVES REMOVE OXYGEN FROM THE WATER WHEN THEY\nDECOMPOSE, KILLING FISH AND OTHER ANIMALS THAT LIVE\n" +
										 "IN THE WATER.\nNEXT TIME, RANK UP THE LEAVES AND PLACE THEM IN YOUR\n" +
										 "ORGANICS CART OR LEAVE THEM IN YOUR YARD AS MULCH."
                    }
                ]
				
            }
        ]
    ]
};

var FFGameData = {
    resultsHeader: [
        "YOU FIXED IT!",
        "CORRECT!",
        "OOPS!"
    ],
    finalScore: function(x) {
        return "FINAL SCORE\nYOU FIXED " + x + " OF THE 6\nPOLLUTING ACTIVITIES!"
    },
    options: [
        { // Option 0 - Downspout
            wrongOnly: false,
            correct: {
                sprite: {
                    name: "ff_downspout",
                    position: { x: 0.865, y: 0.285 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: [
                        {
                            name: "ff_downspout_water",
                            position: { x: 0.895, y: 0.428 },
                            scale: { x: 1.0, y: 1.0 }
                        }
                    ]
                },
                questionTitle: "DOWNSPOUT LEADS TO\nTHE YARD",
                questionImage: "ff_image_downspout_yard",
                resultImage: "ff_image_downspout_yard",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "DOWNSPOUTS THAT DRAIN TO\nCONCRETE CAN CARRY\nPOLLUTANTS TO STORMWATER\nAND LOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT OIL, DIRT, LITTER AND OTHER\nPOLLUTANTS INTO THE GUTTERS, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "DOWNSPOUTS THAT DRAIN TO\nCONCRETE CAN CARRY POLLUTANTS\nTO STORMDRAINS AND LOCAL\nWATERWAYS. NEXT TIME, DIRECT\nDOWNSPOUTS TO DRAIN TO PLANTS\nIN YOUR YARD AND ALLOW THE\nWATER TO SOAK INTO THE GROUND."
                }
            },
            wrong: {
                sprite: {
                    name: "ff_downspout",
                    position: { x: 0.855, y: 0.285 },
                    scale: { x: -1.0, y: 1.0 },
                    extras: [
                        {
                            name: "ff_downspout_water",
                            position: { x: 0.825, y: 0.428 },
                            scale: { x: -1.0, y: 1.0 }
                        }
                    ]
                },
                questionTitle: "DOWNSPOUT LEADS TO\nTHE DRIVEWAY",
                questionImage: "ff_image_downspout_concrete",
                resultImage: "ff_image_downspout_concrete",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "DOWNSPOUTS THAT DRAIN TO\nCONCRETE CAN CARRY\nPOLLUTANTS TO STORMWATER\nAND LOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT OIL, DIRT, LITTER AND OTHER\nPOLLUTANTS INTO THE GUTTERS, DOWN THE\nSTORMDRAIN AND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "DOWNSPOUTS THAT DRAIN TO\nCONCRETE CAN CARRY POLLUTANTS\nTO STORMDRAINS AND LOCAL\nWATERWAYS. NEXT TIME, DIRECT\nDOWNSPOUTS TO DRAIN TO PLANTS\nIN YOUR YARD AND ALLOW THE\nWATER TO SOAK INTO THE GROUND."
                }
            }
        },
        { // Option 1 - Trash Bin
            wrongOnly: false,
            correct: {
                sprite: {
                    name: "ff_trashbin_closed",
                    position: { x: 0.5, y: 0.84 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: []
                },
                questionTitle: "THE LID IS ON\nTHE TRASH BIN",
                questionImage: "ff_image_trashbin_closed",
                resultImage: "ff_image_trashbin_closed",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "LIDS ON TRASH BINS SHOULD BE\nCLOSED TO KEEP RAINWATER OUT\nAND PREVENT WIND FROM\nBLOWING TRASH OUT OF THE BIN\nAND INTO THE STORMDRAIN\nAND LOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT LITTER INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "LIDS ON TRASH BINS SHOULD BE\nCLOSED TO KEEP RAINWATER OUT\nAND PREVENT WIND FROM\nBLOWING TRASH OUT OF THE BIN\nAND INTO THE STORMDRAIN\nAND LOCAL WATERWAYS."
                }
            },
            wrong: {
                sprite: {
                    name: "ff_trashbin_open",
                    position: { x: 0.5, y: 0.84 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: []
                },
                questionTitle: "THE TRASH BIN LID\nIS OPEN",
                questionImage: "ff_image_trashbin_open",
                resultImage: "ff_image_trashbin_open",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "LIDS ON TRASH BINS SHOULD BE\nCLOSED TO KEEP RAINWATER OUT\nAND PREVENT WIND FROM\nBLOWING TRASH OUT OF THE BIN\nAND INTO THE STORMDRAIN\nAND LOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT LITTER INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "LIDS ON TRASH BINS SHOULD BE\nCLOSED TO KEEP RAINWATER OUT\nAND PREVENT WIND FROM\nBLOWING TRASH OUT OF THE BIN\nAND INTO THE STORMDRAIN\nAND LOCAL WATERWAYS."
                }
            }
        },
        { // Option 2 - Poop
            wrongOnly: false,
            correct: {
                sprite: {
                    name: "ff_pickup_poop",
                    position: { x: 0.435, y: 0.45 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: []

                },
                questionTitle: "PICKING UP PET WASTE\nIN THE YARD",
                questionImage: "ff_image_pickup_poop",
                resultImage: "ff_image_pickup_poop",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "ALWAYS PICK UP PET WASTE AND\nPLACE IT IN THE TRASH. PET WASTE\nCONTAINS HARMFUL BACTERIA THAT\nCAN POLLUTE STORMWATER AND\nLOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT PET WASTE INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "PET WASTE CONTAINS HARMFUL\nBACTERIA THAT CAN KILL FISH AND\nMAKE OTHER ANIMALS SICK.\nALWAYS PICK UP PET WASTE\nAND PLACE IT IN THE TRASH."
                }
            },
            wrong: {
                sprite: {
                    name: "ff_dog_poop",
                    position: { x: 0.435, y: 0.45 },
                    scale: { x: 0.75, y: 0.75 },
                    extras: []
                },
                questionTitle: "PET WASTE ON THE LAWN",
                questionImage: "ff_image_dog_poop",
                resultImage: "ff_image_dog_poop",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "PET WASTE CONTAINS HARMFUL BACTERIA\nTHAT CAN POLLUTE STORMWATER AND LOCAL\nWATERWAYS. ALWAYS PICK UP PET\nWASTE AND PLACE IT IN THE TRASH"
                },
                wrong: {
                    resultUpperText: "THAT SENT PET WASTE INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "PET WASTE CONTAINS HARMFUL\nBACTERIA THAT CAN KILL FISH AND\nMAKE OTHER ANIMALS SICK.\nNEXT TIME, PICK UP PET WASTE\nAND PLACE IT IN THE TRASH."
                }
            }
        },
        { // Option 3 - Trash
            wrongOnly: true,
            correct: {
                sprite: {
                    name: "ff_trash",
                    position: { x: 0.25, y: 0.95 },
                    scale: { x: 0.0, y: 0.0 },
                    extras: []
                },
                questionTitle: "",
                questionImage: "",
                resultImage: "ff_image_trash_pickup",
                correct: {                
                    resultUpperText: "",
                    resultLowerText: ""
                },
                wrong: {
                    resultUpperText: "",
                    resultLowerText: ""
                }
            },
            wrong: {
                sprite: {
                    name: "ff_trash",
                    position: { x: 0.25, y: 0.95 },
                    scale: { x: 0.9, y: 0.9 },
                    extras: []
                },
                questionTitle: "TRASH ON THE GROUND",
                questionImage: "ff_image_trash",
                resultImage: "ff_image_trash",
                correct: {                
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "TRASH ON THE GROUND IS OFTEN\nBLOWN OR WASHED DOWN\nSTROMDRAIN INLETS AND OUT TO\nLOCAL WATERWAYS. ALWAYS\nPICK UP TRASH WHEN YOU DROP IT."
                },
                wrong: {
                    resultUpperText: "THAT SENT LITTER INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "TRASH ON THE GROUND IS OFTEN\nBLOWN OR WASHED DOWN\nSTROMDRAIN INLETS AND OUT TO\nLOCAL WATERWAYS. NEXT TIME,\nPICK UP TRASH WHEN YOU DROP IT."
                }
            }
        },
        { // Option 4 - Dog Wash
            wrongOnly: false,
            correct: {
                sprite: {
                    name: "ff_washing_dog",
                    position: { x: 0.63, y: 0.60 },
                    scale: { x: 0.9, y: 0.9 },
                    extras: [
                        {
                            name: "ff_washing_dog_water",
                            position: { x: 0.745, y: 0.872 },
                            scale: { x: 0.0, y: 0.0 }
                        }
                    ]

                },
                questionTitle: "WASHING A DOG\nIN THE YARD",
                questionImage: "ff_image_washing_dog_grass",
                resultImage: "ff_image_washing_dog_grass",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "WASHING YOUR DOG IN A BATHTUB\nOR ON THE GRASS KEEPS DIRTY\nWATER OUT OF THE STORMDRAIN.\nWHEN YOU WASH YOUR DOG ON\nTHE DRIVEWAY, THE DIRTY WATER\nWILL FLOW INTO THE STORMDRAIN\nAND OUT TO LOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT SOAP AND DIRTY WATER\nINTO GUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "WHEN YOU WASH YOUR DOG ON\nTHE DRIVEWAY, THE DIRTY WATER\nWILL FLOW INTO THE STORMDRAIN\nAND OUT TO LOCAL WATERWAYS.\nNEXT TIME, WASH YOUR DOG IN A\nBATHTUB OR ON THE GRASS."
                }
            },
            wrong: {
                sprite: {
                    name: "ff_washing_dog",
                    position: { x: 0.86, y: 0.69 },
                    scale: { x: 0.9, y: 0.9 },
                    extras: [
                        {
                            name: "ff_washing_dog_water",
                            position: { x: 0.745, y: 0.872 },
                            scale: { x: 0.9, y: 0.9 }
                        }
                    ]
                },
                questionTitle: "WASHING A DOG\nON THE DRIVEWAY",
                questionImage: "ff_image_washing_dog_driveway",
                resultImage: "ff_image_washing_dog_driveway",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "WHEN YOU WASH YOUR DOG ON\nTHE DRIVEWAY, THE DIRTY WATER\nWILL FLOW INTO THE STORMDRAIN\nAND OUT TO LOCAL WATERWAYS.\nWASHING YOUR DOG IN A BATHTUB\nOR ON THE GRASS KEEPS DIRTY\nWATER OUT OF THE STORMDRAIN."
                },
                wrong: {
                    resultUpperText: "THAT SENT SOAP AND DIRTY WATER\nINTO GUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "WHEN YOU WASH YOUR DOG ON\nTHE DRIVEWAY, THE DIRTY WATER\nWILL FLOW INTO THE STORMDRAIN\nAND OUT TO LOCAL WATERWAYS.\nNEXT TIME, WASH YOUR DOG IN A\nBATHTUB OR ON THE GRASS."
                }
            }
        },
        { // Option 5 - Car Wash
            wrongOnly: false,
            correct: {
                sprite: {
                    name: "ff_washing_car",
                    position: { x: 0.06, y: 0.565 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: [
                        {
                            name: "ff_washing_car_water",
                            position: { x: 0.445, y: 0.76 },
                            scale: { x: 0.0, y: 0.0 }
                        }
                    ]

                },
                questionTitle: "WASHING A CAR\nIN THE YARD",
                questionImage: "ff_image_washing_car_yard",
                resultImage: "ff_image_washing_car_yard",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "ALWAYS USE A CAR WASH FACILITY\nOR WASH YOU CAR AT HOME AND\nHAVE THE DIRTY WATER FLOW INTO\nYOUR YARD. WASHING YOUR CAR\nON THE DRIVEWAY WILL MAKE SOAP\nAND DIRTY WATER FLOW INTO THE\nSTORMDRAIN AND OUT TO LOCAL\nWATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT OIL AND DIRTY WATER\nINTO GUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "WASHING YOUR CAR ON THE\nDRIVEWAY WILL MAKE SOAP AND\nDIRTY WATER FLOW INTO THE LOCAL\nWATERWAYS. NEXT TIME, USE A CAR\nWASH FACILITY OR WASH YOUR\nCAR AT HOME AND HAVE THE DIRTY\nWATER FLOW INTO YOUR YARD."
                }
            },
            wrong: {
                sprite: {
                    name: "ff_washing_car",
                    position: { x: 0.2195, y: 0.46 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: [
                        {
                            name: "ff_washing_car_water",
                            position: { x: 0.445, y: 0.755 },
                            scale: { x: 0.95, y: 0.95 }
                        }
                    ]
                },
                questionTitle: "WASHING A CAR\nON THE DRIVEWAY",
                questionImage: "ff_image_washing_car_driveway",
                resultImage: "ff_image_washing_car_driveway",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "WASHING YOUR CAR ON THE\nDRIVEWAY WILL MAKE SOAP AND\nDIRTY WATER FLOW INTO THE LOCAL\nWATERWAYS. USE A CAR\nWASH FACILIITY OR WASH YOUR\nCAR AT HOME AND HAVE THE DIRTY\nWATER FLOW INTO YOUR YARD."
                },
                wrong: {
                    resultUpperText: "THAT SENT OIL AND DIRTY WATER\nINTO GUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "WASHING YOUR CAR ON THE\nDRIVEWAY WILL MAKE SOAP AND\nDIRTY WATER FLOW INTO THE LOCAL\nWATERWAYS. NEXT TIME, USE A CAR\nWASH FACILITY OR WASH YOUR\nCAR AT HOME AND HAVE THE DIRTY\nWATER FLOW INTO YOUR YARD."
                }
            }
        },
        { // Option 6 - Dirt
            wrongOnly: true,
            correct: {
                sprite: {
                    name: "ff_dirt",
                    position: { x: 0.09, y: 0.85 },
                    scale: { x: 0.0, y: 0.0 },
                    extras: []
                },
                questionTitle: "",
                questionImage: "",
                resultImage: "ff_image_dirt_sweep",
                correct: {
                    resultUpperText: "",
                    resultLowerText: ""
                },
                wrong: {
                    resultUpperText: "",
                    resultLowerText: ""
                }
            },
            wrong: {
                sprite: {
                    name: "ff_dirt",
                    position: { x: 0.09, y: 0.85 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: []
                },
                questionTitle: "DIRT ON THE SIDEWALK",
                questionImage: "ff_image_dirt_sidewalk",
                resultImage: "ff_image_dirt_sidewalk",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "DIRT LEFT ON THE SIDEWALK CAN BE\nBLOWN BY WIND OR WASHED BY WATER\nDOWN STORMDRAINS AND OUT TO LOCAL\nWATERWAYS. MUDDY WATER CAN HARM\nFISH AND OTHER ANIMALS. ALWAYS SWEEP\nTHE DIRT BACK INTO YOUR YARD."
                },
                wrong: {
                    resultUpperText: "THAT SENT DIRT INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "DIRT LEFT ON THE SIDEWALK CAN BE\nBLOWN BY WIND OR WASHED BY WATER\nDOWN STORMDRAINS AND OUT TO LOCAL\nWATERWAYS. MUDDY WATER CAN HARM\nFISH AND OTHER ANIMALS. NEXT TIME\nSWEEP THE DIRT BACK INTO YOUR YARD."
                }
            }
        },
        { // Option 7 - Oil
            wrongOnly: true,
            correct: {
                sprite: {
                    name: "ff_car",
                    position: { x: 0.77, y: 0.52 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: []

                },
                questionTitle: "",
                questionImage: "",
                resultImage: "ff_image_car",
                correct: {
                    resultUpperText: "",
                    resultLowerText: ""
                },
                wrong: {
                    resultUpperText: "",
                    resultLowerText: ""
                }
            },
            wrong: {
                sprite: {
                    name: "ff_car_oil",
                    position: { x: 0.77, y: 0.52 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: []
                },
                questionTitle: "CAR DRIPPING OIL\nON THE DRIVEWAY",
                questionImage: "ff_image_car_oil",
                resultImage: "ff_image_car_oil",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "MOTOR OIL IS A SERIOUS\nPOLLUTANT. USE KITTY LITTER TO\nSOAK UP THE OIL, THEN SWEEP UP\nTHE SOAKED KITTY LITTER.\nYOU CAN ALSO USE A RAG TO\nWIPE UP THE OIL."
                },
                wrong: {
                    resultUpperText: "THAT SENT OIL INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "MOTOR OIL IS A SERIOUS\nPOLLUTANT. NEXT TIME, USE KITTY\nLITTER TO SOAK UP THE OIL,\nTHEN SWEEP UP THE SOAKED KITTY\nLITTER. YOU CAN ALSO USE A RAG\nTO WIPE UP THE OIL."
                }
            }
        },
        { // Option 8 - Sprinkler
            wrongOnly: false,
            correct: {
                sprite: {
                    name: "ff_sprinkler_fixed",
                    position: { x: 0.395, y: 0.75 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: [
                        {
                            name: "ff_sprinkler_water",
                            position: { x: 0.505, y: 0.842 },
                            scale: { x: 0.0, y: 0.0 }
                        }
                    ]
                },
                questionTitle: "SPRINKLERS ARE NOT\nREACHING THE SIDEWALK",
                questionImage: "ff_image_sprinkler_fixed",
                resultImage: "ff_image_sprinkler_fixed",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "ALWAYS MAKE SURE YOUR SPRINKLERS AND\nIRRIGATION TIMERS ARE ADJUSTED AND\nDON'T CAUSE WATER TO RUN OFF YOUR\nYARD, CARRYING FERTILIZERS AND OTHER\nCHEMICALS OUT TO LOCAL WATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT FERTILIZERS INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "MAKE SURE YOUR SPRINKLERS AND\nIRRIGATION TIMERS ARE ADJUSTED\nAND DON'T CAUSE WATER TO RUNOFF\nTHE LANDSCAPING, CARRYING\nFERTILIZERS AND OTHER CHEMICALS\nOUT TO LOCAL WATERWAYS."
                }
            },
            wrong: {
                sprite: {
                    name: "ff_sprinkler",
                    position: { x: 0.36, y: 0.75 },
                    scale: { x: 1.0, y: 1.0 },
                    extras: [
                        {
                            name: "ff_sprinkler_water",
                            position: { x: 0.505, y: 0.842 },
                            scale: { x: 1.0, y: 1.0 }
                        }
                    ]
                },
                questionTitle: "SPRINKLERS ARE\nWATERING THE SIDEWALK",
                questionImage: "ff_image_sprinkler_sidewalk",
                resultImage: "ff_image_sprinkler_sidewalk",
                correct: {
                    resultUpperText: "YOU PREVENTED POLLUTION AND\nKEPT THE LOCAL WATERWAYS CLEAN!",
                    resultLowerText: "WATER RUNNING OFF YOUR YARD\nCAN CARRY FERTILIZERS\nAND OTHER CHEMICALS THAT\nPOLLUTE STORMWATER AND LOCAL\nWATERWAYS."
                },
                wrong: {
                    resultUpperText: "THAT SENT FERTILIZERS INTO THE\nGUTTERS, DOWN THE STORMDRAIN\nAND POLLUTED LOCAL WATERWAYS!",
                    resultLowerText: "MAKE SURE YOUR SPRINKLERS AND\nIRRIGATION TIMERS ARE ADJUSTED\nAND DON'T CAUSE WATER TO RUNOFF\nTHE LANDSCAPING, CARRYING\nFERTILIZERS AND OTHER CHEMICALS\nOUT TO LOCAL WATERWAYS."
                }
            }
        }
    ]
};