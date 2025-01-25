
export default function Results({data, isActive} : {data:string, isActive:boolean}) {

	return (
		<>
		<div>
			{isActive ? (
				<p>Results displayed here</p>
			) : (
				<p></p>
			)}

		</div>
		</>
	)
}
