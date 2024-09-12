import './Calendar.css'
import { WEEKDAYS, TIMES } from './Constants';

export default function Calendar({showMore}: {showMore: boolean}) {

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
			</div>
		</>
	)
}
