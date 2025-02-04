import { useState } from 'react'
import './App.css'
import Calendar from './Calendar'
import SearchBar from './SearchBar'

function App() {

  const [wantedClasses, setWantedClasses] = useState();

  return (
    <>
      <SearchBar />
			<div></div>
			<br />
			<Calendar showMore={false} />
    </>
  )
}

export default App
