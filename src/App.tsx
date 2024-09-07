import './App.css'
import Calendar from './Calendar'
import SearchBar from './SearchBar'

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
