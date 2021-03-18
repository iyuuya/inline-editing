import React from 'react';
import { v4 as uuid } from 'uuid';
import ReactTooltip from 'react-tooltip';
import { ContextMenu } from './ContextMenu';
import { AnimateIn, moreIcon } from '../Common';
import './ContextMenuToggle.css';

export class ContextMenuToggle extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			showDropdown: false,
			isUpper: false,
			height: ''
		};
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick);
	}

	handleClick = e => {
		const inToggle = this.toggle && this.toggle.contains(e.target);
		const inDropdown = this.dropdown && this.dropdown.contains(e.target);
		if (!inDropdown && !inToggle) {
			this.setState({ showDropdown: false });
		}
	};

	toggleDropdown = () => {
		const isUpper =
			window.innerHeight * 0.75 > this.toggle.getBoundingClientRect().top;
		this.setState(
			prevState => ({ showDropdown: !prevState.showDropdown, isUpper }),
			() => {
				const { height } = this.dropdown
					.querySelector('.dropdown-container')
					.getBoundingClientRect();
				this.setState({ height });
			}
		);
	};

	render() {
		const { isUpper, height } = this.state;
		const { fields, layout } = this.props;
		const id = uuid();

		const styles = isUpper ? { top: '40px' } : { top: `-${height + 60}px` };
		return (
			<React.Fragment>
				<div
					ref={el => (this.toggle = el)}
					className="utility-bar-item"
					onClick={this.toggleDropdown}
					data-tip="More Options"
					data-for={id}>
					{moreIcon}
				</div>

				<ReactTooltip id={id} effect="solid" />
				<AnimateIn show={this.state.showDropdown}>
					<div ref={el => (this.dropdown = el)}>
						<ContextMenu fields={fields} layout={layout} style={styles} />
					</div>
				</AnimateIn>
			</React.Fragment>
		);
	}
}
