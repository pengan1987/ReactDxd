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
    handleDelete: function () {
        var reactThis = this;
        var studentObject = this.state;
        axios.post("http://localhost:3000/delete/", this.state)
            .then(function (response) {
                console.log(response.data);
                reactThis.props.remove(studentObject)
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    render: function () {
        console.log(this.props);
        var nameNode = (
            <div className="panel panel-default">
                <h2 onClick={this.handleClick}>{this.props.data.firstName}</h2>
            </div>);
        var fullNode = (
            <div className="panel panel-default">

                <p>First Name: {this.state.firstName}</p>
                <p>Last Name: {this.state.lastName}</p>
                <p>Age: {this.state.age}</p>
                <p>Email: {this.state.email}</p>
                <button className="btn btn-success" onClick={this.toggleEditing}>Edit</button>
                <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>

            </div>
        );
        var editingNode = (
            <div className="panel panel-default">
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control" type="text" name="firstName" placeholder="First Name"
                           onChange={this.handleChange} value={this.state.firstName}/>
                    <br/>
                    <input className="form-control" type="text" name="lastName" placeholder="Last Name"
                           onChange={this.handleChange} value={this.state.lastName}/>
                    <br/>
                    <input className="form-control" type="text" name="age" placeholder="Age"
                           onChange={this.handleChange} value={this.state.age}/>
                    <br/>
                    <input className="form-control" type="text" name="email" placeholder="Email"
                           onChange={this.handleChange} value={this.state.email}/>
                    <br/>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
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
    removeFromList: function (obj) {
        var oldStudentList = this.state.studentList;
        var newStudentList = oldStudentList.filter(function (student) {
            return student._id !== obj._id;
        });
        var newState = this.state;
        newState.studentList = newStudentList;
        this.setState(newState);
    },
    handleClick: function () {
        console.log("Click");
    },
    render: function () {
        var reactThis = this;
        return (<div className="col-lg-12">
            {
                this.state
                    .studentList
                    .map(function (currentStudent) {
                            return <Student data={currentStudent} key={currentStudent._id} remove={reactThis.removeFromList}/>
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
            <div className="col-lg-6">
                <h4>Add new data here</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" name="firstName" placeholder="First Name"
                           onChange={this.handleChange}/>
                    <input type="text" className="form-control" name="lastName" placeholder="Last Name"
                           onChange={this.handleChange}/>
                    <input type="text" className="form-control" name="age" placeholder="Age"
                           onChange={this.handleChange}/>
                    <input type="text" className="form-control" name="email" placeholder="Email"
                           onChange={this.handleChange}/>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
);