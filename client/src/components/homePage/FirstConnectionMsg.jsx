import React from 'react'

import Lottie from "lottie-react"
import confetti from '../../anim/confetti.json'

export default function FirstConnectionMsg(props) {
    return (
        <div className='component first-connection-msg-component'>
            <div className="container">
                <svg className='cross' onClick={() => props.hideMsg()} width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L6.75 17.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75L17.25 17.25"></path></svg>

                <Lottie
                    animationData={confetti}
                    loop={false}
                    autoPlay={true}
                    style={{
                        width: '200px',
                        height: '200px'
                    }}
                />

                <p className='title'>Bienvenue sur Play With Crypto !</p>
                <p><span>100€</span> viennent d'être ajoutés à votre portefeuille, il est temps de commencer à jouer avec les échanges de cryptomonnaies</p>
                <button onClick={() => props.hideMsg()}>C'est parti !</button>
            </div>
        </div>
    )
}
