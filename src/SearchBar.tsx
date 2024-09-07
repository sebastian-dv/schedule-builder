import axios from "axios"
import { useState, useEffect } from "react"


export default function SearchBar() {

    const [majors, setMajors] = useState<Array<object>>();
    const [value, setValue] = useState<string>();
    const [suggestions, setSuggestions] = useState<string[]>();

    axios.get("/new_getafe_data.json").then( (major) => {
        setMajors(major.data);
    });

    useEffect( () => {

        var data = 



    }, []);

    console.log(majors);
    /*
    if(majors) {
        majors.forEach( (course) => {
            console.log(course);
        })
    }
    */

    return (
        <div>
            {

            }
        </div>
    )

}