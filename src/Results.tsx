import { useState } from "react";

export default function Results({classes, addedCourses, isActive} : {classes:any, addedCourses:any, isActive:boolean}) {

	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
	const [added, setAdded] = useState<{ [key: string]: boolean}>({});

	const toggleExpand = (index: number) => {
		setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
	}

	const toggleAdded = (course: any, section: any, groupNumber : any) => {
		const courseKey = `${course.code}-${groupNumber}`;
		const courseTitle = course.title;
		const sectionProf = section.professor;
		const sectionLang = section.language;

		const schedule = {...section.schedule, code: courseKey, title: courseTitle, prof: sectionProf, lang: sectionLang};

        setAdded((prevAdded) => ({
            ...prevAdded,
            [courseKey]: !prevAdded[courseKey], // Toggle based on previous state
        }));

		addedCourses(schedule);
	}
  
	// Helper function to format time (e.g., "09:30" from "0930")
	const formatTime = (time: string) => {
		if (!time) return "";
		// Remove underscore if present and format as HH:MM
		const cleanTime = time.replace("_", "");
		return cleanTime.slice(0, 2) + ":" + cleanTime.slice(2);
	}

	// Helper function to get the day name
	const getDayName = (day: string) => {
		const dayMap: {[key: string]: string} = {
			"lun": "Monday",
			"mar": "Tuesday", 
			"mie": "Wednesday",
			"jue": "Thursday",
			"vie": "Friday"
		};
		return dayMap[day.toLowerCase()] || day;
	}
    
    // Helper function to format weeks
    const formatWeeks = (weeks: string | string[] | undefined) => {
        if (!weeks) return "All weeks";
        
        if (typeof weeks === 'string') {
            return `Week ${weeks}`;
        }
        
        if (Array.isArray(weeks)) {
            if (weeks.length === 0) return "All weeks";
            return `Weeks ${weeks.join(', ')}`;
        }
        
        return "All weeks";
    }

	return (
		<div className="results-container">
			{isActive && classes && classes.length > 0 ? (
				classes.map((course: any, index: number) => (
					<table key={index} className="course-table">
						<tbody>
							<tr className="course-row">
								<td className="expand-btn" >
									<button 
                                        onClick={() => toggleExpand(index)}
                                        aria-label={expanded[index] ? "Collapse course details" : "Expand course details"}
                                    >
										{expanded[index] ? "▼" : "▶"}
									</button>
								</td>
								<td className="course-code">{course.code}</td>
								<td className="course-title">{course.title}</td>
								<td className="course-credits" style={{color: '#555'}}>{course.credits} Credits</td>
							</tr>

							{expanded[index] && course.groups && (
								<tr className="group-details">
									<td colSpan={6}>
                                        <div className="group-table-container">
										    <table className="group-table">
											    <thead>
												    <tr>
													    <th className="group-header">Group</th>
													    <th className="group-header">Professor</th>
													    <th className="group-header">Language</th>
														<th className="group-header">Weeks</th>
													    <th className="group-header">Schedule</th>
													    <th className="group-header">Room</th>
												    </tr>
											    </thead>
											    <tbody>
												    {Object.keys(course.groups).map((groupName: string, groupIndex: number) => {
													    const groupNumber = groupName.replace("Grupo ", "");
													    const section = course.groups[groupName];
													    const schedule = section.schedule || {};
                                                        
													    // If schedule is an array, handle multiple meeting times
													    const scheduleItems = Array.isArray(schedule) ? schedule : [schedule];

                                                        // Check if we need a divider (more than 2 groups and not the last one)
                                                        const needsDivider = Object.keys(course.groups).length > 2 && 
                                                                         groupIndex < Object.keys(course.groups).length - 1;

													    return (
                                                            <>
														    <tr key={groupIndex} className="group-row">
															    <td className="group-number">{groupNumber}</td>
															    <td className="group-professor">{section.professor}</td>
															    <td className="group-language">{section.language}</td>
																<td className="group-weeks">
																	{scheduleItems.map((item: any, scheduleIndex: number) => (
																		<div key={scheduleIndex}>
																			{formatWeeks(item.weeks)}
																			{scheduleIndex < scheduleItems.length - 1 && <hr className="schedule-divider" />}
																		</div>
																	))}
																</td>
															    <td className="group-schedule">
																    {scheduleItems.map((item: any, scheduleIndex: number) => (
																	    <div key={scheduleIndex} className="schedule-item">
																		    {item.day && (
																			    <span className="schedule-day">{getDayName(item.day)}</span>
																		    )}
																		    {item["start-time"] && item["end-time"] && (
																			    <span className="schedule-time">
																				    {formatTime(item["start-time"])} - {formatTime(item["end-time"])}
																			    </span>
																		    )}
																		    {scheduleIndex < scheduleItems.length - 1 && <hr className="schedule-divider" />}
																	    </div>
																    ))}
															    </td>
															    <td className="group-room">
																    {scheduleItems.map((item: any, scheduleIndex: number) => (
																	    <div key={scheduleIndex}>
																		    {item.room || "TBD"}
																		    {scheduleIndex < scheduleItems.length - 1 && <hr className="schedule-divider" />}
																	    </div>
																    ))}
															    </td>
															    <td className="add-btn">
																    <button
																	    className={added[course.code + "-" + groupNumber] ? "remove" : "add"}
																	    onClick={() => toggleAdded(course, section, groupNumber)}
																    >
																	    {added[course.code + "-" + groupNumber] ? "Remove" : "Add"}
																    </button>
															    </td>
														    </tr>
                                                            {/* Add group divider if needed */}
                                                            {needsDivider && (
                                                                <tr className="group-divider-row">
                                                                    <td colSpan={6}>
                                                                        <hr className="group-divider" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            </>
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
