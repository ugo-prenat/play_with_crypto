class CurrencyList extends React.Component {
    constructor() {
        super()
        this.state = {
            currenciesList: []
        }
    }
    
    componentDidMount() {
        getPrices().then(prices => this.setState({ currenciesList: prices }))

        setInterval(() => {
            getPrices().then(prices => {
                this.setState({ currenciesList: prices })
                console.log('Prices updated')
        })
        }, 10000)
    }

    render() {
        return (
            <div className="currencies-list">
                {this.state.currenciesList.length > 0 ? 
                    this.state.currenciesList.map(currency => {
                        <CurrencyCard data = {currency} />
                    })
                : ''}
            </div>
        )
    }
}