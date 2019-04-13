import React, { Component } from "react";
import logo from "../img/image.png";
import { Image, Icon, Menu, Divider, Message, Popup } from "semantic-ui-react";
import moment from "moment-timezone";

class Navbar extends Component {
	state = {
		isPlay: false
	}

	start = () => {
		const begin = moment()
			.tz("Europe/Stockholm")
			.format("YYYY-MM-DD HH:mm");
		localStorage.setItem("begin", begin);
		this.setState({isPlay: true})
		alert("Started recording");
	};

	stop = () => {
		const begin = localStorage.getItem("begin");
		const end = moment()
			.tz("Europe/Stockholm")
			.format("YYYY-MM-DD HH:mm");
		this.props.onStop({ begin: begin, end: end });
		this.setState({isPlay: false})
		alert("Stopped recording.\nPlease add work details before submission.");
	};

	logout = () => {
		localStorage.removeItem("Name");
		localStorage.removeItem("Password");
		alert("Logged out");
		window.location.reload();
	};

	render() {
		if (this.props.renderedTimes) {
			return (
				<Menu>
					<Menu.Item link name="logo" onClick={() => this.props.dashboard()}>
						<Image src={logo} id="logo" size="small" />
					</Menu.Item>
					
					<Menu.Item>
						<Popup
							trigger={
								<Icon
									link
									inverted
									color="white"
									name="sign-out"
									size="big"
									onClick={() => this.logout()}
								/>
							}
							content="Log Out"
							style={{ height: "50px" }}
						/>
					</Menu.Item>

					{!this.state.isPlay ? <Menu.Item>
						<Popup
							trigger={
								<Icon
									link
									inverted
									color="white"
									name="play"
									id="play"
									size="big"
									onClick={() => this.start()}
								/>
							}
							content="Start Tracking"
							style={{ height: "50px" }}
						/>
					</Menu.Item>
					:
					<Menu.Item>
						<Popup
							trigger={
								<Icon
									link
									inverted
									color="white"
									name="stop"
									id="stop"
									size="big"
									onClick={() => this.stop()}
								/>
							}
							content="Stop Tracking"
							style={{ height: "50px" }}
						/>
					</Menu.Item>}
					<Message background="green" size="big">
						{this.props.message}
					</Message>
				</Menu>)
		} else if (this.props.isLoggedIn) {
				return (
					<Menu>
						<Menu.Item link name='logo' onClick={ () => this.props.dashboard()} >
							<Image src={logo} id='logo' size='small' />
						</Menu.Item>
						<Menu.Item >
							<Icon link inverted color='white' name='sign-out' size='big' onClick={() => this.logout()} />
						</Menu.Item>
						<Message background='green' size='big'>{this.props.message}</Message>
					</Menu>)
		} else {
			return (
				<Menu>
					<Menu.Item link name="logo">
						<Image src={logo} id="logo" size="small" />
					</Menu.Item>
					<Menu.Item>
						<Popup
							trigger={
								<Icon
									link
									inverted
									color="white"
									name="sign-in"
									size="big"
									onClick={() => this.props.renderLoginForm()}
								/>
							}
							content="Log In"
							style={{ height: "50px" }}
						/>
					</Menu.Item>
				</Menu>
			);
		}
	}
}

export default Navbar;
