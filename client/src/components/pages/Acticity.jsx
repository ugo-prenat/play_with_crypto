import { useEffect, useState } from "react"

import '../../styles/activity.css'
import ActivityCard from "../activityPage/ActivityCard"

export default function Activity() {
    const [activityList, setActivityList] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const userId = 1

    useEffect(() => {
        fetch(`/api/users/${userId}/activity`)
        .then(res => res.json())
        .then(data => {
            setActivityList(data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) { return <div className="loading-container"><p>Chargement de l'activité...</p></div> }

    return (
        <div className="component activity-component">
            <div className="activity-list">
                {activityList.map((activity, index) => {
                    return <div className="activity" key={index} >
                        <div className="activity-left-part">
                            <p className="hour">{getHour(activity.date)}</p>
                            <div className="icons">
                                <img src={activity.from.icon} alt={activity.from.symbol + '-icon'} />
                                <img src={activity.to.icon} alt={activity.to.symbol + '-icon'} />
                            </div>
                        </div>
                        <ActivityCard data={activity}/>
                    </div>
                })}
            </div>
        </div>
    )
}

function getHour(d) {
    const date = new Date(d)

    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    return `${hours}:${minutes}`
}