class CurrencyCard extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="currency">
                {console.log('là')}
            </div>
        )
    }
}