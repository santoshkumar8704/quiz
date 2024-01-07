import { useCallback, useRef, useState } from "react";
import Question from "../assets/question";
import COMPLETEDLOGO from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Questionary from "./Questionary";

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

  return (
    <div id="quiz">
      <Questionary key={CurrentlyActiveQuestion}
        answers={Question[CurrentlyActiveQuestion].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelectAnswer = {handleAnswerClick}
        questiontext={Question[CurrentlyActiveQuestion].text}
        onSkipAnswer={handleTimeOut}
      />
    </div>
  );
}
