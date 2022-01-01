import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"

import FormButton from '../FormButton'

import '../../styles/issueReport.css'

import { AUTH_HEADERS } from '../../authHeaders'
import { BACKEND_URL as URL } from '../../constants/constants';

export default function IssueReport() {
    const { register, handleSubmit } = useForm({
        mode: 'onTouched'
    })
    const [buttonStatus, setButtonStatus] = useState('default')
    const [focus, setFocus] = useState('title')
    let history = useHistory()

    useEffect(() => {
        fetch(`${URL}/api/auth`, { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) history.push('/login')
        })
        // eslint-disable-next-line
    }, [])

    const onSubmit = async data => {
        setButtonStatus('loading')

        // Adding date to data
        data['date'] = new Date().toLocaleString()
        
        await fetch(`${URL}/api/issue`, {
            method: 'POST',
            headers: AUTH_HEADERS,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                setButtonStatus('done')

                setTimeout(() => {
                    setButtonStatus('default')
                }, 3000);
            }
        })
    }

    return (
        <div className="component issue-report-component">
            <form className="issue-report-form" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Signaler un bug</p>

                <div className={focus === 'title' ? 'input-group title-input-group active-input-group' : 'input-group title-input-group'} group="title">
                    <label htmlFor="title" className="input-label">Objet</label>
                    <input
                        {...register('title',
                        { required: 'Objet obligatoire' })}
                        type="text"
                        name="title"
                        className="input-field"
                        autoFocus
                        onFocus={() => setFocus('title')}
                        onBlur={() => setFocus()}
                    />
                </div>

                <div className={focus === 'message' ? 'input-group message-input-group active-input-group' : 'input-group message-input-group'} group="message">
                    <label htmlFor="message" className="input-label">Message</label>
                    <textarea
                        {...register('message',
                        { required: 'Message obligatoire' })}
                        type="text"
                        name="message"
                        className="input-field"
                        onFocus={() => setFocus('message')}
                        onBlur={() => setFocus()}
                    />
                </div>

                <FormButton status={buttonStatus} doneText="Bug signalé">Signaler</FormButton>
            </form>
        </div>
    )
}
