import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"

import FormButton from '../FormButton'

import '../../styles/issueReport.css'

import { AUTH_HEADERS } from '../../authHeaders'
import { BACKEND_URL as URL } from '../../constants/constants';

export default function IssueReport() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm({
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
                    // Reset all inputs
                    reset()
                }, 3000);
            }
        })
    }

    return (
        <div className="component issue-report-component">
            <form className="issue-report-form" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Signaler un bug</p>

                <div style={errors.title && {borderColor: 'var(--error-color)'}} className={focus === 'title' ? 'input-group title-input-group active-input-group' : 'input-group title-input-group'} group="title">
                    <label style={errors.title && {color: 'var(--error-color)'}} htmlFor="title" className="input-label">Objet</label>
                    <input
                        {...register('title',
                        { required: 'Objet obligatoire' })}
                        type="text"
                        name="title"
                        className="input-field"
                        onFocus={() => setFocus('title')}
                        onBlur={() => setFocus()}
                    />
                    {errors.title &&
                        <div className="error-msg-container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z"/></svg>
                            <p className="error-msg">{errors.title && errors.title.message}</p>
                        </div>
                    }
                </div>

                <div style={errors.message && {borderColor: 'var(--error-color)'}} className={focus === 'message' ? 'input-group message-input-group active-input-group' : 'input-group message-input-group'} group="message">
                    <label style={errors.message && {color: 'var(--error-color)'}} htmlFor="message" className="input-label">Message</label>
                    <textarea
                        {...register('message',
                        { required: 'Message obligatoire' })}
                        type="text"
                        name="message"
                        className="input-field"
                        onFocus={() => setFocus('message')}
                        onBlur={() => setFocus()}
                    />
                    {errors.message &&
                        <div className="error-msg-container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z"/></svg>
                            <p className="error-msg">{errors.message && errors.message.message}</p>
                        </div>
                    }
                </div>

                <FormButton status={buttonStatus} doneText="Bug signalé">Signaler</FormButton>
            </form>
        </div>
    )
}
