import { useState } from "react";

export default function Results({classes, addedCourses, isActive} : {classes:any, addedCourses:any, isActive:boolean}) {

	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
	const [added, setAdded] = useState<{ [key: string]: boolean}>({});

	const toggleExpand = (code: string) => {
		setExpanded((prev) => ({ ...prev, [code]: !prev[code] }));
	}

	const toggleAdded = (course: any, section: any, groupNumber : any) => {

		console.log("aaaa: ", course);

		const courseKey = `${course.code}-${groupNumber}`;
		const courseTitle = course.title;
		const sectionProf = section.professor;
		const sectionLang = section.language;

		const schedule = {...section.schedule, code: courseKey, title: courseTitle, prof:sectionProf, lang: sectionLang};

        setAdded((prevAdded) => ({
            ...prevAdded,
            [courseKey]: !prevAdded[courseKey], // Toggle based on previous state
        }));

		addedCourses(schedule);
	}

	return (
		<div className="results-container">
			{isActive && classes && classes.length > 0 ? (
				classes.map((course: any) => (
					<table key={course.code} className="course-table">
						<tbody>
							<tr className="course-row">
								<td className="expand-btn">
									<button 
                                        onClick={() => toggleExpand(course.code)}
                                        aria-label={expanded[course.code] ? "Collapse course details" : "Expand course details"}
                                    >
										{expanded[course.code] ? "▼" : "▶"}
									</button>
								</td>
								<td className="course-code">{course.code}</td>
								<td className="course-title">{course.title}</td>
								<td className="course-credits">{course.credits} Credits</td>
							</tr>

							{expanded[course.code] && course.groups && (
								<tr className="group-details">
									<td colSpan={4}>
                                        <div className="group-table-container">
										    <table className="group-table">
											    <tbody>
												    {Object.keys(course.groups).map((groupName: string, index: any) => {
													    const groupNumber = groupName.replace("Grupo ", "");
													    const section = course.groups[groupName];

													    return (
														    <tr key={index} className="group-row">
															    <td className="group-number">{groupNumber}</td>
															    <td className="group-language">{section.language}</td>
															    <td className="group-professor">{section.professor}</td>
															    <td className="add-btn">
																    <button
																	    className={added[course.code + "-" + groupNumber] ? "remove" : "add"}
																	    onClick={() => toggleAdded(course, section, groupNumber)}
																    >
																	    {added[course.code + "-" + groupNumber] ? "Remove" : "Add"}
																    </button>
															    </td>
														    </tr>
													    );
												    })}
											    </tbody>
										    </table>
                                        </div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				))
			) : isActive ? (
                <div className="no-results">
                    <p>No courses found. Try a different search.</p>
                </div>
            ) : null}
		</div>
	);
}




