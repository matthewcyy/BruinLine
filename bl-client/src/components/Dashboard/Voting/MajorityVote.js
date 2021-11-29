import React, { Component, useContext } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import axios from 'axios';
// import UserContext from '../../../context/userContext';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var updateInterval = 500;

class Voting extends Component {
	constructor(props) {
		super(props);
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() { //fetch data from mongodb 
		var dpsTotal = 0, yVal;
		var dps = this.chart.options.data[0].dataPoints;
		
		this.chart.options.data[0].dataPoints = dps;
		this.chart.render();
	}
	render() {
		if ()//check if logged in
			{
				const options = {
					theme: "dark2",
					title: {
						text: "Dining Hall Majority Vote"
					},
					subtitles: [{
						text: "Where are we going to eat?"
					}],
					axisY: {
						title: "Total Votes",
						includeZero = True,
					maximum: 100
					},
					data: [{
						type: "column",
						yValueFormatString: "#,###'%'",
						indexLabel: "{y}",
						dataPoints: [
							{ label: "Epicuria", y: 0 },
							{ label: "bPlate", y: 0 },
							{ label: "De Neve", y: 0 },
							{ label: "Feast", y: 0}
						]
					}]
				}
			}
			else
			{

			}
		
		return ( //buttons here will send data to group mongodb 
			<>
				<div>
					<button onClick={this.updateChart}> 
						Epicuria
					</button>
				</div>			
				<div>
					<button onClick={this.updateChart}>
						bPlate
					</button>
				</div>
				<div>
					<button onClick={this.updateChart}>
						De Neve
					</button>
				</div>
				<div>
					<button onClick={this.updateChart}>
						Feast
					</button>
				</div>
				<div>
					<CanvasJSChart options = {options}
						 onRef={ref => this.chart = ref}
					/>
					{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				</div> 
			</>
		);
	}
}

export default Voting;