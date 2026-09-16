```javascript
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

        const body = req.body || {};

        const mode = body.mode || "normal";


        // ==========================================
        // NORMAL STUDY AI
        // ==========================================

        if (mode === "normal") {

            const question = body.question;


            if (!question || question.trim() === "") {

                return res.status(400).json({
                    error: "Please enter a study topic."
                });

            }


            const response =
                await client.responses.create({

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

        }



        // ==========================================
        // GENERATE PRACTICE TEST
        // ==========================================

        if (mode === "practice") {

            const chapter =
                body.chapter;

            const attemptId =
                body.attemptId ||
                Date.now().toString();


            if (!chapter || chapter.trim() === "") {

                return res.status(400).json({
                    error: "Please enter a chapter name."
                });

            }


            const response =
                await client.responses.create({

                    model: "gpt-5.6-luna",

                    input: `
You are Study AI, an expert CBSE Class 10 question paper generator.

Create a COMPLETE PRACTICE TEST for this chapter:

CHAPTER:
${chapter}

IMPORTANT:

This is a NEW practice attempt.

Attempt ID:
${attemptId}

Generate a fresh and different question set for this attempt.

Do NOT provide answers.

Do NOT provide explanations.

Do NOT show correct answers anywhere.

The student must see only the questions.

The test must contain EXACTLY these 6 sections:

1. MCQs
2. Fill in the Blanks
3. Very Short Questions
4. Short Questions
5. Long Questions
6. Assertion & Reason


QUESTION COUNT:

MCQs: 5
Fill in the Blanks: 5
Very Short Questions: 5
Short Questions: 4
Long Questions: 3
Assertion & Reason: 3

TOTAL:
25 questions


MCQ REQUIREMENTS:

Each MCQ must have exactly 4 options.

Do not indicate the correct option.


FILL IN THE BLANK REQUIREMENTS:

Give incomplete statements.

Do not provide the missing words.


VERY SHORT QUESTIONS:

Questions should normally be answerable in 1-2 sentences.


SHORT QUESTIONS:

Questions should require a short explanatory answer suitable for CBSE Class 10.


LONG QUESTIONS:

Questions should require detailed exam-style answers.


ASSERTION & REASON:

Each question must contain:

Assertion (A)
Reason (R)

Use standard CBSE-style assertion-reason questions.

Do NOT reveal whether A and R are true or false.

Do NOT reveal the correct option.


IMPORTANT CONTENT RULES:

- Questions must be based on the specified chapter.
- Keep the difficulty suitable for CBSE Class 10.
- Avoid duplicate questions.
- Avoid repeating the same concept unnecessarily.
- Mix conceptual, factual and application-based questions.
- Make every new attempt meaningfully different.
- Never include answer keys in the response.


RETURN FORMAT:

Return ONLY valid JSON.

Do not use markdown.

Use exactly this structure:

{
  "chapter": "${chapter}",
  "attemptId": "${attemptId}",
  "sections": [
    {
      "title": "MCQs",
      "questions": [
        {
          "id": "mcq-1",
          "type": "mcq",
          "question": "Question text",
          "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
          ]
        }
      ]
    },
    {
      "title": "Fill in the Blanks",
      "questions": [
        {
          "id": "fill-1",
          "type": "fill",
          "question": "Incomplete statement"
        }
      ]
    },
    {
      "title": "Very Short Questions",
      "questions": [
        {
          "id": "veryshort-1",
          "type": "veryshort",
          "question": "Question text"
        }
      ]
    },
    {
      "title": "Short Questions",
      "questions": [
        {
          "id": "short-1",
          "type": "short",
          "question": "Question text"
        }
      ]
    },
    {
      "title": "Long Questions",
      "questions": [
        {
          "id": "long-1",
          "type": "long",
          "question": "Question text"
        }
      ]
    },
    {
      "title": "Assertion & Reason",
      "questions": [
        {
          "id": "assertion-1",
          "type": "assertion",
          "question": "Assertion (A): ... Reason (R): ..."
        }
      ]
    }
  ]
}
`
                });


            let practice;


            try {

                practice =
                    JSON.parse(
                        response.output_text
                    );

            } catch (parseError) {

                console.error(
                    "Practice JSON Error:",
                    parseError
                );

                return res.status(500).json({

                    error:
                        "AI returned an invalid practice test. Please try again."

                });

            }


            return res.status(200).json({

                success: true,

                practice: practice

            });

        }



        // ==========================================
        // EVALUATE PRACTICE TEST
        // ==========================================

        if (mode === "evaluate") {

            const chapter =
                body.chapter;

            const practice =
                body.practice;

            const userAnswers =
                body.userAnswers;


            if (!chapter) {

                return res.status(400).json({
                    error: "Chapter is missing."
                });

            }


            if (
                !practice ||
                !Array.isArray(practice.sections)
            ) {

                return res.status(400).json({
                    error: "Practice test data is missing."
                });

            }


            if (!Array.isArray(userAnswers)) {

                return res.status(400).json({
                    error: "User answers are missing."
                });

            }


            const response =
                await client.responses.create({

                    model: "gpt-5.6-luna",

                    input: `
You are Study AI, an expert CBSE Class 10 examiner.

Evaluate the student's completed practice test.

CHAPTER:
${chapter}


PRACTICE TEST:
${JSON.stringify(practice)}


STUDENT ANSWERS:
${JSON.stringify(userAnswers)}


IMPORTANT:

Evaluate every question.

Do NOT give credit for an answer that is clearly incorrect.

For subjective questions, judge according to CBSE Class 10 level and accept reasonable equivalent wording.

For MCQs and fill-in-the-blanks, evaluate accurately.

For Very Short, Short and Long answers, evaluate based on the important points required by the question.

For Assertion & Reason questions, evaluate the student's answer according to the standard assertion-reason logic.

If the student did not answer a question, mark it incorrect.

Return ONLY valid JSON.

Do not use markdown.


RETURN EXACTLY THIS STRUCTURE:

{
  "score": 0,
  "total": 25,
  "review": [
    {
      "id": "question-id",
      "question": "Question text",
      "correct": true,
      "userAnswer": "Student answer",
      "correctAnswer": "Correct answer"
    }
  ]
}


RULES:

- score = number of questions answered correctly.
- total = total number of questions.
- review must contain ALL questions.
- correct must be true only when the student's answer is correct.
- userAnswer must contain exactly what the student submitted, or "Not answered".
- correctAnswer must provide the correct answer.
- Do not skip any question.
`
                });


            let evaluation;


            try {

                evaluation =
                    JSON.parse(
                        response.output_tex_
```
