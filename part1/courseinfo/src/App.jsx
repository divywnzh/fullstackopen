const Header=(props)=>{
  const course = 'Half Stack application development'
  return(
    <h1>
      {props.course}
    </h1>
  )
}

const Content=(props)=>{
  return <p>{props.topic} {props.noOfExercises}</p>
}

const Total=(props)=>{
  const total = props.e1+props.e2+props.e3
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />

      <Content topic={part1} noOfExercises={exercises1} />
      <Content topic={part2} noOfExercises={exercises2} />
      <Content topic={part3} noOfExercises={exercises3} />
      
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
    </>
  )
}

export default App