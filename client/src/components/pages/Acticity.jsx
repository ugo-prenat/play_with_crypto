import { useEffect, useState } from "react"

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
        <div className="component">
            {activityList.map((activity, index) => {
                return <div className="activity" key={index}>
                    <p>{activity.from.symbol}</p>
                    <p>{activity.to.symbol}</p>
                </div>
            })}
        </div>
    )
}