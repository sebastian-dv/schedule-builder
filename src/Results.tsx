import { useState } from "react";

export default function Results({classes, addedCourses, isActive} : {classes:any, addedCourses:any, isActive:boolean}) {

	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

	const toggleExpand = (code: string) => {
		setExpanded((prev) => ({ ...prev, [code]: !prev[code] }));
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
									{Object.values(course.groups).map((section: any, index: number) => (
										<tr key={index}>
											<td>{Object.keys(course.groups)[index]}</td>
											<td>{section.language}</td>
											<td>{section.professor}</td>
											<td><button onClick={() => addedCourses(section.schedule)}>Add</button></td>
										</tr>
									))}
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




