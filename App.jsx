// App component - represents the whole app
App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
  	return {
  		tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
  	}
  },

  renderHours(){

  	var indents=[];
  	for(var i =0; i<25; i++){
  		indents.push(
  			<tr className={i}>
  				<td>{i}</td>
  				<td className="hour-cell">x</td>
  			</tr>
  			);
  	}

  	return indents;

  },

  loadTasks() {
  	return this.data.tasks.map((task) => {
  		return (
  			<Task key={task._id} task={task} />
  			);
  	});
  },

  handleSubmit() {
  	event.preventDefault();
  	var text = React.findDOMNode(this.refs.task).value.trim();

  	Tasks.insert({
  		text: text,
  		createdAt: new Date()
  	});

  	React.findDOMNode(this.refs.task).value="";

  },



  render() {
    return (
      <div className="container">
        <header>
          <h1>Time Block</h1>

          <form className="new-task" onSubmit={this.handleSubmit}>
         	<input type="text" ref="task" placeholder="Hello"></input>
          	<button type="submit">Add Task</button>
          </form>
         </header>

         <div className="tasks">
          <h1>Tasks:</h1>
          <ul>
         	  {this.loadTasks()}
          </ul>
         </div>

         <div className="Tasks">
           <h1>Schedule</h1>

           <table className="schedule">
           	<tbody>
       			{this.renderHours()}
           	</tbody>
           </table>
          </div>
      </div>
    );
  }
});