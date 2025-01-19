import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const getSimilarWords = async (keyword) => {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: `${process.env.OPENAI_API_KEY}`,
    });

    try {
        const openaiChat = await openai.chat.completions.create({
            model: "openchat/openchat-7b:free",
            messages: [
                {
                    "role": "user",
                    "content": `just give me a numbered list of 50 words about topic: ${keyword}. Do not provide additional text.`,
                }
            ]
        });

        // Log the response for debugging
        console.log("OpenAI Chat Response:", openaiChat);

        // Check if choices exists and has at least one element
        if (openaiChat && openaiChat.choices && openaiChat.choices.length > 0) {
            const resultMessage = openaiChat.choices[0].message.content; // Access the response content
            const resultList = resultMessage
                .split("\n") // Split the text into lines
                .map((item) =>
                    item.replace(/^\d+\.\s/, "").replace("*", "").trim()
                ) // Clean up the text
                .filter((item) => item !== ""); // Remove empty lines
            return resultList;
        } else {
            console.error("Error: No valid 'choices' in OpenAI response");
            return [];
        }

    } catch (error) {
        console.error("Error with OpenAI API request:", error);
        return [];
    }
};

export { getSimilarWords };
