import { useEffect, useState } from "react"

export default function Select(props) {
    const [selected, setSelected] = useState(props.options[0])
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
