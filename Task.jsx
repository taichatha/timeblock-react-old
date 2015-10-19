Task = React.createClass({
	propTypes: {

		task: React.PropTypes.object.isRequired
	},

	deleteThisTask() {
		Tasks.remove(this.props.task._id);

	},

	render(){
		return (
			<li>
				<button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
				<span className="Task">{this.props.task.text}</span>
				<br/>
				<span className="Time">{this.props.task.startTime} - {this.props.task.endTime}</span>
			</li>
			)
	}

});