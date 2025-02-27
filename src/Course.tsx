import { useEffect } from 'react';
import './Course.css';

export default function Course({title, professor, lang, code, day, startTime, endTime}: {title: string, professor:string, lang:string, code:string, day:string, startTime:string, endTime:string}) {
    const style: any = {
        "gridRow": startTime + ' / ' + endTime,
        "gridColumn": day
    };

    // Calculate course duration for responsive font sizing
    const getTimeValue = (timeStr: string) => {
        const cleanTime = timeStr.replace('_', '');
        return parseInt(cleanTime);
    };
    
    const startVal = getTimeValue(startTime);
    const endVal = getTimeValue(endTime);
    const duration = Math.floor((endVal - startVal) / 100); // Rough estimate of hours

    // Format the time display (removing underscore and adding colon)
    const formatTime = (timeStr: string) => {
        if (!timeStr) return "";
        const cleanTime = timeStr.replace('_', '');
        if (cleanTime.length < 4) return cleanTime;
        return cleanTime.slice(0, 2) + ':' + cleanTime.slice(2);
    };

    const displayStartTime = formatTime(startTime);
    const displayEndTime = formatTime(endTime);

    return (
        <div className={`course-item duration-${duration}`} style={style}>
            <div className="course-header">
                <span className="course-code">{code}</span>
                <span className="course-lang">{lang}</span>
            </div>
            <h3 className="course-title">{title}</h3>
            <div className="course-details">
                <div className="course-time">
                    {displayStartTime} - {displayEndTime}
                </div>
                <div className="course-professor">
                    {professor}
                </div>
            </div>
        </div>
    );
}