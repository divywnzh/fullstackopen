const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({part}) => {
  return <li>{part.name} {part.exercises}</li>
}
const Content = ({part}) => {
  console.log(part)
  return (
    <ul>
    {part.map(part=> <Part key={part.id} part={part} />)}
    </ul>
  )
}

const Course=({course})=>{
  return(
    <>
      <Header course={course["name"]} />
      <Content part={course["parts"]}/>
    </>
  )
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