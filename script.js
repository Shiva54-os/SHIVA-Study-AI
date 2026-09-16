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


    // Loading message
    resultSection.classList.remove("hidden");

    result.innerHTML = `
        <h2>⚡ Preparing your study content...</h2>
        <p>
            Your request:
            <b>${request}</b>
        </p>
    `;


    // Temporary response
    setTimeout(() => {

        result.innerHTML = `
            <h2>📚 Study AI</h2>

            <p>
                Your request has been received successfully.
            </p>

            <p>
                <b>Topic:</b> ${request}
            </p>

            <p>
                🤖 AI generation will be connected in the next step.
            </p>
        `;

    }, 1000);

}
