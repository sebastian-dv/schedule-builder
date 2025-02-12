import { useState } from "react";

export default function Results({classes, addedCourses, isActive} : {classes:any, addedCourses:any, isActive:boolean}) {

	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
	const [added, setAdded] = useState<{ [key: string]: boolean}>({});

	const toggleExpand = (code: string) => {
		setExpanded((prev) => ({ ...prev, [code]: !prev[code] }));
	}

	const toggleAdded = (courseCode: string, section: any, groupNumber : any) => {

		const courseKey = `${courseCode}-${groupNumber}`;

		const schedule = {...section.schedule, code: courseKey}

        setAdded((prevAdded) => ({
            ...prevAdded,
            [courseKey]: !prevAdded[courseKey], // Toggle based on previous state
        }));

		addedCourses(schedule);
	}

	return (
		<>
		<div>
			{isActive && (
				classes.map((course:any) => (
					<table>
					<tbody>
					<tr className={course.code}>
						<td>
							<button onClick={() => toggleExpand(course.code)}>
								{expanded[course.code] ? "▼" : "▶"}
							</button>
                        </td>
						<td>{course.code}</td>
						<td>{course.title}</td>
						<td>{course.credits}</td>
					</tr>

					{expanded[course.code] && course.groups && (
					<tr>
						<td colSpan={5}>
							<table>
								<tbody>
									{Object.keys(course.groups).map((groupName : string, index : any) => {
										
										const groupNumber = groupName.replace("Grupo ", ""); // Extract the number
										const section = course.groups[groupName];
										return (
											<tr key={index}>
												<td>{groupNumber}</td>
												<td>{section.language}</td>
												<td>{section.professor}</td>
												<td>
													<button onClick={() => toggleAdded(course.code, section, groupNumber)}>
														{added[course.code + "-" + groupNumber] ? "Remove" : "Add"}
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</td>
					</tr>
					)}
					</tbody>
				</table>
				))
			)}

		</div>
		</>
	)
}




