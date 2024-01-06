import { useState } from "react";
import Question from "../assets/question";
import COMPLETEDLOGO from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const CurrentlyActiveQuestion = userAnswers.length;
 
  const isCompleted = CurrentlyActiveQuestion === Question.length;
  function handleAnswerClick(selectedAnswer) {
    setUserAnswers((prev) => {
      return [...prev, selectedAnswer];
    });
  }
  if(isCompleted){
    return(
        <div id="summary">
            
            <img src={COMPLETEDLOGO} alt="completed "/>
            <h2>QUIZ COMPLETED!</h2>
        </div>
    )

  }
  const shuffledAnswers = [...Question[CurrentlyActiveQuestion].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id="quiz">
      <div id="question">
      <QuestionTimer timeout={10000} onTimeOut={() => {handleAnswerClick(null)}}/>
        <h2>{Question[CurrentlyActiveQuestion].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleAnswerClick(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
