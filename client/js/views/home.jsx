class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div id="main">
                <Header />

                <CurrencyList />
            </div>
        )
    }
}
ReactDOM.render(<Home />, document.getElementById('root'))
