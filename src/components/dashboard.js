import React, { Component } from 'react';
import { Button, Header, Container, Grid, Image, Divider } from 'semantic-ui-react'
import clock from '../img/clock.png'
import statistics from '../img/statistics.png'
import invoicing from '../img/invoicing.png'

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard">
				<Container>
					<Header as="h1" textAlign="center" name="header">
						My Dashboard
					</Header>
				</Container>
				<Container name="images">
					<Grid>
						<Grid.Row centered columns={3}>
							<Grid.Column textAlign="center">
								<Button
									name="time_tracking"
									padding="0px"
									inverted
									color="white"
									onClick={() => this.props.timeTrackingHandler()}
								>
									<Image centered src={clock} />
								</Button>
								<Header as="h4">Time Tracking</Header>
							</Grid.Column>
							<Grid.Column textAlign="center">
								<Button
									name="statistics"
									inverted
									color="white"
									onClick={this.props.renderCharts}
								>
									<Image centered src={statistics} />
								</Button>
								<Header as="h4">Statistics</Header>
							</Grid.Column>
							<Grid.Column textAlign="center">
								<Button name="invoicing" padding="0px" inverted color="white" onClick={ () => this.props.invoicingHandler()}><Image centered src={invoicing}/></Button>
								<Header as="h4">Invoicing</Header>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>

				<Divider hidden />
			</div>
		);
	}
}

export default Dashboard;
