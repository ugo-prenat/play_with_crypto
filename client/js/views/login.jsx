class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div id="main">
                <Background />
            </div>
        )
    }
}
ReactDOM.render(<Login />, document.getElementById('root'))
