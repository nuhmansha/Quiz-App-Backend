const express = require("express");
const Question = require("../model/questionSchema");
const router = express.Router();

router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find({}, "-correctAnswer");
    res.json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch questions", details: error.message });
  }
});

router.post("/submit", async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;
    console.log(questionId, selectedAnswer, "goooooooooooooooooooo");

    // if (!questionId || !selectedAnswer) {
    //   return res.status(400).json({ error: 'Missing questionId or selectedAnswer' });
    // }

    // / Check if questionId and selectedAnswer are explicitly undefined or null
    if (
      questionId === undefined ||
      selectedAnswer === undefined ||
      selectedAnswer === null
    ) {
      return res
        .status(400)
        .json({ error: "Missing questionId or selectedAnswer" });
    }

    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the selected answer is correct
    const isCorrect = question.correctAnswer === selectedAnswer;

    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error submitting the answer", details: error.message });
  }
});

module.exports = router;
