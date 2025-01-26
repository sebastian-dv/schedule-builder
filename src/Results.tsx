
export default function Results({classes, addedCourses, isActive} : {classes:any, addedCourses:any, isActive:boolean}) {

	return (
		<>
		<div>
			{isActive ? (
				classes.map((course:any) => (
					<tr className={course.code}>
						<td>{course.code}</td>
						<td>{course.title}</td>
						<td>{course.credits}</td>
						<td><button onClick={() => addedCourses(course)}>Add</button></td>
					</tr>
				))
			) : (
					<p>No</p>
				)}

		</div>
		</>
	)
}
