import { useEffect } from 'react';

export default function Course({day, startTime, endTime}: {day:string, startTime:string, endTime:string}) {

    useEffect( () => {
        console.log("IN course")
        console.log(day)
    }, [])

    const style:any = {"gridColumn": day, "gridRow": startTime + ' / ' + endTime}


	return (
		<>
			<div className={"item"} style={style} >
                test
			</div>
		</>
	)
}
