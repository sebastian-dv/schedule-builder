import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { GETAFE_DATA, LEGANES_DATA } from "./Constants";

export default function SearchBar() {
	const [data, setData] = useState<any>();
	const [input, setInput] = useState<string>("");
    const [classes, setClasses] = useState<any>([]);

	const [searchBy, setSearchBy] = useState<string>('class');
	const searchParam = [
		{value: 'class', label: 'Class'},
		{value: 'code', label: 'Code'},
		{value: 'major', label: 'Major'}
	]

	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		if (target) setInput(target.value);
	};

    const getClasses = () => {
        for(const campusKey in data) {
            const campus = data[campusKey];
            for(const majorKey in campus) {
                const major = campus[majorKey];
                for (const classCode in major) {
                    const course = major[classCode];
                    setClasses(classes + course);
                }
            }
        }
    }

	const search = () => {
		if (input.trim() !== '') {
			console.log('attempt search');
			switch(searchBy) {
				case 'class': {
					return searchClass();
				}
				case 'code': {
					return searchCode();
				}
				case 'major': {
					return searchMajor();
				}
			}
		} else {
			console.log('no input');
		}
	}

	const searchClass = () => {
		console.log('search by class');
        const result = classes.filter( (course:any) => {
            if(course["title"].indexOf(input)) {
                console.log(course["title"]);
                return true;
            }
            console.log("Not Found");
            console.log(course["title"]);
        });

        console.log(result);
        return result;
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
			setData({
					'getafe': getafe.data,
					'leganes': leganes.data
				})
		}))
		.catch((err) => {
			console.log(err);
		});
        getClasses();
        console.log(classes);
	}, []);

    if(classes) {
        console.log(classes);
    }
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
