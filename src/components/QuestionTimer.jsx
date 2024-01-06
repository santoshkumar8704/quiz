import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeOut }) {
  const [remainingTime, setRemaningTime] = useState(timeout);
  useEffect(() => {
    console.log("timeout")
    const timers = setTimeout(onTimeOut, timeout);
    return () => {  clearTimeout(timers)}
       
    
  }, [timeout, onTimeOut]);
  useEffect(() => {
    console.log("timeInt")
    const interval = setInterval(() => {
      setRemaningTime((prevTime) => prevTime - 100);
      
    }, 100);
    return () => { clearInterval(interval)
    }
       
  }, []);
  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
