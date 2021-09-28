class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            walletBalance: '',
            currencySymbol: ''
        }
    }

    componentDidMount() {
        // Set the user wallet balance
        getUserById(USER_ID).then(user => {
            const userBalance = user.wallet.balance
            this.setState({
                walletBalance: userBalance.amount,
                currencySymbol: userBalance.currency.symbol
            })
        })
    }

    render() {
        return (
            <header>
                <div className="user-wallet">
                    <p>Wallet amount : { this.state.walletBalance } { this.state.currencySymbol }</p>
                </div>
            </header>
        )
    }
}