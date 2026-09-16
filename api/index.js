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

        return res.status(200).json({
            success: true,
            question: question,
            message: "Your study request was received!"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Server error."
        });
    }
}
