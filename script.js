```javascript
// ==========================================
// STUDY AI — MAIN FRONTEND
// ==========================================

const studyInput = document.getElementById("studyInput");
const generateBtn = document.getElementById("generateBtn");

const resultSection = document.getElementById("resultSection");
const result = document.getElementById("result");


// ==========================================
// QUICK STUDY BUTTONS
// ==========================================

function setRequest(type) {

    const currentText = studyInput.value.trim();

    if (currentText === "") {

        studyInput.value = type;

    } else {

        studyInput.value =
            currentText + " - " + type;

    }

    studyInput.focus();
}


// ==========================================
// GENERATE BUTTON
// ==========================================

generateBtn.addEventListener(
    "click",
    generateStudyContent
);


async function generateStudyContent() {

    const request =
        studyInput.value.trim();


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


// ==========================================
// CONNECT TO AI
// ==========================================

async function connectToAI(request) {

    try {

        const response =
            await fetch("/api", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    question: request

                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Something went wrong."
            );

        }


        // Display AI answer

        result.innerHTML = `
            <div class="result-card">

                <h2>🤖 Study AI</h2>

                <p>
                    <b>Your request:</b>
                    ${escapeHTML(data.question)}
                </p>

                <div class="ai-answer">

                    ${formatAnswer(data.answer)}

                </div>

            </div>
        `;


    } catch (error) {

        result.innerHTML = `
            <div class="result-card">

                <h2>❌ Error</h2>

                <p>
                    ${escapeHTML(error.message)}
                </p>

            </div>
        `;

    }

}


// ==========================================
// FORMAT AI ANSWER
// ==========================================

function formatAnswer(answer) {

    if (!answer) {

        return `
            <p>
                ❌ AI did not return an answer.
            </p>
        `;

    }


    return escapeHTML(answer)
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

}


// ==========================================
// SAFE HTML
// ==========================================

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// PRACTICE MODE
// ==========================================
//
// Practice functions are kept separate from
// the normal Study AI system.
// They will be connected after the main
// Study AI is confirmed working.
// ==========================================

const startPracticeBtn =
    document.getElementById("startPracticeBtn");

const practiceChapter =
    document.getElementById("practiceChapter");

const practicePanel =
    document.getElementById("practicePanel");


// Open Practice section

function openPractice() {

    if (!practicePanel) {
        return;
    }

    practicePanel.classList.remove("hidden");

    practicePanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// Start Practice button is intentionally
// not connected yet.
//
// First we restore the original Study AI
// system completely. Then Practice will be
// connected safely without breaking it.
```
