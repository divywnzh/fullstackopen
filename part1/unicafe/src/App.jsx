import { useState } from 'react'

const ShowStats=({type,value,feedbackSent}) => {

  if (feedbackSent){
    return (
      <table>
        <tr> 
          <td>{type}</td>
          <td>{value}</td>
        </tr>
      </table>
    )
  }

}

const Button=({type,submit}) => {
  const text = type === 'g' ? 'good' : type === 'n' ? 'neutral' : 'bad';
  return (
    <button onClick={() => submit({type})}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackSent, setFeedbackSent] = useState(0)
  
  const submit = ({type}) => {
    setFeedbackSent(1)
    if (type === 'g') {
      const newGood=good+1
      setGood(newGood);
      console.log("good",newGood)
    } else if (type === 'n') {
      const newNeutral=neutral+1
      setNeutral(newNeutral);
      console.log("neutral",newNeutral)
    } else if (type === 'b') {
      const newBad=bad+1
      setBad(newBad);
      console.log("bad",newBad)
    }
  };

  console.log("total", good+neutral+bad)

  const total=(good + neutral +bad)
  const average = (good*1 + neutral*0 +bad*(-1))/total
  const positive = good*100/total

  return (
    <>
      <h1>
        give feedback
      </h1>
      
      <Button type={"g"} submit={submit} />
      <Button type={"n"} submit={submit} />
      <Button type={"b"} submit={submit} />

      <h1>statistics</h1>
      {!feedbackSent ? (<p>No feedback given</p>):(
      <>
        <ShowStats type={"good"} value={good} feedbackSent={feedbackSent} />
        <ShowStats type={"neutral"} value={neutral} feedbackSent={feedbackSent} />
        <ShowStats type={"bad"} value={bad} feedbackSent={feedbackSent} />
        <ShowStats type={"average"} value={average} feedbackSent={feedbackSent} />
        <ShowStats type={"positive"} value={positive} feedbackSent={feedbackSent} />
      </>
      )}
    </>
  )
}

export default App