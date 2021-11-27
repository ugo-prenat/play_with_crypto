import React, { useState } from 'react'

export default function WalletSelect(props) {
    const [selected, setSelected] = useState(props.options.length > 1 ? props.options[1] : props.options[0])
    const [showOptionList, setShowOptionList] = useState(false)
    
    function handleSelect(index) {
        setShowOptionList(false)
        setSelected(props.options[index])
        // Send to parent the new selected crypto symbol
        props.newSelect(props.options[index].symbol)
    }

    function getCurrencyPrice(base, cryptoAmount) {
        let toReturn
        props.cryptoPrices.forEach(crypto => {
            if (crypto.base === base) {
                toReturn = crypto.amount * cryptoAmount
            }
        });
        return toReturn.toString().substring(0, 6)
    }

    return (
        <div>
            <div className="select">
                <div className="selected" onClick={() => setShowOptionList(!showOptionList)}>
                    <img src={selected.icon} alt={selected.name + '-icon'} />
                    <div className="crypto-name">
                        <p className="name">{selected.name.charAt(0).toUpperCase() + selected.name.slice(1)}</p>
                        <p className="symbol">{selected.symbol}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20" d="M112 184l144 144 144-144"/></svg>
                </div>
            </div>
            {showOptionList && 
                <div className="option-list">
                    {props.options.map((crypto, index) => {
                        return <div className="option" key={index} onClick={() => handleSelect(index)}>
                            <div className="crypto-name-container">
                                <img src={crypto.icon} alt={crypto.symbol.toLowerCase() + '-icon'} />
                                <div className="crypto-name">
                                    <p className="name">{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}</p>
                                    <p className="symbol">{crypto.symbol}</p>
                                </div>
                            </div>
                            <div className="crypto-price-container">
                                <p className="currency-price">{crypto.cryptoAmount.toString().substring(0, 8)} {crypto.symbol}</p>
                                {crypto.symbol !== 'EUR' && <p className="crypto-price"><span>=</span>{getCurrencyPrice(crypto.symbol, crypto.cryptoAmount)}€</p>}
                            </div>
                        </div>
                    })}
                </div>
            }
        </div>
    )
}
