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
			</li>
			)
	}

});