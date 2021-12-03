import React from 'react'
import Loading from './Loading';

import '../styles/formButton.css'

export default function FormButton(props) {
    const status = props.status
    const defaultText = props.children
    const doneText = props.doneText

    return (
        <button className="input-submit" disabled={status === 'loading' ? true : false}>
            <div className="state-container" style={{ animation : (status === 'loading' ? 'show-loading' : status === 'done' ? 'show-done' : '') + ' .5s forwards' }}>
                <span>{defaultText}</span>
                <span><Loading /></span>
                <span>
                    <svg className="success-anim" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="12" cy="12" r="8" strokeWidth="1.5"/><path strokeLinecap="round" strokeWidth="1.5" d="M9.215 12.052l1.822 1.805 3.748-3.714" strokeDashoffset="100" strokeDasharray="100"/></svg>                                      
                    {doneText}
                </span>
            </div>
        </button>
    )
}
