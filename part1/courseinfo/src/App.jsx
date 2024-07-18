const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises}</p>
}
const Content = (props) => {
  return (
    <>
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
    </>
  )
}

const Total = (props) => {
  console.log(props.exercises)
  let total = 0
  for (let i = 0; i < props.exercises.length; i++) {
    total += props.exercises[i].exercises
  }
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content part={[part1, part2, part3]} />
      <Total exercises={[part1, part2, part3]} />
    </>
  )
}

export default App