import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Questionary ({answers,selectedAnswer,answerState,onSelectAnswer,questiontext,onSkipAnswer}) {
    return (
        <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeOut={onSkipAnswer}
        />
        <h2>{questiontext}</h2>
        <Answers
          answers={answers}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onSelectAnswer = {onSelectAnswer}
        />
      </div>
    )
}