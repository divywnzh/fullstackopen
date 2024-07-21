import { useState } from 'react'

const ShowStats=({good,neutral,bad,feedbackSent}) => {
  
  const total=(good + neutral +bad)
  const average = (good*1 + neutral*0 +bad*(-1))/total
  const positivie = good*100/total

  if (feedbackSent){
    return(
      <>
        <h1>statistics</h1>
      
        <p> good {good} </p>
        <p> neutral {neutral} </p>
        <p> bad {bad} </p> 
        <p> average {average} </p>
        <p> positive {positivie} </p>
      </>
    )
  }
  
  return(
    <>
    <h1>statistics</h1>
    <p> No feedback given </p>
    </>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackSent, setFeedbackSent] = useState(0)
  
  const submit = (type) => {
    setFeedbackSent(1)
    if (type === 'g') {
      setGood(good + 1);
      console.log("good",good)
    } else if (type === 'n') {
      setNeutral(neutral + 1);
      console.log("neutral",neutral)
    } else if (type === 'b') {
      setBad(bad + 1);
      console.log("bad",bad)
    }
   
  };

  console.log("total", good+neutral+bad)

  return (
    <>
      <h1>
        give feedback
      </h1>
      <button onClick={()=>submit("g")}>{"good"}</button>
      <button onClick={()=>submit("n")}>{"neutral"}</button>
      <button onClick={()=>submit("b")}>{"bad"}</button>
      <ShowStats good={good} neutral={neutral} bad={bad} feedbackSent={feedbackSent} />
    </>
  )
}

export default App