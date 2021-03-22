import { MachineConfig, send, Action, assign } from "xstate";
import { nluRequest } from "./index"

import img2 from "./images/Bild2.PNG"
import img3 from "./images/Bild3.PNG"
import img4 from "./images/Bild4.PNG"
import img5 from "./images/Bild5.PNG"
import img6 from "./images/Bild6.PNG"
import img7 from "./images/Bild7.PNG"
import img8 from "./images/Bild8.PNG"
import img9 from "./images/Bild9.PNG"
import img10 from "./images/Bild10.PNG"
import img11 from "./images/Bild11.PNG"
import img12 from "./images/Bild12.PNG"
import img13 from "./images/Bild13.PNG"
import img14 from "./images/Bild14.PNG"
import img15 from "./images/Bild15.PNG"
import img16 from "./images/Bild16.PNG"
import img17 from "./images/Bild17.PNG"
import img18 from "./images/Bild18.PNG"
import img19 from "./images/Bild19.PNG"
import img20 from "./images/Bild20.PNG"
import img21 from "./images/Bild21.PNG"
import img22 from "./images/Bild22.PNG"
import img23 from "./images/Bild23.PNG"
import img24 from "./images/Bild24.PNG"
import img25 from "./images/Bild25.PNG"
import img26 from "./images/Bild26.PNG"
import img27 from "./images/Bild27.PNG"
import img28 from "./images/Bild28.PNG"
import img29 from "./images/Bild29.PNG"
import img30 from "./images/Bild30.PNG"
import img31 from "./images/Bild31.PNG"
import img32 from "./images/Bild32.PNG"
import img33 from "./images/Bild33.PNG"
import img34 from "./images/Bild34.PNG"
import img35 from "./images/Bild35.PNG"
import img36 from "./images/Bild36.PNG"
import img37 from "./images/Bild37.PNG"
import img38 from "./images/Bild38.PNG"
import img39 from "./images/Bild39.PNG"
import img40 from "./images/Bild40.PNG"
import img41 from "./images/Bild41.PNG"
import img42 from "./images/Bild42.PNG"
import img43 from "./images/Bild43.PNG"
import img44 from "./images/Bild44.PNG"
import img45 from "./images/Bild45.PNG"
import img46 from "./images/Bild46.PNG"
import img47 from "./images/Bild47.PNG"
import img48 from "./images/Bild48.PNG"
import img49 from "./images/Bild49.PNG"
import img50 from "./images/Bild50.PNG"
import img51 from "./images/Bild51.png"


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

function rasaParse(currentState: string, target1: string, intent1: string, target2: string, intent2: string): MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        invoke: {
            id: 'rasa',
            src: (context, event) => nluRequest(context.recResult),
            onDone: [
                { target: `#root.dm.game.${target1}`, cond: (context, event) => event.data.intent["name"] === intent1 },
                { target: `#root.dm.game.${target2}`, cond: (context, event) => event.data.intent["name"] === intent2 },
                { target: `#root.dm.game.${currentState}.repeat1`, cond: (context, event) => event.data.intent["name"] !== intent1 && event.data.intent["name"] !== intent2 && event.data.intent["name"] !== "help" && event.data.intent["name"] !== "quit" && event.data.intent["name"] !== "repeat"},
                { target: "#root.dm.repeat", cond: (context, event) => event.data.intent["name"] === "repeat" },                    
                { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" },
                { target: "#root.dm.quit", cond: (context, event) => event.data.intent["name"] === "quit" }],
            onError: {
                    target: '#root.dm.error',
                }
        }
    })
}

function repeatQuestion(currentState: string, question: string, image: any, target1: string, intent1: string, target2: string, intent2: string): MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        initial: "prompt",
        on: {
            RECOGNISED: {
                target: ".rasa",
            }
        },
        states: {
            prompt: {
                entry: [assign((context) => { return { img : image} }), say(question)],
                on: { ENDSPEECH: "ask" }
            },
            ask: {
                entry: listen()
            },
            rasa: {
                invoke: {
                    id: 'rasa',
                    src: (context, event) => nluRequest(context.recResult),
                    onDone: [
                        { target: `#root.dm.game.${target1}`, cond: (context, event) => event.data.intent["name"] === intent1 },
                        { target: `#root.dm.game.${target2}`, cond: (context, event) => event.data.intent["name"] === intent2 },
                        { target: `#root.dm.game.${currentState}.repeat2`, cond: (context, event) => event.data.intent["name"] !== intent1 && event.data.intent["name"] !== intent2 && event.data.intent["name"] !== "help" && event.data.intent["name"] !== "quit" },
                        { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" },
                        { target: "#root.dm.quit", cond: (context, event) => event.data.intent["name"] === "quit" }],
                    onError: {
                        target: "#root.dm.error",
                    }
                }
            }
        }
    })
}

