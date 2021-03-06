import { h, Component } from 'preact';
import { Subscribe, Provider } from 'unstated'
import { Router, route } from 'preact-router';
import SnackBar from "SnackBar";

import UserContainer from "../containers/UserContainer.js";
import PlantContainer from "../containers/PlantContainer";
import SnackBarConainer from "../container/SnackBarContainer";

import Home from './home';
import Login from './login';
import ForgotPassword from './login/ForgotPassword.jsx';
import EditAccount from "./EditAccount/EditAccountForm.jsx";
import ChangePassword from "./EditAccount/ChangePassword.jsx";
import ResetPassword from './login/ResetPassword.jsx';
import Account from "./account/Account.jsx";
import EditPlant from "./plants/EditPlant";

import {findIndex} from "../util/array_helpers.js";
export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn : (INITINFO.isLoggedIn === true) ? true : false
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
		document.title = "PlantDaddy";

    if(!this.props.user.state.isLoggedIn && findIndex(this.okNoLogPaths, url) === false) {
      route('/login/', true);
      return false;
    }
    if(this.props.user.state.isLoggedIn && findIndex(this.okNoLogPaths,url) !== false) {
      route('/', true)
    }
    return false;
  }
  componentWillMount() {

    this.handleRoute();
  }
  render() {
    return (
        <Subscribe to={[UserContainer, PlantContainer,SnackBarContainer]}>
          {function(user, plant,snackbar) {
            return (
            <Router onChange={this.handleRoute.bind(this)}>
              <Home user={user} path="/" />
                <Home user={user.state.user} path="/index.php" />
              <Account user={user} path="/account/:id?/" />
              <Login  path="/login/" UserContainer={user} login_noonce={user.state.login_noonce}/>
              <ForgotPassword login_noonce={user.state.login_noonce} path="/forgot-password/" />
              <ResetPassword login_noonce={user.state.login_noonce} path="/reset-password/" />
              <EditAccount 
                path="/create-account/"
                create={true}
                uc={user}
              />
              <EditAccount path="/edit-account/" create={false} uc={user} />
              <ChangePassword user={user} path="/change-password/" />
							<EditPlant path="/create-plant/" create={true} pc={plants} uc={user} createSnackbBar={snackbar.createSnackBar} />
            </Router>
						<SnackBar snackbars={snackbar.state.snackbars} />
          )
        }.bind(this)}
      </Subscribe>
    );
  }
}
