const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({part}) => {
  return <li>{part.name} {part.exercises}</li>
}
const Content = ({parts}) => {
  console.log(parts.map(part=>part.name))
  return (
    <ul>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </ul>
  )
}

const Course=({course})=>{
  return(
    <>
      <Header course={course["name"]} />
      <Content parts={course["parts"]}/>
      <Total parts={course["parts"]}/>
    </>
  )
}

const Total=({parts})=>{
  console.log(parts.map(part=>part.exercises))
  return <p>Number of exercises {parts.reduce((total,part)=>total+part.exercises,0)}</p>
  
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return  <Course course={course} />
}

export default App