function repeatQuestion2(currentState: string, question: string, image: any, target1: string, intent1: string, target2: string, intent2: string): MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        initial: "prompt",
        on: {
            RECOGNISED: {
                target: ".rasa",
            }
        },
        states: {
            prompt: {
                entry: [assign((context) => { return { img : image} }), say(question)],
                on: { ENDSPEECH: "ask" }
            },
            ask: {
                entry: listen()
            },
            rasa: {
                invoke: {
                    id: 'rasa',
                    src: (context, event) => nluRequest(context.recResult),
                    onDone: [
                        { target: `#root.dm.game.${target1}`, cond: (context, event) => event.data.intent["name"] === intent1 },
                        { target: `#root.dm.game.${target2}`, cond: (context, event) => event.data.intent["name"] === intent2 },
                        { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] !== intent1 && event.data.intent["name"] !== intent2 && event.data.intent["name"] !== "quit" },
                        { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" },
                        { target: "#root.dm.quit", cond: (context, event) => event.data.intent["name"] === "quit" }],
                    onError: {
                        target: "#root.dm.error",
                    }
                }
            }
        }
    })
}


export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: {
                CLICK: {target: 'welcome', actions: assign((context) => { return { img : img2} })},
            }
        },
        welcome: {
            initial: "prompt1",
            on: {
                RECOGNISED: {
                    target: ".rasa",
                }
            },
            states: {
                prompt1: {
                    entry: say("Welcome to MLT Maze Game! This is a dialogue-based game where you will try to reach your goal by choosing the best route. If you want me to repeat a question, just say: repeat. Say: quit, if you want to quit the game."),
                    on: { ENDSPEECH: "prompt2" }
                },
                prompt2: {
                    entry: [assign((context) => { return { img : img51} }), say("Are you ready?")],
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen()
                },
                rasa: {
                    invoke: {
                        id: 'rasa',
                        src: (context, event) => nluRequest(context.recResult),
                        onDone: [
                            { target: "#root.dm.game", cond: (context, event) => event.data.intent["name"] === "affirm" },
                            { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" },
                            { target: "#root.dm.welcome", cond: (context, event) => event.data.intent["name"] === "repeat" },
                            { target: "#root.dm.welcome.repeat1", cond: (context, event) => event.data.intent["name"] !== "affirm" && event.data.intent["name"] !== "help" && event.data.intent["name"] !== "quit" && event.data.intent["name"] !== "repeat" },
                            { target: "#root.dm.quit", cond: (context, event) => event.data.intent["name"] === "quit" }],
                        onError: {
                            target: "#root.dm.error",
                        }
                    }
                },
                repeat1: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa",
                        }
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img3} }), say("I said: ARE YOU READY?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: {
                            invoke: {
                                id: 'rasa',
                                src: (context, event) => nluRequest(context.recResult),
                                onDone: [
                                    { target: "#root.dm.game", cond: (context, event) => event.data.intent["name"] === "affirm" },
                                    { target: "#root.dm.welcome.repeat2", cond: (context, event) => event.data.intent["name"] !== "affirm" && event.data.intent["name"] !== "help" && event.data.intent["name"] !== "quit" },
                                    { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" },
                                    { target: "#root.dm.quit", cond: (context, event) => event.data.intent["name"] === "quit" }],
                                onError: {
                                    target: "#root.dm.error",
                                }
                            }
                        }
                    }
                },
                repeat2: {
                    entry: [assign((context) => { return { img : img4} }), say("I take that as a yes.")],
                    on: { ENDSPEECH: "#root.dm.game" }
                }
            }
        },
        game: {
            initial: "start",
            states: {
                hist: { type: 'history' },
                start: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: "humanisten",
                        }
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img5} }), say("Great! Let’s play! It's a beautiful day in spring. You are an MLT student and have just finished an exam at Humanisten. Your classmates are already celebrating in a bar on Andra Longgatan. You need to get there before they finish their drinks and go home. But since you are new in town, you don't know the way.")],
                            on: { ENDSPEECH: "#root.dm.game.textMessage" }
                        }
                    }
                },
                textMessage: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img6} }), say("On your way out of Humanisten you receive a text message from a classmate. Do you open it?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        read: {entry: [assign((context) => { return { img : img9} }), say("The message says: You need to go to Järntorget. You can take tram number 3 or tram number 6 to get there.")],
                    on: { ENDSPEECH: "#root.dm.game.humanisten" }
                },
                        rasa: rasaParse('textMessage', 'textMessage.read', 'affirm', 'humanisten', 'deny'),
                        repeat1: repeatQuestion("textMessage", "Sorry, I didn't catch that. Do you read the message?", img7, 'textMessage.read', 'affirm', 'humanisten', 'deny'),
                        repeat2: repeatQuestion2("textMessage", "I still don't understand you. Say yes if you want to read the message and no if you don't.", img8, 'textMessage.read', 'affirm', 'humanisten', 'deny'),
                    }
                },
                humanisten: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img10} }), say("You exit the building and realize you don't even know where the nearest tram stop is. To your right you see some stairs that go downhill. Ahead of you is the statue of Poseidon. Do you go down the stairs or do you head towards Poseidon?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('humanisten', 'gotaplatsen', 'poseidon', 'korsvagen', 'stairs'),
                        repeat1: repeatQuestion("humanisten", "Sorry, I didn't catch that. Do you go down the stairs or do you head towards Poseidon?", img11, 'gotaplatsen', 'poseidon', 'korsvagen', 'stairs'),
                        repeat2: repeatQuestion2("humanisten", "I still don't understand you. Say yes for the stairs and no for Poseidon", img12, 'gotaplatsen', 'affirm', 'korsvagen', 'deny'),
                    }
                },
                gotaplatsen: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: { target: ".rasa", actions: assign((context) => { return { gotaplatsen: true } })},
                        
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img13} }), say("You start to walk straight ahead and soon you find yourself at Götaplatsen. The majesty of Poseidon simply takes your breath away. But when you reach the public transport stop there are no trams there, only busses. However, you see a nice lady that might know what you should do. Do you ask the nice lady for help?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('gotaplatsen', 'niceLady', 'affirm', 'noNiceLady', 'deny'),
                        repeat1: repeatQuestion('gotaplatsen', "Sorry, I didn't catch that. Do you ask the nice lady?", img14, 'niceLady', 'affirm', 'noNiceLady', 'deny'),
                        repeat2: repeatQuestion2('gotaplatsen', "I still don't understand you. Say yes if you want to ask the nice lady for help and no if you don't.", img15, 'niceLady', 'affirm', 'noNiceLady', 'deny')
                    }
                },
                niceLady: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: ".rasa",
                        
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img16} }), say("The nice lady says you can either take a bus down to Brunnsparken or walk to the tram stop Valand further down the street. So, do you continue to walk or do you jump on a bus?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('niceLady', 'valand', 'walk', 'brunnsparken', 'bus'),
                        repeat1: repeatQuestion('niceLady', "Sorry, I didn't catch that. Do you continue to walk or do you take a bus?", img17, 'valand', 'walk', 'brunnsparken', 'bus'),
                        repeat2: repeatQuestion2('niceLady', "I still don't understand you. Say yes for walking and no for the bus", img18, 'valand', 'affirm', 'brunnsparken', 'deny')
                    }
                },
                noNiceLady: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: ".rasa",
                        
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img19} }), say("So, do you continue to walk down the street or do you jump on a bus?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('noNiceLady', 'valand', 'walk', 'brunnsparken', 'bus'),
                        repeat1: repeatQuestion('noNiceLady', "Sorry, I didn't catch that. Do you continue to walk or do you take a bus?", img20, 'valand', 'walk', 'brunnsparken', 'bus'),
                        repeat2: repeatQuestion2('noNiceLady', "I still don't understand you. Say yes for walking and no for the bus.", img21, 'valand', 'affirm', 'brunnsparken', 'deny')
                    }
                },
                korsvagen: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: { target: ".rasa", actions: assign((context) => { return { korsvagen: true } })}
                        
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img22} }), say("You start walking down the steep stairs and find yourself at Korsvergen. It is more of a construction site than a tram stop. Suddenly you see tram number 6. The doors are about to close but you can make it if you hurry! Do you run to catch it?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('korsvagen', 'kortedala', 'affirm', 'brunnsparken.prompt2', 'deny'),
                        repeat1: repeatQuestion('korsvagen', "Sorry I didn't catch that. Do you take the tram?", img23, 'kortedala', 'affirm', 'brunnsparken.prompt2', 'deny'),
                        repeat2: repeatQuestion2('korsvagen', "I still don't understand. Do you take the tram: yes or no?", img24, 'kortedala', 'affirm', 'brunnsparken.prompt2', 'deny')
                    }
                },
                brunnsparken: {
                    initial: "checkOrigin",
                    on: {
                        RECOGNISED: { actions: assign((context) => { return { brunnsparken: true } }), 
                            target: ".rasa"},
                    },
                    states: {
                        checkOrigin: {
                            on: {'': [
                                { target: "prompt1", cond: (context) => context.gotaplatsen === true },
                                { target: "prompt2", cond: (context) => context.korsvagen === true }]}
                        },
                        prompt1: {
                            entry: [assign((context) => { return { img : img25} }), say("You jump on the first bus you see. After just a few stops, you get off at Brunnsparken. You look around and see that the trams 6 and 1 depart from here. Which one do you take?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        prompt2: {
                            entry: [assign((context) => { return { img : img26} }), say("Since you don’t feel like running in public, you watch tram 6 depart. Instead, you take tram 4 to Brunnsparken and decide to change to another tram line there. When you reach Brunnsparken, you get off the tram and look around. You see that the trams 6 and 1 depart from here. Which one do you take?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: {
                            invoke: {
                                id: 'rasa',
                                src: (context, event) => nluRequest(context.recResult),
                                onDone: [
                                    { target: "#root.dm.game.jarntorget.prompt2", cond: (context, event) => event.data.intent["name"] === "one" || context.recResult.includes("1") },
                                    { target: "#root.dm.game.hjalmarbranting", cond: (context, event) => event.data.intent["name"] === "six" || context.recResult.includes("6") },
                                    { target: "#root.dm.game.brunnsparken.repeat1", cond: (context, event) => event.data.intent["name"] !== "one" && event.data.intent["name"] !== "six" && event.data.intent["name"] !== "help" && event.data.intent["name"] !== "quit" && event.data.intent["name"] !== "repeat"},
                                    { target: "#root.dm.repeat", cond: (context, event) => event.data.intent["name"] === "repeat" },                    
                                    { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" },
                                    { target: "#root.dm.quit", cond: (context, event) => event.data.intent["name"] === "quit" }],
                                onError: {
                                        target: '#root.dm.error',
                                    }
                            }
                        },
                        repeat1: repeatQuestion('brunnsparken', "Sorry I didn't catch that. Do you take tram 1 or tram 6?", img27, 'jarntorget.prompt2', 'one', 'hjalmarbranting', 'six'),
                        repeat2: repeatQuestion2('brunnsparken', "I still don't understand. Say yes for tram 1 and no for tram 6.", img28, 'jarntorget.prompt2', 'affirm', 'hjalmarbranting', 'deny'),
                    }
                },
                valand: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa",
                        }
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img29} }), say("You continue to walk down Avenyn and you’re in a great mood. You reach the tram stop at Valand and look at the monitor. But what? Due to a technical error, there is currently no tram traffic between Valand and Järntorget. Your options now are to continue to walk towards Järntorget or to take a tram down to Brunnsparken. What do you do?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('valand', 'vasaplatsen', 'walk', 'brunnsparken', 'tram'),
                        repeat1: repeatQuestion('valand', "Sorry I didn't catch that. Do you continue to walk or do you take a tram?", img30, 'vasaplatsen', 'walk', 'brunnsparken', 'tram'),
                        repeat2: repeatQuestion2('valand', "I still don't understand. Say yes for walking and no for tram.", img31, 'vasaplatsen', 'affirm', 'brunnsparken', 'deny'),
                    }
                },
                vasaplatsen: {
                    initial: "prompt",
                    on: {
                        RECOGNISED: { actions: assign((context) => { return { vasaplatsen: true } }), 
                            target: ".rasa"},
                        
                    },
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img32} }), say("You continue your walk along Vasagatan. You reach the tram stop at Vasaplatsen and check the monitor. But no, there are still no trams passing. You start to feel tired from all the walking and see a station of the public city bikes. Do you take a bike or do you continue to walk?")],
                            on: { ENDSPEECH: "ask" }
                        },
                        ask: {
                            entry: listen()
                        },
                        rasa: rasaParse('vasaplatsen', 'styrostall', 'bike', 'jarntorget', 'walk'),
                        repeat1: repeatQuestion('vasaplatsen', "Sorry I didn't catch that. Do you take a bike or do you continue to walk?", img33, 'styrostall', 'bike', 'jarntorget', 'walk'),
                        repeat2: repeatQuestion2('vasaplatsen', "I still don't get it. Say yes for bike or no for walking.", img34, 'styrostall', 'affirm', 'jarntorget', 'deny')
                    }
                },
                jarntorget: {
                    initial: "checkOrigin",
                    states: {                        
                        checkOrigin: {
                        on: {'': [
                            { target: "prompt1", cond: (context) => context.vasaplatsen === true },
                            { target: "prompt2", cond: (context) => context.brunnsparken === true }]}
                    },
                        prompt1: {
                            entry: [assign((context) => { return { img : img35} }), say("After a long walk you finally reach Järntorget and there it is: Andra Longgatan!")],
                            on: { ENDSPEECH: "#root.dm.game.andralang" }
                        },
                        prompt2: {
                            entry: [assign((context) => { return { img : img36} }), say("You board tram number 1 and get off at Järntorget. Finally you see it: Andra Longgatan!")],
                            on: { ENDSPEECH: "#root.dm.game.andralang" }
                        }
                    }
                },
                andralang: {
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img37} }), say("While you’re walking along the bar street you think to yourself how much you love this city. Suddenly, you see a group of people smiling and waving to you from inside one of the bars. It’s your classmates!")],
                            on: { ENDSPEECH: "#root.dm.game.win" }
                        }
                    }
                },
                kortedala: {
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img48} }) ,say("You hurry towards the tram and manage to get inside, just as the doors close behind you. You wait for the name ”Järntorget” to show up on the monitor. You ask the man next to you if tram number 6 really goes to Järntorget. He says it does, but in the opposite direction! You are now halfway to Kortedala and realize you will never make it to the bar in time.")],
                            on: { ENDSPEECH: { actions: assign((context) => { return { kortedala: true } }), 
                            target: "#root.dm.game.gameover" }}
                        }
                    }
                },
                hjalmarbranting: {
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img50} }),say("You board tram number 6, confident that it will take you to Järntorget. After just one stop, you find yourself on a bridge! The view of the city and Göta River is wonderful, but this can’t be right… You ask the woman next to you if tram number 6 really goes to Järntorget. She says it does, but in the opposite direction! You are now on Hisingen island and there is no way you will make it to the bar in time.")],
                            on: { ENDSPEECH: { actions: assign((context) => { return { hjalmarbranting: true } }), 
                            target: "#root.dm.game.gameover" }}
                        }
                    }
                },
                styrostall: {
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img49} }),say("You approach the bike terminal and read the instructions. When you finally manage to get a bike, you have lost valuable time. You start to pedal as fast as you can towards Järntorget when you’re suddenly thrown off the bike. The front wheel got stuck in the tram tracks. You feel a terrible pain in your arm and need to go the hospital. Your classmates will have to celebrate without you…")],
                            on: { ENDSPEECH: { actions: assign((context) => { return { styrostall: true } }), 
                            target: "#root.dm.game.gameover" }}
                        }
                    }
                },
                win: {
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img38} }), say("Congratulations! You won!")],
                            on: { ENDSPEECH: [
                                {
                                  target: 'gold',
                                  cond: (context) => context.vasaplatsen,
                                },
                                {
                                    target: 'silver',
                                    cond: (context) => context.gotaplatsen && context.brunnsparken,
                                  },
                                  {
                                    target: 'bronze',
                                    cond: (context) => context.korsvagen && context.brunnsparken,
                                  },
                                { target: 'goodbye' }
                              ] }
                        },
                        gold: {
                            entry: [assign((context) => { return { img : img39} }), say("Your strategy of walking the whole way awards you with a gold medal. Sometimes, that's the fastest way to get around in Gothenburg.")],
                            on: { ENDSPEECH: "goodbye" }
                        },
                        silver: {
                            entry: [assign((context) => { return { img : img40} }), say("Your strategy of taking both bus and tram awards you with a silver medal. Do you think you can do better?")],
                            on: { ENDSPEECH: "goodbye" }
                        },
                        bronze: {
                            entry: [assign((context) => { return { img : img41} }), say("Your strategy of taking two different trams awards you with a bronze medal. Do you think you can do better?")],
                            on: { ENDSPEECH: "goodbye" }
                        },
                        goodbye: {
                            entry: say("Refresh the page and click on the screen if you want to play again."),
                            on: { ENDSPEECH: "#root.dm" }
                        }
                    }
                },
                gameover: {
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: [assign((context) => { return { img : img42} }), say("You lost! You didn't make it to the bar in time.")],
                            on: { ENDSPEECH: [
                                {
                                  target: 'styrostall',
                                  cond: (context) => context.styrostall,
                                },
                                {
                                    target: 'tram6',
                                    cond: (context) => context.hjalmarbranting || context.kortedala,
                                  },
                                { target: 'goodbye' }
                              ] }
                        },
                        styrostall: {
                            entry: say("I hope you have learned that it's dangerous to ride a bike on tram tracks."),
                            on: { ENDSPEECH: "goodbye" }
                        },
                        tram6: {
                            entry: say("What we can learn from this is that you should never take tram number 6 since you will always take it in the wrong direction."),
                            on: { ENDSPEECH: "goodbye" }
                        },
                        goodbye: {
                            entry: say("Refresh the page and click on the screen if you want to try again."),
                            on: { ENDSPEECH: "#root.dm" }
                        }
                    }
                },
            }
        },
        help: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: [assign((context) => { return { img : img43} }), say("Try to answer the questions as clearly as you can. Say: repeat, if you want me to repeat the question. Say: quit, if you want to quit the game.")],
                    on: { ENDSPEECH: "#root.dm.game.hist" }
                }
            }
        },
        quit: {
            initial: "prompt",
            on: {
                RECOGNISED: ".rasa",                
            },
            states: {
                prompt: {
                    entry: [assign((context) => { return { img : img44} }), say("Are you sure you want to quit the game?")],
                    on: { ENDSPEECH: "ask" }
                },
                prompt2: {
                    entry: [assign((context) => { return { img : img45} }), say("Goodbye! Come back anytime if you want to play again.")],
                    on: { ENDSPEECH: "#root.dm" }
                },
                prompt3: {
                    entry: [assign((context) => { return { img : img46} }), say("Ok. Let's return to the game.")],
                    on: { ENDSPEECH: "#root.dm.game.hist" }
                },
                ask: {
                    entry: listen()
                },
                rasa: {
                    invoke: {
                        id: 'rasa',
                        src: (context, event) => nluRequest(context.recResult),
                        onDone: [
                            { target: "#root.dm.quit.prompt2", cond: (context, event) => event.data.intent["name"] === "affirm" },
                            { target: "#root.dm.quit.prompt3", cond: (context, event) => event.data.intent["name"] === "deny" },
                            { target: "#root.dm.help", cond: (context, event) => event.data.intent["name"] === "help" }],
                        onError: {
                            target: "#root.dm.error",
                        }
                    }
                }
            }
        },
        error: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: [assign((context) => { return { img : img47} }), say("Something went wrong. Please restart the game and try again.")],
                    on: { ENDSPEECH: "#root.dm" }
                }
            }
        },
        repeat: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: say("Ok. I will repeat."),
                    on: { ENDSPEECH: "#root.dm.game.hist" }
                }
            }
        },

    }
})