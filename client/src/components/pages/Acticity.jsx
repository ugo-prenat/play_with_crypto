import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { AUTH_HEADERS } from '../../authHeaders'

import '../../styles/activity.css'
import ActivityCard from "../activityPage/ActivityCard"

import { BACKEND_URL as URL } from '../../constants/constants';

export default function Activity() {
    const [activityList, setActivityList] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const userId = localStorage.getItem('userId')
    let history = useHistory()

    useEffect(() => {
        fetch(`${URL}/api/users/${userId}/activity`, { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(data => {
            if (data.code) history.push('/login')
            else {
                setActivityList(data)
                setIsLoading(false)
            }
        })
        // eslint-disable-next-line
    }, [])

    if (isLoading) { return <div className="loading-container"><p>Chargement de l'activité...</p></div> }
    if (!isLoading && activityList.length === 0) { return <div className="loading-container"><p>Aucune activité détectée</p></div> }

    return (
        <div className="component activity-component">
            <div className="activity-list">
                {activityList.slice(0).reverse().map((activityParent, indexParent) => {
                    return <div key={indexParent}>
                        <p className="date">{getDate(activityParent.date)}</p>
                        {activityParent.list.slice(0).reverse().map((activity, index) => {
                            return <div className="activity" key={index}>
                                <div className="activity-left-part">
                                    <span className="vertical-bar"></span>
                                    <p className="hour">{getHour(activity.date)}</p>
                                </div>
                                <ActivityCard data={activity}/>
                            </div>
                        })}
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
function getDate(d) {
    const date = new Date(d)
    const months = [ 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre' ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}