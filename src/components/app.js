import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import {findIndex} from "../util/array_helpers.js";

import Header from './header';
import Home from './home';
import Profile from './profile';
import Login from './login';
import EditAccount from "./EditAccount/EditAccountForm.jsx";

import UserCountainer from "../containers/UserContainer.js"

export default class App extends Component {
	constructor(props) {

		super();
    this.state = {
     isLoggedIn: INITINFO.isLoggedIn,
		 login_noonce: INITINFO.loginNoonce
    }

		this.okNoLogPaths = [
			'/login/',
			'/create-account/'
		];
		this.handleRoute = this.handleRoute.bind(this);

	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute() {
		let url = window.location.pathname;

    if(!this.state.isLoggedIn && !findIndex(this.okNoLogPaths, url)) {

     route('/login/', true)
    }
		return false;
	};

	componentWillMount() {
		this.handleRoute();
	}

	render(props,state) {
		return (
			<div id="app">
			<Subscribe to={[UserContainer]}>
			{function(user){
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Home path="/index.php" />
					<Login path="/login/" isLoggedIn={user.isLoggedIn} noonce={state.login_noonce} />
					<EditAccount path="/create-account/"
						isLoggedIn={user.isLoggedIn}
						noonce={state.login_noonce}
						create={true}
						UserContainer={user}
					/>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
				}.bind(this)
			}
			</Subscribe>
			</div>
		);
	}
}
