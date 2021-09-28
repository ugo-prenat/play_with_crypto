class CurrencyCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="currency">
                <div className="currency-data">
                    <div className="currency-data-left-part">
                        <img src={this.props.currency.icon} alt={this.props.currency.base + '-logo'} />
                        <div className="currency-name">
                            <p className="name">{this.props.currency.name}</p>
                            <p className="base">{this.props.currency.base}</p>
                        </div>
                    </div>
                    <div className="currency-price">
                        <p>{this.props.currency.amount.substring(0,8)}</p>
                        <p>{this.props.currency.symbol}</p>
                    </div>
                </div>
            </div>
        )
    }
}