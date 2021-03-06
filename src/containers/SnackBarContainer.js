import { Container } from 'unstated';


export default class SnackBarContainer extends Container {
	state = {
		snackbars: []
	}

	createSnackBar(obj) {
		if(!obj.text) {
			return false;
		}
		let snackbars = this.state.snackbars.slice();
		let stamp = Date.now();
		snackbars.push({
			text: obj.text,
			kind: obj.kind || "neutral",
			stamp: stamp
		})
		this.setState({snackbars: snackbars});
		setTimeout(function() {
			let snackbars = this.state.snackbars.filter(function(e) {
				return e.stams !== stamp;
			});
			this.setState({snackbars: snackbars});
		}.bind(this), 3000);
	}
	
	
	
	
}
