import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClassPicker from './components/ClassPicker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ClassPicker/>
  )
}

export default App
