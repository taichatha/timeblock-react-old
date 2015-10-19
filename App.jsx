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
  				<td className="hour-cell" refs={i}>x</td>
  			</tr>
  			);
  	}

  	return indents;

  },

  addTasksToSchedule(){

    return this.data.tasks.map((task) => {
      var getStartTime = task.startTime;
      React.findDOMNode(this.refs.getStartTime).innerHTML=task.text;


    })


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
    
    React.findDOMNode(this.refs.error).innerHTML="";

  	var text = React.findDOMNode(this.refs.task).value.trim();
    var startTime = React.findDOMNode(this.refs.startTime).value.trim();
    var endTime = React.findDOMNode(this.refs.endTime).value.trim();
    if(startTime == ""){
      React.findDOMNode(this.refs.error).innerHTML="Need a Start Time";
    }
    else if(endTime == ""){
      React.findDOMNode(this.refs.error).innerHTML="Need an End Time";

    }

    else if(startTime == "" & endTime == ""){
      React.findDOMNode(this.refs.error).innerHTML="No time block added";
    }

    else if(startTime<endTime){
    	Tasks.insert({
    		text: text,
        startTime: startTime,
        endTime: endTime,
    		createdAt: new Date()
    	});

      React.findDOMNode(this.refs.task).value="";
      React.findDOMNode(this.refs.startTime).value="";
      React.findDOMNode(this.refs.endTime).value="";
    }
    else{
      React.findDOMNode(this.refs.error).innerHTML="End Time before Start Time";


    }

  	

  },



  render() {
    return (
      <div className="container">
        <header>
          <h1>Time Block</h1>

          <form className="new-task" onSubmit={this.handleSubmit}>
           	<input type="text" ref="task" placeholder="Hello"></input>
            <input type="text" ref="startTime" placeholder="Start time"></input>
            <input type="text" ref="endTime" placeholder="End Time"></input>
          	<button type="submit">Add Task</button>
          </form>
          <br/>
          <div className="error" ref="error"></div>
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