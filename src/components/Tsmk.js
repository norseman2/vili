import React from 'react';
import './Tsmk.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import $ from 'jquery';
import * as d3 from 'd3';
import { Button } from 'react-bootstrap';

import { API, graphqlOperation } from 'aws-amplify'
import { updateLoadProfile as UpdateLoadProfile} from '../graphql/mutations';

//https://www.npmjs.com/package/d3
//https://github.com/mbonvini/TimeSeriesMaker

class Tsmk extends React.PureComponent {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	getTime(dataPoint) {
		let time = (dataPoint.hour < 10)?'0'+dataPoint.hour:dataPoint.hour
		time += ':'
		time += (dataPoint.minutes < 10)?'0'+dataPoint.minutes:dataPoint.minutes
		time += ':'
		time += '00.000'
		return time
	}

	getTimestamp(time){
		return '2020-01-01T' + time + 'Z'
	}

	async handleClick(){
		const smartMeter = this.props.smartMeter
		const loadProfile = $('#canvas').data['loadProfile']
		const jsonLoadProfile = JSON.stringify(loadProfile)
		const updates = {
			id: smartMeter.profile.id,
			dataPoints: jsonLoadProfile
		}
		await API.graphql(graphqlOperation(UpdateLoadProfile, { input: updates })).then((response)=>{
			console.log('load profile saved')
		}).catch((err)=>{
			console.log(err)
		})
	}

	componentDidMount() {

		var xMaxValue = 24; //Hours for a day
		var yMaxValue = 100; //maximum value for active power in kW

		try {
			
			// Get the size of teh div containing the plot
			var divWidth = $('#canvas').width();
			var divHeight = divWidth/2.5;

			// Define the margin and sizes of the plotting area
			var margin = {top: 20, right: 40, bottom: 50, left: 30},
				width = divWidth - margin.left - margin.right,
				height = divHeight - margin.top - margin.bottom;

			var xRange = d3.scaleLinear().domain([0, xMaxValue]).range([0, width]);
			var yRange = d3.scaleLinear().domain([0, yMaxValue]).range([height, 0]);

			var xAxis = d3.axisBottom(xRange);
			var yAxisLeft = d3.axisLeft(yRange);

			var svg = d3.select("#canvas")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");

			var line = d3.line();

			// Add the rectangle where the data will be drawn
			svg.append("rect")
				.attr("id", "rect")
				.attr("x", 0)
				.attr("y", 0)
				.style("fill", "orange")
				.attr("width", width)
				.attr("height", height)

			// Add the X and Y Axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")
				.attr("y", 40)
				.attr("x", width / 2)
				.attr("text-anchor", "end")
				.attr("font-size", "12px")
				.attr("stroke", "black")
				.text("Time of the day");
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxisLeft)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", - height/3)
				.attr("y", 20)
				.attr("text-anchor", "end")
				.attr("stroke", "black")
				.text("Active Power (kW)")
				.attr("font-size", "12px")

			// Define the Object that will contain the data to draw
			// the line
			var drawObj = {
				isDown: false,
				dataPoints: [],
				currentPath: null
			};

			// Function called when the mousedown event on the SVG canvas
			// is detected
			svg.on("mousedown", function(){
				var x;
				var offset = $('#rect').offset();
				var posX = offset.left - $(window).scrollLeft(); 
				x = d3.event.x - posX;

				// Consider only events that happens inside the rect,
				// i.e. x > 0
				if(x > 0){

					if(drawObj.dataPoints.length > 0){
						drawObj.dataPoints = [];
						drawObj.currentPath = null;
						d3.selectAll(".currentPath").remove();
					}
					drawObj.isDown = true;
				}

				// Block propagation of the event to other elements
				d3.event.preventDefault();
			});

			// Function called when the mousemove event on the SVG canvas
			// is detected
			svg.on("mousemove", function(){

				var x, y;
				var offset = $('#rect').offset();
				var posX = offset.left - $(window).scrollLeft();
				var posY = offset.top - $(window).scrollTop();
				x = d3.event.x - posX;
				y = d3.event.y - posY;

				// Consider to draw the point only if the isDown flag
				// has been set and the points are actually inside the rect x > 0
				if (drawObj.isDown && x > 0){

					// Apply constraints to x and y coordinates
					x = Math.max(0, x);
					x = Math.min(x, width);
					y = Math.max(0, y);
					y = Math.min(height, y);

					if(drawObj.dataPoints.length > 0){
						// Impose that x coordinates are monotonically
						// increasing, otherwise skip
						if( x > drawObj.dataPoints[drawObj.dataPoints.length-1][0]){
							drawObj.dataPoints.push([x, y]);
						}  
					}else{
						// First point, don't check for monotonically
						// increasing values
						drawObj.dataPoints.push([x, y]);
					}
					
					// Create the Pah object if not defined
					if (!drawObj.currentPath){
						drawObj.currentPath = svg.append("path")
							.attr("class", "currentPath")
							.style("stroke-width", 2)
							.style("stroke", "#26A65B")
							.style("fill", "none");
					}
					
					// Draw the path
					drawObj.currentPath
					.datum(drawObj.dataPoints)
					.attr("d", line);
					
					// When the point is at the very right, 
					// terminate the line and activate buttons
					if(x >= width - 1.0){
						drawObj.isDown = false;
					}
				}

				// Block propagation of the event to other elements
				d3.event.preventDefault();
			});

			// Function that is called when the mouseup event on the SVG
			// canvas is detected, i.e. completed to draw a line.
			svg.on("mouseup", function(){
				drawObj.isDown = false;
				var dataPoints = drawObj.dataPoints;
				var loadProfile = [];
				dataPoints.forEach(element => {
					var time = (element[0] * xMaxValue) / width
					var hour = parseInt((Math.floor(time)<10)?'0'+Math.floor(time):Math.floor(time))
					var minutes = Math.round((time - Math.floor(time)) * 60)
					var activePower = (100 - (element[1] * yMaxValue) / height).toFixed(2)
					loadProfile.push(
						{
							time: time,
							hour: hour,
							minutes: minutes,
							activePower: activePower
						}
					)
				});
				$('#canvas').data['loadProfile'] = loadProfile;
				d3.event.preventDefault();
			});

		} catch (err) {
		  console.log('error', err)
		}

	}

	render() {

		return (

			<Container fluid>
				<Row>
					<Col>
						<div id="canvas" />
						<Button onClick={this.handleClick}>save load profile</Button>
					</Col>
				</Row>
			</Container>

		)
	
	}

} export default Tsmk; 