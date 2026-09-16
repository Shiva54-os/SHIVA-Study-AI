// SHIVA Study AI
// Frontend JavaScript

const studyInput = document.getElementById("studyInput");
const generateBtn = document.getElementById("generateBtn");

const resultSection = document.getElementById("resultSection");
const result = document.getElementById("result");


// Quick Study buttons
function setRequest(type) {

    const currentText = studyInput.value.trim();

    if (currentText === "") {
        studyInput.value = type;
    } else {
        studyInput.value = currentText + " - " + type;
    }

    studyInput.focus();
}


// Generate button
generateBtn.addEventListener("click", generateStudyContent);


async function generateStudyContent() {

    const request = studyInput.value.trim();

    if (request === "") {

        resultSection.classList.remove("hidden");

        result.innerHTML = `
            <h2>⚠️ Enter a topic first</h2>

            <p>
                Please enter a chapter or topic,
                for example:
                <b>Nationalism in India - MCQs</b>
            </p>
        `;

        return;
    }


    // Show loading
    resultSection.classList.remove("hidden");

    result.innerHTML = `
        <h2>⚡ Preparing your study content...</h2>

        <p>
            Your request:
            <b>${request}</b>
        </p>
    `;


    await connectToAI(request);
}


// Connect to AI backend
async function connectToAI(request) {

    try {

        const response = await fetch("/api", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: request
            })

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Something went wrong."
            );

        }


        // Display actual AI answer
        result.innerHTML = `
            <h2>🤖 Study AI</h2>

            <p>
                <b>Your request:</b>
                ${data.question}
            </p>

            <div class="ai-answer">
                ${formatAnswer(data.answer)}
            </div>
        `;


    } catch (error) {

        result.innerHTML = `
            <h2>❌ Error</h2>

            <p>
                ${error.message}
            </p>
        `;

    }
}


// Format AI response
function formatAnswer(answer) {

    if (!answer) {

        return `
            <p>
                ❌ AI did not return an answer.
            </p>
        `;

    }

    return answer
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

}
