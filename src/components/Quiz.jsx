import { useCallback, useState } from "react";
import Question from "../assets/question";
import COMPLETEDLOGO from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const CurrentlyActiveQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const isCompleted = CurrentlyActiveQuestion === Question.length;
  const handleAnswerClick = useCallback(function handleAnswerClick(
    selectedAnswer
  ) {
    setAnswerState("answered");
    setUserAnswers((prev) => {
      return [...prev, selectedAnswer];
    });
    setTimeout(() => {
      if (selectedAnswer === Question[CurrentlyActiveQuestion].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
  },
  []);
  const handleTimeOut = useCallback(() => {
    handleAnswerClick(null);
  }, [handleAnswerClick]);
  if (isCompleted) {
    return (
      <div id="summary">
        <img src={COMPLETEDLOGO} alt="completed " />
        <h2>QUIZ COMPLETED!</h2>
      </div>
    );
  }
  const shuffledAnswers = [...Question[CurrentlyActiveQuestion].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={CurrentlyActiveQuestion}
          timeout={10000}
          onTimeOut={handleTimeOut}
        />
        <h2>{Question[CurrentlyActiveQuestion].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleAnswerClick(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
