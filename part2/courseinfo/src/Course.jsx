const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({ part }) => {
  return <li>{part.name} {part.exercises}</li>
}
const Content = ({ parts }) => {
  console.log(parts.map(part => part.name))
  return (
    <ul>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </ul>
  )
}

const Total = ({ parts }) => {
  console.log(parts.map(part => part.exercises))
  return <p>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</p>

}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course["name"]} />
      <Content parts={course["parts"]} />
      <Total parts={course["parts"]} />
    </>
  )
}

export default Course