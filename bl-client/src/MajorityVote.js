//got template code to make a column chart from: https://canvasjs.com/react-charts/column-chart/
var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class MajorityVote extends Component {
	render() {
		const options = {
			title: {
				text: "Basic Column Chart"
			},
			data: [
			{
				// 
				type: "column",
				dataPoints: [
					{ label: "De Neve",  y: 10  },
					{ label: "Bruin Plate", y: 15  },
					{ label: "Bruin Cafe", y: 25  },
					{ label: "Bruin Bowl",  y: 30  },
					{ label: "Spice Kitchen at Feast",  y: 28  }
				]
			}
			]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
module.exports = MajorityVote;    