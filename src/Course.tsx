import { useEffect } from 'react';

export default function Course({day, startTime, endTime}: {day:string, startTime:string, endTime:string}) {

    useEffect( () => {
        console.log("IN course")
        console.log(startTime)
    }, [])

    const style:any = {"gridRow": startTime + ' / ' + endTime, "gridColumn": day}


	return (
		<>
			<div className={"item"} style={style} >
                test
			</div>
		</>
	)
}