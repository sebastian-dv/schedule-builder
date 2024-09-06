import './Calendar.css'
import { WEEKDAYS, TIMES } from './Constants';

export default function Calendar({showMore}: {showMore: boolean}) {

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
				<hr className='hour-line' />
			</div>
		</>
	)
}
