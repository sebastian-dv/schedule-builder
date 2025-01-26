
export default function Results({classes, isActive} : {classes:any, isActive:boolean}) {
	console.log(classes);
	return (
		<>
		<div>
			{isActive ? (
				classes.map((course:any) => (
					<tr>
						<td>{course.code}</td>
						<td>{course.title}</td>
						<td>{course.credits}</td>
					</tr>
				))
			) : (
					<p>No</p>
				)}

		</div>
		</>
	)
}
