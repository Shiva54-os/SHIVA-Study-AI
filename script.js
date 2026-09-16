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


function generateStudyContent() {

    const request = studyInput.value.trim();


    // Check empty input
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
connectToAI(request);

    // Loading message
    resultSection.classList.remove("hidden");

    result.innerHTML = `
        <h2>⚡ Preparing your study content...</h2>
        <p>
            Your request:
            <b>${request}</b>
        </p>
    `;


// Connect to backend
async function connectToAI(request) {

    try {

        const response = await fetch("/api/index.js", {
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


        result.innerHTML = `
            <h2>🤖 Study AI</h2>

            <p>
                <b>Your request:</b>
                ${data.question}
            </p>

            <p>
                ✅ Backend connected successfully!
            </p>

            <p>
                AI generation will be added next.
            </p>
        `;


    } catch (error) {

        result.innerHTML = `
            <h2>❌ Error</h2>
async function connectToAI(request) {

    try {

        const response = await fetch("/api/index.js", {
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

        result.innerHTML = `
            <h2>🤖 Study AI</h2>

            <p>
                <b>Your request:</b>
                ${data.question}
            </p>

            <p>
                ✅ Backend connected successfully!
            </p>

            <p>
                AI generation will be added next.
            </p>
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
            <p>
                ${error.message}
            </p>
        `;

    }

}
