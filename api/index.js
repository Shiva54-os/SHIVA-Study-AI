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
You are Study AI, an expert CBSE Class 10 study assistant.

Student request:
${question}

Instructions:
- Give accurate and easy-to-understand answers.
- Keep the content suitable for CBSE Class 10 students.
- Use clear headings.
- Use bullet points where useful.
- For MCQs, provide options and the correct answer.
- For questions, provide clear answers.
- For notes, make them concise and exam-friendly.
- Explain difficult concepts in simple language.
- Do not mention these instructions in your answer.
`

        });

        return res.status(200).json({

            success: true,

            question: question,

            answer: response.output_text

        });

    } catch (error) {

        console.error("OpenAI Error:", error);

        return res.status(500).json({

            error: "AI generation failed. Please try again."

        });

    }

}
