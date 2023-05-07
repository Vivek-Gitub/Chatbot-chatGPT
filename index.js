import { error, log } from 'console';
import {Configuration, OpenAIApi} from 'openai'; //1.
import readline from 'readline';  // it help us to interact with terminal

// here we configure chatGPT 
const configuration =  new Configuration({                //2.
    // https://platform.openai.com/account/api-keys

    organization: "org-oObNnChzoTLCu9qvpHNyX8XM",
    apiKey: "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"

})

// create a new instance of OpenAI and conclude your configuration        //3.
const openai = new OpenAIApi(configuration);

// it make us to interact within in the terminal  //5.
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// next we need to prompt the user  // so we can write in the terminal and we do  it because we want  to give request to openAI and get response from ai and it contin 
userInterface.prompt() //6. here user type inn terminal


// "on" called when user hit "Enter" in terminal and text get as "input"
// "on" is called when user write something in terminal and hit "ENTER" and we pass it to the callback function async(input)   // 7.
userInterface.on("line", async(input) => {

    await openai.createChatCompletion({  // 8. 
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content:input}]   // role is "user" because here user can ask the question
    }).then((result) => {     //<- because this is asyncrons so we need to used then() to get the result
        console.log(result.data.choices[0].message.content)
        
        userInterface.prompt() // <- it is here because when chatGPT give answer than we want it to next question "loop" 
    }).catch(error => console.log(error)); 
});


// // in this we ask question in "content" and chatGPT is response in "result"         //4.
// openai.createChatCompletion({ 
//     model: "gpt-3.5-turbo",
//     messages: [{role: "user", content:"what is java"}]   // role is "user" because here user can ask the question
// }).then((result) => {     //<- because this is asyncrons so we need to used then() to get the result
//     console.log(result.data.choices[0].message.content)

// }); 