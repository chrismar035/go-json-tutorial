var TaskBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTasksFromServer();
    // setInterval(this.loadTasksFromServer, this.props.pollInterval);
  },
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTaskSubmit: function(task) {
    var tasks = this.state.data;
    var newTasks = tasks.concat([task]);
    this.setState({date: newTasks});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(task),
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="taskBox">
        <TaskList data={this.state.data} />
        <TaskForm onTaskSubmit={this.handleTaskSubmit} />
      </div>
    );
  }
});

var TaskForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    if (!name) {
      return;
    }
    this.props.onTaskSubmit({name: name});
    React.findDOMNode(this.refs.name).value = '';
    return;
  },
  render: function() {
    return (
      <form className="taskForm" onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Task name" ref="name" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    var taskNodes = this.props.data.map(function (task) {
      return (
        <Task key={task.id} name={task.name} />
      );
    });
    return (
      <div className="taskList">
        {taskNodes}
      </div>
    );
  }
});

var Task = React.createClass({
  render: function() {
    return (
      <div className="task">
        <div className="taskName">
          {this.props.name}
        </div>
      </div>
    );
  }
});

React.render(
  <TaskBox url="todos" pollInterval={2000} />,
  document.getElementById('content')
);
