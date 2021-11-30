import React, { Component, useContext } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
import axios from 'axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Voting extends Component {
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	render() {
		const options = {
			theme: "light2",
			title:{
				text: "Dining Hall Majority Vote"
			},
			axisX: {
				title: "Dining Hall",
				reversed: true,
			},
			axisY: {
				title: "Number of Votes",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  4, label: "B-Plate" },
					{ y:  5, label: "Feast" },
					{ y:  7, label: "De Neve" },
					{ y:  6, label: "Epicuria" }
				]
			}]
		}
		
		return (
		<div>
			<h1>Vote Which Dining Hall You Want To Eat At!</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default Voting;