import { useState } from 'react'
import './App.css'
import Calendar from './Calendar'
import leganesData from '../public/leganes-data.json' 
console.log(leganesData)

function App() {

  const [wantedClasses, setWantedClasses] = useState();

  return (
    <>
			<div>schedule builder</div>
			<Calendar showMore={false} />
    </>
  )
}

export default App
