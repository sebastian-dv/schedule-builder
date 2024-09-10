import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";

export default function SearchBar() {
	const [majors, setMajors] = useState();
	const [suggestions, setSuggestions] = useState<string[]>([]);
    const [value, setValue] = useState<string>("");

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const target = e.target;

        if(target) setValue(target.value.toLowerCase());
    }

	useEffect(() => {
		axios.get("/src/data/getafe-data.json").then((major) => {
			setMajors(major.data);
			console.log(major.data);
			console.log(major.data['Doble Grado en Ciencias Políticas y Sociología']['10065']['groups']['Grupo 1']['schedule'][0]['day'])
		}).catch( (err) => {
            console.log(err);
        });
	}, []);



	return (
		<div>
            <input onChange={inputHandler} value={value} placeholder="Search for classes" type="text"/>
		</div>
	);
}
