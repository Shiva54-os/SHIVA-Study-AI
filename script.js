```javascript
// SHIVA Study AI
// Frontend JavaScript


// ================================
// NORMAL STUDY AI
// ================================

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
            <div class="result-card">

                <h2>⚠️ Enter a topic first</h2>

                <p>
                    Please enter a chapter or topic,
                    for example:
                    <b>Nationalism in India - MCQs</b>
                </p>

            </div>
        `;

        return;
    }


    // Show loading
    resultSection.classList.remove("hidden");

    result.innerHTML = `
        <div class="result-card">

            <h2>⚡ Preparing your study content...</h2>

            <p>
                Your request:
                <b>${escapeHTML(request)}</b>
            </p>

        </div>
    `;


    await connectToAI(request);
}


// Connect to normal AI backend
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
            <div class="result-card">

                <h2>🤖 Study AI</h2>

                <p>
                    <b>Your request:</b>
                    ${escapeHTML(data.question)}
                </p>

                <div class="ai-answer">
                    ${formatAnswer(data.answer)}
```
