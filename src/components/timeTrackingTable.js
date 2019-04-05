import React, { Component } from "react";
import { Table, Input, Dropdown, Button } from "semantic-ui-react";
import { saveData } from "../modules/kimaiSaveTimeData";
import { getData } from "../modules/kimaiGetCustomerData";

export class TimeTrackingTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: "",
			end: "",
			customer: "",
			project: "",
			activity: "",
			description: "",
			fixedRate: "",
			hourlyRate: "",
			entrySaved: false,
			fetchedCustomers: []
		};
	}

	componentDidMount() {
		this.getCustomerData();
	}
	entryHandler(e) {
		this.setState({ entrySaved: true });
	}

	async getCustomerData() {
		try {
			await getData().then(response => {
				if (
					response.message === "Could not fetch customer data at this time."
				) {
					console.log(response.message);
				} else {
					{
						let responseArray = response.data;
						let companyArray = responseArray.map(company => {
							let rCompany = {};
							rCompany["text"] = company.name;
							rCompany["value"] = company.id;
							return rCompany;
						});
						this.setState({ fetchedCustomers: companyArray });
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async saveTimeData() {
		const values = {
			begin: this.state.begin,
			end: this.state.end,
			customer: this.state.customer,
			project: this.state.project,
			activity: this.state.activity,
			description: "description",
			fixedRate: "0.0",
			hourlyRate: this.state.hourlyRate
		};
		try {
			await saveData(values).then(response => {
				if (response.message === "Entry saved") {
					this.entryHandler();
				} else {
					alert(response.message);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	handleCustomerChange(value) {
		this.setState({ customer: value });
	}

	handleProjectChange(value) {
		this.setState({ project: value });
	}

	handleActivityChange(value) {
		this.setState({ activity: value });
	}

	render() {
		let saveButton;

		const customerOptions = this.state.fetchedCustomers;
		const projectOptions = [
			{ text: "Project 1", value: "1" },
			{ text: "Project 2", value: "2" },
			{ text: "Project 3", value: "3" },
			{ text: "Project 4", value: "4" }
		];
		const taskOptions = [
			{ text: "Task 1", value: "1" },
			{ text: "Task 2", value: "2" },
			{ text: "Task 3", value: "3" },
			{ text: "Task 4", value: "4" }
		];

		if (this.state.entrySaved === false) {
			saveButton = (
				<>
					<Button onClick={this.saveTimeData.bind(this)}>Save</Button>
				</>
			);
		} else if (this.state.entrySaved === true) {
			saveButton = (
				<>
					<p>Your time was saved</p>
				</>
			);
		}

		return (
			<Table celled>
				<Table.Header name="tableHeader">
					<Table.Row name="tableRow">
						<Table.HeaderCell>Start Time</Table.HeaderCell>
						<Table.HeaderCell>End Time</Table.HeaderCell>
						<Table.HeaderCell>Rate</Table.HeaderCell>
						<Table.HeaderCell>Customer</Table.HeaderCell>
						<Table.HeaderCell>Project</Table.HeaderCell>
						<Table.HeaderCell>Task</Table.HeaderCell>
						<Table.HeaderCell> </Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<Input
								id="begin"
								placeholder="YYYY-MM-DD HH:MM"
								onChange={e =>
									this.setState({ begin: e.target.value, entrySaved: false })
								}
							/>
						</Table.Cell>
						<Table.Cell>
							<Input
								id="end"
								placeholder="YYYY-MM-DD HH:MM"
								onChange={e =>
									this.setState({ end: e.target.value, entrySaved: false })
								}
							/>
						</Table.Cell>
						<Table.Cell>
							<Input
								id="hourlyRate"
								placeholder="$"
								onChange={e =>
									this.setState({
										hourlyRate: e.target.value,
										entrySaved: false
									})
								}
							/>
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								id="customer"
								className="customer"
								selection
								defaultValue=""
								options={customerOptions}
								onChange={(e, { value }) => this.handleCustomerChange(value)}
							/>
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								id="project"
								className="project"
								selection
								defaultValue=""
								options={projectOptions}
								onChange={(e, { value }) => this.handleProjectChange(value)}
							/>
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								id="activity"
								className="activity"
								selection
								defaultValue=""
								options={taskOptions}
								onChange={(e, { value }) => this.handleActivityChange(value)}
							/>
						</Table.Cell>
						<Table.Cell>{saveButton}</Table.Cell>
					</Table.Row>
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell textAlign="center" colSpan="7" />
					</Table.Row>
				</Table.Footer>
			</Table>
		);
	}
}
