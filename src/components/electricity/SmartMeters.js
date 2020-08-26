import React from 'react';
import Table from 'react-bootstrap/Table';

class SmartMeters extends React.PureComponent {

	render() {

		return (

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Label</th>
						<th>Load profile</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1000</td>
						<td>Residential 1</td>
						<td>chart</td>
						<td>start</td>
					</tr>
					<tr>
						<td>2000</td>
						<td>Residential 2</td>
						<td>chart</td>
						<td>start</td>
					</tr>
					<tr>
						<td>3000</td>
						<td>Residential 3</td>
						<td>chart</td>
						<td>start</td>
					</tr>
					<tr>
						<td>4000</td>
						<td>Commercial 1</td>
						<td>chart</td>
						<td>start</td>
					</tr>
					<tr>
						<td>5000</td>
						<td>Commercial 2</td>
						<td>chart</td>
						<td>start</td>
					</tr>
				</tbody>
			</Table>

		)
	
	}

} export default SmartMeters; 

