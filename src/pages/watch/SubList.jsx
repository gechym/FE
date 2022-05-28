import React, {useEffect, useState} from 'react'

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

const SubList = ({time, dataSub, handleChangeTime}) => {
    const [timeCurrent, setTimeCurrent] = useState(() => time) 
    useEffect(() => {
        setTimeCurrent(time)
    }, [time])

    return (
        <div className="subListContainer">
            <h1>{`${timeCurrent}`.toHHMMSS()}</h1>
            <ul>
                {
                    dataSub.map(data => {
                        return(
                            <li
                                onClick={() => {handleChangeTime(data.time[0])}}
                            >
                                <h4>{`${data.time[0]}`.toHHMMSS()} - {`${data.time[1]}`.toHHMMSS()}</h4>
                                <span>{data.sub}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SubList
