// App component - represents the whole app
App = React.createClass({

  renderHours(){


  	var indents=[];
  	for(var i =0; i<25; i++){
  		indents.push(
  			<tr>
  				<td>{i}</td>
  				<td>x</td>
  			</tr>
  			);
  	}
  	return indents;

  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Time Block</h1>
         </header>

         <table className="schedule">
         	<tbody>
     			{this.renderHours()}
         	</tbody>
         </table>
      </div>
    );
  }
});