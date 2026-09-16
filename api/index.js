import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({
                error: "Please enter a study topic."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: `
You are Study AI, a helpful CBSE Class 10 study assistant.

Student request:
${question}

Give a clear, accurate, student-friendly answer suitable for CBSE Class 10.
Use headings, bullet points, examples, and questions/answers when appropriate.
`
        });

        return res.status(200).json({
            success: true,
            question: question,
            answer: response.output_text
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "AI generation failed. Please try again."
        });
    }
}
