import { useEffect, useState } from "react";

export default function QuestionTimer ({timeout , onTimeOut}) {
    const [remainingTime, setRemaningTime] = useState(timeout)
    useEffect(() => {setTimeout(onTimeOut,timeout)},[timeout,onTimeOut])
    useEffect(() => {
        setInterval(() => {
            setRemaningTime(prevTime => prevTime-10)
        },10)},[]
    )
    return <progress id="question-time" max={timeout} value={remainingTime} />
}