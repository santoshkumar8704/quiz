import { useState } from "react";
import Question from "../assets/question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const CurrentlyActiveQuestion = userAnswers.length;
  function handleAnswerClick(selectedAnswer) {
    setUserAnswers((prev) => {
      return [...prev, selectedAnswer];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{Question[CurrentlyActiveQuestion].text}</h2>
        <ul id="answers">
          {Question[CurrentlyActiveQuestion].answers.map((answer) => (
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
