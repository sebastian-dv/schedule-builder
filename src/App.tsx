import './App.css'
import Calendar from './Calendar'
import leganesData from '../public/leganes-data.json' 
import SearchBar from './SearchBar'
console.log(leganesData)

function App() {

  return (
    <>
      <SearchBar />
			<div>schedule builder</div>
			<Calendar showMore={false} />
    </>
  )
}

export default App
