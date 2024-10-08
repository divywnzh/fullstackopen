import { useState } from 'react'

const Button=({handleNext,text}) => {
  return (
    <button onClick={() => handleNext()}>
      {text}
    </button>
  )
}

const MostVoted=(votes)=>{
  const [index, setIndex] = useState(0);
  for(let i=0;i<votes.length;i++){
    if(votes[i]>votes[index]){
      setIndex(i)
    }
  }
  return index
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length)); 
  console.log("selected", selected)

  const handleNext =()=>{
    const next=Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const handleVote=()=>{
    const copy=[...votes]
    copy[selected]+=1
    setVotes(copy)
  }

  const mostVoted=MostVoted(votes)

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} has {votes[selected]} votes</p>
      <Button handleNext={handleNext} text="Next anecdote"/>
      <Button handleNext={handleVote} text="Vote"/>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostVoted]} has {votes[mostVoted]} votes</p>
    </>
  )
}

export default App