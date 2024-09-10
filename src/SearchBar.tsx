import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { GETAFE_DATA, LEGANES_DATA } from "./Constants";

export default function SearchBar() {
	const [classes, setClasses] = useState<any>();
	const [input, setInput] = useState<string>("");

	const [searchBy, setSearchBy] = useState<string>('class');
	const searchParam = [
		{value: 'class', label: 'Class'},
		{value: 'code', label: 'Code'},
		{value: 'major', label: 'Major'}
	]

	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		if (target) setInput(target.value.toLowerCase());
	};

	const search = () => {
		if (input.trim() !== '') {
			console.log('attempt search');
			switch(searchBy) {
				case 'class': {
					searchClass();
					break;
				}
				case 'code': {
					searchCode();
					break;
				}
				case 'major': {
					searchMajor();
					break;
				}
			}
		} else {
			console.log('no input');
		}
	}

	const searchClass = () => {
		console.log('search by class');
	}

	const searchCode = () => {
		console.log('search by code');
	}

	const searchMajor = () => {
		console.log('search by major');
	}

	useEffect(() => {
		axios.all([
			axios.get(GETAFE_DATA),
			axios.get(LEGANES_DATA)
		])
		.then(axios.spread((getafe, leganes) => {
			console.log(getafe.data);
			console.log(leganes.data);
			setClasses({
					'getafe': getafe.data,
					'leganes': leganes.data
				})
		}))
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
		<>
			<div >
				<div>
					<span>Search By</span>
					{
						searchParam.map((search) => (
							<div key={search.value}>
								<input 
									name="search"
									type="radio"
									value={search.value}
									checked={searchBy === search.value}
									onChange={e => setSearchBy(e.target.value)}
								/>
								<label htmlFor={search.value}> {search.label} </label>
							</div>
						))
					}
				</div>

				<br />

				<div>
					<input
						onChange={inputHandler}
						value={input}
						placeholder="Search for classes"
						type="text"
					/>
					<button onClick={search}>Search</button>
				</div>
			</div>
		</>
	);
}
