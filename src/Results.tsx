
export default function Results({classes, isActive} : {classes:any, isActive:boolean}) {
	console.log(classes);
	return (
		<>
		<div>
			{isActive ? (
				<p>Results displayed here</p>
			) : (
				<p>No</p>
			)}

		</div>
		</>
	)
}
