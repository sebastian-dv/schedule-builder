import './Calendar.css'
import { WEEKDAYS, TIMES } from './Constants';
import { useEffect, useState } from 'react';
import Course from './Course'

export default function Calendar({showMore}: {showMore: boolean}) {

	let [unclean, setUnclean] = useState<any>([{}]);
	let [courses, setCourses] = useState<any>([{}])

	useEffect( () => {
		let test1 = [{day: "Vie", startTime: "11:30",endTime: "15:00"}, {day: "Lun", startTime: "09:30",endTime: "12:00"}]

		setUnclean(test1);

		
	}, []);

	useEffect( () => {
		console.log("cleaning")
		setCourses(cleanSched(unclean))
	}, [unclean]);


	const cleanSched = (sched:any) => {
		sched.map((course:any) => {
			if(course && course.day && course.startTime && course.endTime) {
				course['day'] = course['day'].toLowerCase();
				let startTime = course['startTime'].replace(':','');
				course['startTime'] = '_'.concat(startTime);
		   
			   let endTime = course['endTime'].replace(':','');
			   course['endTime'] = '_'.concat(endTime);
			}

			else {
				console.log("Tried to access invalud data while cleaning")
			}

		})

		return sched;
		}

	return (
		<>
			<div className={'calendar ' + (showMore ? 'large-calendar' : 'small-calendar')} >
				{

					WEEKDAYS.map((weekday) => (
						<>
							<div className={weekday.class} >
								{weekday.day}
							</div>
						</>
					))
				}
				{
					showMore ?
						TIMES.map((time) => (
							<div className={`size ${time.class}`} >
								{time.time}
							</div>
						)) 
					:
						TIMES.slice(0, 13).map((time) => (
							<div className={`size ${time.class}`} >
								{time.time}
							</div>
						))
				}
				{
					courses.map((c:any) => {
						console.log("mapping");
						console.log(c);
						return <Course day={c.day} startTime={c.startTime} endTime={c.endTime}/>
					})
					
				}
			</div>
		</>
	)
}
