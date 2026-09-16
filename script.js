// SHIVA Study AI

const input = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answerBox = document.getElementById("answer");

askButton.addEventListener("click", async () => {
    const question = input.value.trim();

    if (question === "") {
        answerBox.innerText = "Please enter a question first.";
        return;
    }

    answerBox.innerText = "Thinking...";

    try {
        const response = await fetch("/api/index.js", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (data.error) {
            answerBox.innerText = data.error;
            return;
        }

        answerBox.innerText = data.message;

    } catch (error) {
        answerBox.innerText =
            "Something went wrong. Please try again.";
    }
});
