const Header=(props)=>{
  const course = 'Half Stack application development'
  return(
    <h1>
      {props.course}
    </h1>
  )
}

const Content=(props)=>{
  return (
  <>
  <p>{props.topic1} {props.e1}</p>
  <p>{props.topic2} {props.e2}</p>
  <p>{props.topic3} {props.e3}</p>
  </>
  )
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
      <Content topic1={part1} e1={exercises1} topic2={part2} e2={exercises2} topic3={part3} e3={exercises3}/>
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
    </>
  )
}

export default App