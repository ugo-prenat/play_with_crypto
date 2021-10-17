import React from 'react'

export default function Select(props) {
    return (
        <div className="select">
            {props.options.map((crypto, index) => {
                return <div className="option" key={index}>
                    <img src={crypto.icon} alt={crypto.symbol.toLowerCase() + '-icon'} />
                    <p>{crypto.name}</p>
                </div>
            })}
        </div>
    )
}
