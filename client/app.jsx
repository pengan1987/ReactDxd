var Student = React.createClass({
    render: function () {
        return <h2>{this.props.data.firstName}</h2>
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