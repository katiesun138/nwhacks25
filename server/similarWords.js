import axios from 'axios'
import {OpenAI} from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();



const getSimilarWords = async(keyword) => {

    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: `${process.env.OPENAI_API_KEY}`,
    })

    const openaiChat = await openai.chat.completions.create({
        model: "openchat/openchat-7b:free",
        messages: [
          {
            "role": "user",
            "content": `please only give me list of 50 words about topic: ${keyword}. Do not provide additional text.`,
          }
        ]
      })

    // console.log("CHAT AI GAVE BACK THIS LIST", openaiChat.choices[0].message)


    const resultMessage = openaiChat.choices[0].message.content; // Access the response content
    const resultList = resultMessage
        .split("\n") // Split the text into lines
        .map((item) =>
            item.replace(/^\d+\.\s/, "").replace("*", "").trim()
        ) // Clean up the text
        .filter((item) => item !== ""); // Remove empty lines
    console.log("THIS IS OUR RESULT LIST", resultList);
    return resultList;

}


export {getSimilarWords}