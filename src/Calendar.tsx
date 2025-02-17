import './Calendar.css'
import { WEEKDAYS, TIMES } from './Constants';
import { useEffect, useState } from 'react';
import Course from './Course'

export default function Calendar({showMore, addedCourses}: {showMore: boolean, addedCourses:any}) {

	let [unclean, setUnclean] = useState<any>([]);
	let [courses, setCourses] = useState<any>([])

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


	useEffect( () => {
		console.log("Updated course list: ", courses);
	}, [courses]);


	const cleanSched = (sched:any) => {
		console.log("Before: ", sched);
		return sched.flat().map((course:any) => {
			Object.values(course).map( (lecture:any) => {
				if(lecture && lecture.day && lecture["start-time"] && lecture['end-time']) {
					if(!lecture['start-time'].includes('_') && !lecture['end-time'].includes('_')){ // only clean if data is unclean; ie. lecture hasn't been added before
						lecture['day'] = lecture['day'].toLowerCase();
						let startTime = lecture['start-time'].replace(':','');
						lecture['start-time'] = '_'.concat(startTime);
				   
					   let endTime = lecture['end-time'].replace(':','');
					   lecture['end-time'] = '_'.concat(endTime);
					}
				}
				else {
					console.log("Tried to access invalid data while cleaning")
				}
	
				console.log("After: ", course)
			});
			return course;
			
		})
	}

	return (
        <div className={'calendar ' + (showMore ? 'large-calendar' : 'small-calendar')}>
            {WEEKDAYS.map((weekday) => (
                <div className={weekday.class} key={weekday.day}>
                    {weekday.day}
                </div>
            ))}

            {showMore
                ? TIMES.map((time, index) => (
                      <div className={`size ${time.class}`} key={index}>
                          {time.time}
                      </div>
                  ))
                : TIMES.slice(0, 13).map((time, index) => (
                      <div className={`size ${time.class}`} key={index}>
                          {time.time}
                      </div>
                  ))}

		{
			courses.flat().map((courseDay: any, courseIndex: number) => 
				Object.entries(courseDay).map(([key, lecture]: [string, any], lectureIndex: number) => {
					console.log("Rendering lecture:", typeof lecture); // Debugging log

					if(typeof lecture != "object") { // key
						return;
					}

					return (
						<Course 
							key={lecture['code']} 
							day={lecture.day} 
							startTime={lecture["start-time"]} 
							endTime={lecture["end-time"]} 
						/>
					);
				})
			)
		}
                
        
        </div>
    );
}
