import React, { Component } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
import axios from 'axios';
import Button from '@mui/material/Button';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Voting extends Component {	
	constructor(props) {
		super(props);
	}


	async makeVote(diningHall) {
		if (diningHall === "B-Plate") {
			diningHall = "bPlate"
		}
		if (diningHall === "De Neve") {
			diningHall = "DeNeve"
		}
		this.props.changeVote(diningHall)
		var reqBody = {}
		reqBody.groupId = this.props.groupId
		reqBody.diningHall = diningHall
		const changeVote = await axios.patch('http://localhost:5000/groups/vote', reqBody)
		localStorage.setItem("vote", diningHall)
		this.props.setDisable(true)
	}

	async removeVote() {
		var diningHall = localStorage.getItem("vote")
		if (diningHall === "B-Plate") {
			diningHall = "bPlate"
		}
		if (diningHall === "De Neve") {
			diningHall = 'DeNeve'
		}
		this.props.removeVote(diningHall)
		var reqBody={}
		var reqBody = {}
		reqBody.groupId = this.props.groupId
		reqBody.diningHall = diningHall
		const changeVote = await axios.patch('http://localhost:5000/groups/removeVote', reqBody)
		localStorage.setItem("vote", "")
		this.props.setDisable(false)
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}

	render() {
	console.log("PROPS", this.props)
		const options = {
			theme: "light2",
			axisX: {
				title: "Dining Hall",
			},
			axisY: {
				title: "Number of Votes",
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  this.props.votes.bPlate, label: "B-Plate" },
					{ y:  this.props.votes.Feast, label: "Feast" },
					{ y:  this.props.votes.DeNeve, label: "De Neve" },
					{ y:  this.props.votes.Epicuria, label: "Epicuria" }
				]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			<Button disabled={this.props.undoDisable} onClick={()=>this.makeVote("B-Plate")}>B-Plate</Button>
			<Button disabled={this.props.undoDisable} onClick={()=>this.makeVote("Feast")}>Feast</Button>
			<Button disabled={this.props.undoDisable} onClick={()=>this.makeVote("De Neve")}>De Neve</Button>
			<Button disabled={this.props.undoDisable} onClick={()=>this.makeVote("Epicuria")}>Epicuria</Button>
			<Button disabled={!this.props.undoDisable} onClick={()=>this.removeVote()}>Undo Vote</Button>
		</div>
		);
	}
}

export default Voting;