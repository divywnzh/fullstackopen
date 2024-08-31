import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return(
    <div>
      <h2>button press history</h2>
      <ul>
      button press history: {props.allClicks.join(' ')}
      </ul>
    </div>
  )
}
const App = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)
  console.log(allClicks)
  console.log(left)
  console.log(right)
  console.log(total)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)

  return (
    <>
      <h1>Greetings</h1>

      <Display counter={counter}/>

      <Button onSmash={increaseByOne} text="counter++" />
      <Button onSmash={setToZero} text="zero" />
      <Button onSmash={decreaseByOne} text="counter--" />

      <button onClick={handleLeftClick}>leftClick</button>
      <button onClick={handleRightClick}>rightClick</button>

      <History allClicks={allClicks} />
            
    </>
  )
}

export default App