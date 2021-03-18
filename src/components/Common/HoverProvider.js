import React from 'react';
import { Provider } from './HoverContext';

export class HoverProvider extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			field: null,
			selectedField: null,
			isHovered: false,
			danger: false,
			overlay: false,
			onMouseOver: this.handleMouseOver,
			onMouseLeave: this.handleMouseLeave,
			showOverlay: this.showOverlay,
			hideOverlay: this.hideOverlay
		};
	}

	componentDidMount() {
		document.addEventListener('click', this.handleSelection);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleSelection);
	}

	handleMouseOver = e => {
		const field = e.target.closest('.field');
		if (this.state.field !== field) {
			this.setState({ field });
		}
	};

	handleMouseLeave = e => {
		const field = e.target.closest('.field');
		if (this.state.field === field) {
			this.setState({ field: null });
		}
	};

	toggleDangerOverlay = e => {
		this.setState(prev => ({ danger: !prev.danger }));
	};

	showOverlay = e => {
		this.setState({ overlay: true });
		if (e.target.className === 'utility-bar-item trash') {
			this.setState({ danger: true });
		} else {
			this.setState({ danger: false });
		}
	};

	hideOverlay = () => {
		this.setState({ overlay: false, danger: false });
	};

	handleSelection = e => {
		const field = e.target.closest('.field');
		const section = e.target.closest('.section');
		this.setState({ selectedField: field, selectedSection: section });
		if (
			e.target.parentNode.className.includes &&
			e.target.parentNode.className.includes('utility-bar')
		) {
			this.setState({ danger: false, overlay: false });
		}
	};

	render() {
		return <Provider value={this.state}>{this.props.children}</Provider>;
	}
}
