//got template code to make a bar chart from: https://canvasjs.com/react-charts/dynamic-live-column-chart/
var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var updateInterval = 500;
class MajorityVote extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		var dpsColor, dpsTotal = 0, deltaY, yVal;
		var dps = this.chart.options.data[0].dataPoints;
		var chart = this.chart;
		for (var i = 0; i < dps.length; i++) {
			deltaY = Math.round(2 + Math.random() *(-2-2));
			yVal = deltaY + dps[i].y > 0 ? (deltaY + dps[i].y < 100 ? dps[i].y + deltaY : 100) : 0;
			dpsColor = yVal >= 90 ? "#e40000" : yVal >= 70 ? "#ec7426" : yVal >= 50 ? "#81c2ea" : "#88df86 ";
			dps[i] = {label: "Core "+(i+1) , y: yVal, color: dpsColor};
			dpsTotal += yVal;
		}
		chart.options.data[0].dataPoints = dps;
		chart.render();
	}
	render() {
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
				includeZero: true,
			maximum: 100
			},
			data: [{
				type: "column",
				yValueFormatString: "#,###'%'",
				indexLabel: "{y}",
				dataPoints: [
					{ label: "Epicuria", y: 0 },
					{ label: "Bruin Plate", y: 0 },
					{ label: "De Neve", y: 0 }
				]
			}]
		}
		return (
			<div>
				<CanvasJSChart options = {options}
					 onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
module.exports = MajorityVote; 