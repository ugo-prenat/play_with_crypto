import { useEffect, useState } from "react"

export default function Select(props) {
    const [selected, setSelected] = useState(props.options[1])
    const [showOptionList, setShowOptionList] = useState(false)
    
    function handleSelect(e) {
        setShowOptionList(false)

        const optionIndex = e.target.getAttribute('index')
        setSelected(props.options[optionIndex])
    }

    return (
        <div className="select">
            <div className="selected" onClick={() => setShowOptionList(!showOptionList)}>
                <img src={selected.icon} alt={selected.name + '-icon'} />
                <p>{selected.symbol}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20" d="M112 184l144 144 144-144"/></svg>
            </div>
            {showOptionList && 
                <div className="option-list">
                    {props.options.map((crypto, index) => {
                        return <div className="option" key={index} index={index} onClick={handleSelect}>
                            <img src={crypto.icon} index={index} alt={crypto.symbol.toLowerCase() + '-icon'} />
                            <p index={index}>{crypto.symbol}</p>
                        </div>
                    })}
                </div>
            }
            
        </div>
    )
}
