var Student = React.createClass({
    getInitialState: function () {
        return {
            _id: null,
            firstName: null,
            lastName: null,
            age: null,
            email: null,
            editing: false
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
    toggleEditing: function () {
        var newState = this.state;
        newState.editing = true;
        this.setState(newState);
    },
    handleChange: function (e) {
        var studentObject = this.state;
        studentObject[e.target.name] = e.target.value;
        this.setState(studentObject);
    },
    handleSubmit: function (e) {
        axios.post("http://localhost:3000/update/" + this.state._id, this.state)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    toggleDelete: function () {
        axios.get("http://localhost:3000/delete/" + this.state._id)
            .then(function (response) {
                console.log(response.data);
                window.location.reload();
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
                <button onClick={this.toggleEditing}>Edit</button>
                <button onClick={this.toggleDelete}>Delete</button>
                <hr />
            </div>
        );
        var editingNode = (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name"
                       onChange={this.handleChange} value={this.state.firstName}/>
                <br/>
                <input type="text" name="lastName" placeholder="Last Name"
                       onChange={this.handleChange} value={this.state.lastName}/>
                <br/>
                <input type="text" name="age" placeholder="Age"
                       onChange={this.handleChange} value={this.state.age}/>
                <br/>
                <input type="text" name="email" placeholder="Email"
                       onChange={this.handleChange} value={this.state.email}/>
                <br/>
                <button>Submit</button>
            </form>
        );
        if (this.state.firstName === null)
            return nameNode;
        else if (this.state.editing)
            return editingNode;
        else
            return fullNode;
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
            <StudentForm/>
        </div>)
    }
});

var StudentForm = React.createClass({
    getInitialState: function () {
        return {
            firstName: null,
            lastName: null,
            age: null,
            email: null
        }
    },
    handleChange: function (e) {
        var studentObject = this.state;
        studentObject[e.target.name] = e.target.value;
        this.setState(studentObject);
    },
    handleSubmit: function (e) {
        console.log("submit");
        console.log(this.state);
        axios.post("http://localhost:3000/new", this.state)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange}/>
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange}/>
                <input type="text" name="age" placeholder="Age" onChange={this.handleChange}/>
                <input type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
                <button>Submit</button>
            </form>
        )
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
);