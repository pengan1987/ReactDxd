var Student = React.createClass({
    getInitialState: function () {
        return {
            firstName: null,
            lastName: null,
            age: null
        }
    },
    handleClick: function () {
        console.log("click");
        var reactThis = this;
        axios.get('http://localhost:3000/student/' + this.props.data._id)
            .then(function (response) {
                console.log(response.data);
                reactThis.setState(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    render: function () {
        console.log(this.props);
        var nameNode = <h2 onClick={this.handleClick}>{this.props.data.firstName}</h2>;
        var fullNode = (
            <div>
                <p>First Name: {this.state.firstName}</p>
                <p>Last Name: {this.state.lastName}</p>
                <p>Age: {this.state.age}</p>
                <p>Email: {this.state.email}</p>
                <hr />
            </div>
        );
        if (this.state.firstName != null)
            return fullNode;
        else
            return nameNode;
    }
});

var StudentList = React.createClass({
    getInitialState: function () {
        return {
            studentList: []
        }
    },
    componentDidMount: function () {
        var reactThis = this;
        axios.get('http://localhost:3000/student')
            .then(function (response) {
                console.log(response.data)
                reactThis.setState({studentList: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    handleClick: function () {
        console.log("Click");
    },
    render: function () {

        return (<div>
            {
                this.state
                    .studentList
                    .map(function (currentStudent) {
                            return <Student data={currentStudent} key={currentStudent._id}/>
                        }
                    )
            }
        </div>)
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
);