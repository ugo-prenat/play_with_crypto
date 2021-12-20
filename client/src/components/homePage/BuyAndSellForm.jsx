import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"

import CryptoListSelect from './CryptoListSelect';
import WalletSelect from './WalletSelect';
import FormButton from '../FormButton';

import { AUTH_HEADERS } from '../../authHeaders'


export default function BuyAndSellForm() {
    const { handleSubmit } = useForm({
        mode: 'onTouched'
    })

    const [ userWallet, setUserWallet ] = useState([])
    const [cryptoList, setCryptoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState()
    const [buttonStatus, setButtonStatus] = useState('default')

    const [fromCryptoAmount, setFromCryptoAmount] = useState(0)
    const [fromCrypto, setFromCrypto] = useState('')

    const [toCryptoAmount, setToCryptoAmount] = useState(0)
    const [toCrypto, setToCrypto] = useState('')

    const [currencyAmount, setCurrencyAmount] = useState(0)

    const euro = { base: 'EUR', symbol: '€',name: 'Euro', amount: '1', icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg' }

    const userId = localStorage.getItem('userId')
    let history = useHistory()

    async function getUserWallet() {
        await fetch(`/api/users/${userId}/wallet`, { headers: setAuthHeaders() })
        .then(res => res.json())
        .then(data => {
            if (data.code) history.push('/login')
            else {
                setUserWallet(data)
                setFromCrypto(data.length > 1 ? data[1].symbol : data[0].symbol)
            }
        })
    }
    async function cryptoPricesLoop() {
        // Every 10 seconds, get the new prices
        const interval = setInterval(() => {
            fetch('/api/crypto/prices')
            .then(response => response.json())
            .then(data => {
                // Add euro to the crypto list
                data.splice(0, 0, euro)
                setCryptoList(data)
            })
        }, 10000)
        return () => clearInterval(interval)
    }
    
    useEffect(() => {
        (async() => {
            await getUserWallet()
            await fetchData()
        })()
    // eslint-disable-next-line
    }, [])

    async function fetchData() {
        // Get the crypto prices
        fetch('/api/crypto/prices')
        .then(response => response.json())
        .then(data => {
            // Add euro to the crypto list
            data.splice(0, 0, euro)

            setCryptoList(data)
            setToCrypto(data[1].base)
            setIsLoading(false)
        })

        // Function who get the new prices every 10 seconds
        cryptoPricesLoop()
    }

    const onSubmit = async e => {
        setButtonStatus('loading')

        const data = {
            from: {
                symbol: fromCrypto,
                currencyAmount: parseFloat(currencyAmount),
                cryptoAmount: parseFloat(fromCryptoAmount)
            },
            to : {
                symbol: toCrypto,
                currencyAmount: parseFloat(currencyAmount),
                cryptoAmount: parseFloat(toCryptoAmount)
            }
        }
        await fetch(`/api/users/wallet/${userId}`, { method: 'POST', headers: AUTH_HEADERS, body: JSON.stringify(data)})
        .then(res => res.json())
        .then(response => {
            if (response.code === 400) {
                setButtonStatus('default')
                setError(response.msg)
                setTimeout(() => setError(), 5000)
            }
            else {
                setButtonStatus('done')

                setTimeout(() => {
                    setButtonStatus('default')
                }, 3000);
            }
        })
    }
    const handleFromCryptoAmount = (newAmount, newFromCrypto) => {
        setFromCryptoAmount(newAmount)

        const fromCryptoPrice = getCryptoPrice(newFromCrypto, cryptoList)
        const toCryptoPrice = getCryptoPrice(toCrypto, cryptoList)

        if (newFromCrypto !== 'EUR') {
            const newCurrecnyAmount = newAmount * fromCryptoPrice

            setCurrencyAmount(newCurrecnyAmount)
            setToCryptoAmount(newCurrecnyAmount / toCryptoPrice)
        } else {
            setCurrencyAmount(newAmount)
            setToCryptoAmount(newAmount / toCryptoPrice)
        }
    }
    const handleCurrencyAmount = e => {
        const newAmount = e.target.value
        setCurrencyAmount(newAmount)

        const fromCryptoPrice = getCryptoPrice(fromCrypto, cryptoList)
        const toCryptoPrice = getCryptoPrice(toCrypto, cryptoList)

        if (fromCrypto !== 'EUR') {
            setFromCryptoAmount(newAmount / fromCryptoPrice)
            setToCryptoAmount(newAmount / toCryptoPrice)
        } else {
            setFromCryptoAmount(newAmount)
            setToCryptoAmount(newAmount / toCryptoPrice)
        }
    }
    const handleToCryptoAmount = (newAmount, newToCrypto) => {
        setToCryptoAmount(newAmount)

        const fromCryptoPrice = getCryptoPrice(fromCrypto, cryptoList)
        const toCryptoPrice = getCryptoPrice(newToCrypto, cryptoList)

        const newCurrecnyAmount = newAmount * toCryptoPrice

        if (fromCrypto !== 'EUR') {
            setCurrencyAmount(newCurrecnyAmount)
            setFromCryptoAmount(newCurrecnyAmount / fromCryptoPrice)
        } else {
            setCurrencyAmount(newCurrecnyAmount)
            setFromCryptoAmount(newCurrecnyAmount)
        }
    }
    const handleNewWalletSelect = async data => {
        setFromCrypto(data)
        handleFromCryptoAmount(fromCryptoAmount, data)
    }
    const handleNewCryptoListSelect = async data => {
        setToCrypto(data)
        handleToCryptoAmount(fromCryptoAmount, data)
    }
    
    if (isLoading) { return <div className="loading-container"><p>Chargement...</p></div> }

    return (
        <div>
            <form className="buy-and-sell-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container border-bottom">
                    <WalletSelect newSelect={data => handleNewWalletSelect(data)} options={userWallet} cryptoPrices={cryptoList} className="border-bottom" />
                    <input
                        type="number"
                        min="0.000001"
                        step="0.0000000001"
                        placeholder="0"
                        required="required"
                        value={parseFloat(fromCryptoAmount).toString().substring(0, 8)}
                        onChange={e => handleFromCryptoAmount(e.target.value, fromCrypto)} />
                </div>

                <div className="equal-sign-container sign-container"><span>=</span></div>

                <div className="input-container">
                    <div className="selected">
                        <img src={euro.icon} alt={euro.name + '-icon'} />
                        <div className="crypto-name">
                            <p className="name">{euro.name.charAt(0).toUpperCase() + euro.name.slice(1)}</p>
                            <p className="symbol">{euro.base}</p>
                        </div>
                    </div>
                    <input type="number" min="0.000001" required="required" step="0.0000000001" value={currencyAmount.toString().substring(0, 8)} onChange={handleCurrencyAmount} placeholder="0" />
                </div>

                <div className="down-arrow-container sign-container">
                    <span><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path></svg></span>
                </div>
                
                <div className="input-container to-input-container">
                    <CryptoListSelect newSelect={data => handleNewCryptoListSelect(data)} options={cryptoList} />
                    <input
                        type="number"
                        min="0.000001"
                        step="0.0000000001"
                        placeholder="0"
                        required="required"
                        value={parseFloat(toCryptoAmount).toString().substring(0, 8)}
                        onChange={e => handleToCryptoAmount(e.target.value, toCrypto)} />
                </div>

                <FormButton status={buttonStatus} doneText="Transaction effectuée">Confirmer</FormButton>
                
                { error &&
                    <div className="error-msg">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path className="prefix__n-info-tri" strokeWidth="1.5" d="M11.134 6.844a1 1 0 011.732 0l5.954 10.312a1 1 0 01-.866 1.5H6.046a1 1 0 01-.866-1.5l5.954-10.312z"/><g className="prefix__n-info-tri"><path strokeLinecap="round" strokeWidth="1.5" d="M12 10.284v3.206"/><circle cx="12" cy="15.605" r=".832"/></g></svg>
                        <p>{error}</p>
                    </div>
                }
            </form>
        </div>
    )
}

function getCryptoPrice(symbol, cryptoList) {
    let toReturn

    cryptoList.forEach(crypto => {
        if (crypto.base === symbol) toReturn = crypto.amount
    })
    return toReturn
}
function setAuthHeaders() {
    const token = localStorage.getItem('accessToken')
    return {'authorization': `Bearer ${token ? token : ''}`}
}