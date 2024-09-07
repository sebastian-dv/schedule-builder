import axios from "axios";
import { useState, useEffect } from "react";

export default function SearchBar() {
	const [majors, setMajors] = useState();
	const [value, setValue] = useState<string>("");
	const [suggestions, setSuggestions] = useState<string[]>([]);

	useEffect(() => {
		axios.get("/src/data/getafe-data.json").then((major) => {
			setMajors(major.data);
			console.log(major.data);
			console.log(major.data['Doble Grado en Ciencias Políticas y Sociología']['10065']['groups']['Grupo 1']['schedule'][0]['day'])
		});
	}, []);

	return (
		<div>
		</div>
	);
}
