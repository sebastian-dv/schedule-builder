import { useState } from 'react'
import './App.css'
import Calendar from './Calendar'
import SearchBar from './SearchBar'

function App() {

  const [wantedClasses, setWantedClasses] = useState([]);

  return (
    <>
      <SearchBar addedCourses={setWantedClasses}/>
			<div></div>
			<br />
			<Calendar showMore={true} addedCourses={wantedClasses}/>
    </>
  )
}

export default App
