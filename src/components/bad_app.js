import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import {Container,Subscribe,Provider } from "unstated";

import {findIndex} from "../util/array_helpers.js";

import UserContainer from "../containers/UserContainer.js";

import Header from './header';
import Home from './home';
import Profile from './profile';
import Login from './login';
import ForgotPassword from './login/ForgotPassword.jsx';
import EditAccount from "./EditAccount/EditAccountForm.jsx";
import ResetPassword from './login/ResetPassword.jsx';


import CreateTodo from "./createTodo.js";

export default class App extends Component {
	constructor(props) {

		super();
    this.state = {
     isLoggedIn: INITINFO.isLoggedIn,
		 login_noonce: INITINFO.loginNoonce
    }

		this.okNoLogPaths = [
			'/login/',
			'/create-account/',
			'/forgot-password/',
			"/reset-password/"
		];
		this.handleRoute = this.handleRoute.bind(this);

	}
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
console.log(this.props.user);
    return (
			<div>fasfasdf</div>
    );
  }
}

/*
<Router onChange={this.handleRoute}>
	<Home path="/" />
	<Home path="/index.php" />
	<Login path="/login/" UserContainer={props.user} isLoggedIn={props.user.state.isLoggedIn} noonce={props.user.state.login_noonce} />
	<ForgotPassword path="/forgot-password/" />
	<ResetPassword path="/reset-password/" />
	<EditAccount path="/create-account/"
		isLoggedIn={props.user.state.isLoggedIn}
		noonce={props.user.state.login_noonce}
		create={true}
		UserContainer={user}
	/>
	<Profile path="/profile/" user="me" />
	<Profile path="/profile/:user" />
</Router>
*/


/*
export default class App extends Component {
	constructor(props) {

		super();
    this.state = {
     isLoggedIn: INITINFO.isLoggedIn,
		 login_noonce: INITINFO.loginNoonce
    }

		this.okNoLogPaths = [
			'/login/',
			'/create-account/',
			'/forgot-password/',
			"/reset-password/"
		];
		this.handleRoute = this.handleRoute.bind(this);

	}

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
			<Provider>
				<Subscribe to={[UserContainer]}>
					{todos =>
						<div>ddff</div>
					}

				</Subscribe>

			</Provider>
		);
	}
}
*/

/*
<Provider>
<Subscribe to={[UserContainer]}>
{function(user){

 }.bind(this)
}
</Subscribe>
</Provider>
*/


/*

*/