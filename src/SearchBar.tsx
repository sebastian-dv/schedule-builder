import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { GETAFE_DATA, LEGANES_DATA } from "./Constants";
import Results from "./Results";
import "./SearchBar.css"; 

export default function SearchBar({addedCourses} : {addedCourses:any}) {
  const [data, setData] = useState<any>({});
  const [input, setInput] = useState<string>("");
  const [classes, setClasses] = useState<any>();
  const [resultsActive, setResultsActive] = useState<boolean>(false);
  const [searchBy, setSearchBy] = useState<string>("class");
  const [searchResult, setSearchResult] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //const [addedCourses, setAddedCourses] = useState<any>();

  // Passed to Results component, so when course is added, this runs and addedCourses is updated
  const resultsData = (results: any) => {
    console.log(results);
    addedCourses((prev: any) => {
        const exists = prev.some((course:any) => course.code === results.code);
        
        if (exists) {
            return prev.filter((course:any) => course.code !== results.code); // Remove course
        } else {
            return [...prev, results]; // Add course
        }
    });
};

  const searchParam = [
    { value: "class", label: "Class" },
    { value: "code", label: "Code" },
    { value: "major", label: "Major" },
  ];

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target) setInput(target.value);
  };

  const getClasses = () => {
    const classList = [];
    for (const campusKey in data) {
      const campus = data[campusKey];
      for (const majorKey in campus) {
        const major = campus[majorKey];
        for (const classCode in major) {
          const course = major[classCode];
		  classList.push(course);
          //console.log("Length:");
        }
      }
    }
		return classList;
  };

	const removeAccents = (str: string) => {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    if (input.trim() !== "") {
      setIsLoading(true);
      setResultsActive(true);
      console.log("attempt search");
      setTimeout(() => {
        switch (searchBy) {

          case "class": {

            setSearchResult(searchClass());
            break;
          }
          case "code": {
            setSearchResult(searchCode());
            break;
          }
          case "major": {
            setSearchResult(searchMajor());
            break;
          }
        }
        setIsLoading(false);
      }, 300); // Small delay for loading state to be visible
    } else {
      console.log("no input");
    }
  };

  const searchClass = () => {
		console.log('Input: ' + input);
    console.log("search by class");
		const result = [];
		for (var i = 0; i < classes.length; i++) {
			let title = removeAccents(classes[i]['title']).toLowerCase();
			if (title.indexOf(input) != -1) {
				result.push(classes[i]);
			}
		}
    console.log(result);
    return result;
  };
  

  const searchCode = () => {
    console.log("search by code");
		const result = [];
		for (var i = 0; i < classes.length; i++) {
			let code = classes[i]['code'];
			if (code.indexOf(input) != -1) {
				result.push(classes[i]);
			}
		}
    console.log(result);
    return result;
  };

  const searchMajor = () => {
    console.log("search by major");
    console.log('Input: ' + input);
    const result = [];
    for(const campusKey in data) {
        const campus = data[campusKey];
        for (const majorKey in campus) {
            let majorName = removeAccents(majorKey).toLowerCase();
            if(majorName.indexOf(input) != -1) {
                const courses = campus[majorKey];
                const major = {title:majorKey,courses: courses};
                result.push(major);
            }
        }
    }

    console.log(result);
    return result;

  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .all([axios.get(GETAFE_DATA), axios.get(LEGANES_DATA)])
      .then(
        axios.spread((getafe, leganes) => {
          setData({
            getafe: getafe.data,
            leganes: leganes.data,
          });
          setIsLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // getClasses and set them once above useEffect has setData
    if (Object.keys(data).length > 0) {
      setClasses(getClasses());
    }
  }, [data]);

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Course Search</h2>
        <p>Find and add courses to your schedule</p>
      </div>

      <div className="search-options">
        <div className="search-by-container">
          <span className="search-label">Search By:</span>
          <div className="search-radio-group">
            {searchParam.map((search) => (
              <div className="search-radio-option" key={search.value}>
                <input
                  id={`search-${search.value}`}
                  name="search"
                  type="radio"
                  value={search.value}
                  checked={searchBy === search.value}
                  onChange={(e) => setSearchBy(e.target.value)}
                />
                <label htmlFor={`search-${search.value}`}>{search.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="search-input-container">
          <input
            className="search-input"
            onChange={inputHandler}
            value={input}
            placeholder={`Search by ${searchBy}...`}
            type="text"
            onKeyPress={handleKeyPress}
          />
          <button 
            className="search-button" 
            onClick={search}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <div className="search-results">
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading courses...</p>
          </div>
        ) : (
          <Results 
            classes={searchResult} 
            addedCourses={resultsData} 
            isActive={resultsActive}
          />
        )}
      </div>
    </div>
  );
}
