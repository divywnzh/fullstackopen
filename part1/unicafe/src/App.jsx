import { useState } from 'react'

const StatisticLine=({type,value})=>{
  return(
    <tr> 
      <td>{type}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics=({good,neutral,bad}) => {

  const total=(good + neutral +bad)
  const average = (good*1 + neutral*0 +bad*(-1))/total
  const positive = good*100/total

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <table>
      <tbody>
        <StatisticLine type="good" value={good} />
        <StatisticLine type="neutral" value={neutral} />
        <StatisticLine type="bad" value={bad} />
        <StatisticLine type="average" value={average} />
        <StatisticLine type="positive" value={positive} />
      </tbody>
    </table>
  )
  

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

  return (
    <>
      <h1>give feedback</h1>
      
      <Button type={"g"} submit={submit} />
      <Button type={"n"} submit={submit} />
      <Button type={"b"} submit={submit} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    
    </>
  )
}

export default App