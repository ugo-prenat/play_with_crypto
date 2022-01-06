import React from 'react'

import Lottie from 'react-lottie-segments';
import confetti from '../../anim/confetti.json'

export default function FirstConnectionMsg(props) {

    const sequence = {
        segments: [0, 166],
        forceFlag: true
    }

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: confetti,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        }
    }

    return (
        <div className='component first-connection-msg-component'>
            <div className="container">
                <svg className='cross' onClick={() => props.hideMsg()} width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L6.75 17.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75L17.25 17.25"></path></svg>

                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                    isClickToPauseDisabled={true}
                    playSegments={sequence}
                />

                <p className='title'>Bienvenue sur Play With Crypto !</p>
                <p>100€ viennent d'être ajoutés à ton portefeuille, à toi de jouer !</p>
                <button onClick={() => props.hideMsg()}>C'est parti</button>
            </div>
        </div>
    )
}
