import './Calendar.css'
import { WEEKDAYS, TIMES } from './Constants';
import { useEffect, useState } from 'react';
import Course from './Course'

export default function Calendar({showMore, addedCourses}: {showMore: boolean, addedCourses:any}) {

	let [unclean, setUnclean] = useState<any>([{}]);
	let [courses, setCourses] = useState<any>([{}])

	useEffect( () => {
		let test1 = [{day: "Vie", startTime: "11:30",endTime: "15:00"}, {day: "Lun", startTime: "09:30",endTime: "12:00"}]
		
		setUnclean(addedCourses);
	}, [addedCourses]);

	useEffect( () => {
		console.log("cleaning")
		if(unclean) {
			setCourses(cleanSched(unclean))
		}
	}, [unclean]);


	const cleanSched = (sched:any) => {
		sched.flat().map((course:any) => {
			if(course && course.day && course["start-time"] && course['end-time']) {
				course['day'] = course['day'].toLowerCase();
				let startTime = course['start-time'].replace(':','');
				course['start-time'] = '_'.concat(startTime);
		   
			   let endTime = course['end-time'].replace(':','');
			   course['end-time'] = '_'.concat(endTime);
			}

			else {
				console.log("Tried to access invalid data while cleaning")
			}

		})

		return sched;
		}

	return (
		<>
			<div className={'calendar ' + (showMore ? 'large-calendar' : 'small-calendar')} >
				{

					WEEKDAYS.map((weekday) => (
						<div className={weekday.class} key={weekday.day} >
							{weekday.day}
						</div>
					))
				}
				{
					showMore ?
						TIMES.map((time, index) => (
							<div className={`size ${time.class}`} key={index} >
								{time.time}
							</div>
						)) 
					:
						TIMES.slice(0, 13).map((time, index) => (
							<div className={`size ${time.class}`} key={index} >
								{time.time}
							</div>
						))
				}
				{console.log(courses)}
				{
					courses.flat().map((c: any, index: number) => (
						<Course 
						  key={index} 
						  day={c.day} 
						  startTime={c["start-time"]} 
						  endTime={c["end-time"]} 
						/>
					  ))

					/*
					courses.map((course:any) => {

						course.map((d:any) => (
							<Course key={d.startTime} day={d.day} startTime={d.startTime} endTime={d.endTime} />
						))
					})
					*/
					

					
				}
			</div>
		</>
	)
}
