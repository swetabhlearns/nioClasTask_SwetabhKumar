import { MathJaxContext, MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import "./main.css";

const Main = () => {
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ];
  const fetchNextQuestion = () => {
    if (questionIndex < questions.length - 1)
      setQuestionIndex(questionIndex + 1);
    else {
      setQuestionIndex(0);
    }
  };
  const fetchPrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      setQuestionIndex(questions.length - 1);
    }
  };
  useEffect(() => {
    fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questions[questionIndex]}`
    )
      .then((res) => res.json())
      .then((data) => setQuestion(data[0].Question))
      .catch((err) => console.log(err));
  }, [fetchNextQuestion, fetchPrevQuestion]);

  //Fetch Question

  //Fetch Next Question

  return (
    <div className="main">
      <div className="main__elements">
        <MathJaxContext>
          {" "}
          <MathJax>{question}</MathJax>{" "}
        </MathJaxContext>
      </div>

      {question ? (
        <div>
          <button onClick={fetchPrevQuestion}>Prev</button>
          <button onClick={fetchNextQuestion}>Next</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Main;
