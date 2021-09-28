class CurrencyList extends React.Component {
    constructor() {
        super()
        this.state = {
            currenciesList: []
        }
    }

    UNSAFE_componentWillMount() {
        getPrices().then(prices => this.setState({ currenciesList: prices }))

        setInterval(() => {
            getPrices().then(prices => {
                this.setState({ currenciesList: prices })
        })
        }, 10000)
    }

    render() {
        return (
            <div className="currencies-list">
                {this.state.currenciesList.map(currency => {
                    return <CurrencyCard currency={currency} key={currency.base} />
                })}
            </div>
        )
    }
}