
export default function Results({classes, addedCourses, isActive} : {classes:any, addedCourses:any, isActive:boolean}) {

	const Sections = (course:any) => {

		return (
			<table>
			<tbody>
				{(course && Object.keys(course).length > 1) ? (
					<tr>
						{Object.keys(course.groups).map((item:any, i:any) => (
							<td>{item.language}</td>
						))} 
					</tr>
				) : (
					<tr>
						<td>No</td>
					</tr>
				)}
			</tbody>
			</table>
		)
	}

	return (
		<>
		<div>
			{isActive ? (
				classes.map((course:any) => (
					<table>
					<tbody>
					<tr className={course.code}>
						<td>{course.code}</td>
						<td>{course.title}</td>
						<td>{course.credits}</td>
						<td><button onClick={() => addedCourses(course)}>Add</button></td>
						<td><Sections course={course}></Sections></td>
					</tr>
					</tbody>
					</table>
				))
			) : (
					<p>No</p>
				)}

		</div>
		</>
	)
}
