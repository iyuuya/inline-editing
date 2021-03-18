import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import * as actions from './components/actions';
import animate, { delay, stop } from './components/AddSection/animate';
import {
	HoverProvider,
	HeaderSection,
	AboutSection,
	ContentSection,
	FooterSection,
	Menu,
	UtilityBarItem,
	AddSectionFlyout
} from './components';
import './styles.css';

const data = [
	{
		id: uuid(),
		Component: ContentSection
	},
	{
		id: uuid(),
		Component: AboutSection
	},
	{
		id: uuid(),
		Component: Menu
	}
];

class App extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			data,
			showFlyout: false,
			selectedIndex: 'Recommended'
		};
	}

	toggleFlyout = () => {
		this.resetAnimation();
		this.setState(state => ({ showFlyout: !state.showFlyout }));
		delay(300).then(this.animateIn);
	};

	handleSelect = selectedIndex => {
		this.resetAnimation();
		this.setState({ selectedIndex });
		delay(100).then(this.animateIn);
	};

	handleChange = ({ target }) => {
		this.resetAnimation();
		this.setState({ selectedIndex: target.value });
		delay(100).then(this.animateIn);
	};

	animateIn = () => {
		animate({
			elements: '.widget-preview-wrapper',
			easing: 'in-out-cubic',
			duration: 800,
			delay: index => index * 120,
			opacity: [0, 1],
			transform: ['translateY(-40px)', 'translateY(0px)']
		});
	};

	resetAnimation = () => {
		document.querySelectorAll('.widget-preview-wrapper').forEach(el => {
			stop(el);
			el.style.opacity = 0;
		});
	};

	removeItem = id => {
		if (window.confirm('Are you sure you want to delete this section?')) {
			this.setState(actions.removeItem(id));
		}
	};

	moveItemUp = (id, e) => {
		const section = e.target.closest('.section');
		this.setState(actions.moveLeft(id), () => {
			this.scrollToSection(section);
		});
	};

	moveItemDown = (id, e) => {
		const section = e.target.closest('.section');
		this.setState(actions.moveRight(id), () => {
			this.scrollToSection(section);
		});
	};

	scrollToSection = section => {
		section && section.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	render() {
		const { showFlyout, selectedIndex } = this.state;
		return (
			<React.Fragment>
				<div className={showFlyout ? 'show-add-section' : ''}>
					<HoverProvider>
						<div className="website">
							<HeaderSection />
							{this.state.data.map(({ Component, id }, i) => (
								<Component
									index={i}
									key={id}
									addSection={this.toggleFlyout}
									actions={[
										<UtilityBarItem
											disabled={i < 1}
											icon="up"
											key="up"
											itemId={id}
											message="Move Section Up"
											action={this.moveItemUp}
											el={this.el}
										/>,
										<UtilityBarItem
											disabled={i === this.state.data.length - 1}
											icon="down"
											key="down"
											message="Move Section Down"
											itemId={id}
											action={this.moveItemDown}
										/>,
										<UtilityBarItem
											icon="trash"
											key="trash"
											message="Delete Section"
											itemId={id}
											action={this.removeItem}
										/>
										// <UtilityBarItem icon="more" key="more" />
									]}
								/>
							))}
							<FooterSection />
						</div>

						<AddSectionFlyout
							toggleFlyout={this.toggleFlyout}
							handleSelect={this.handleSelect}
							handleChange={this.handleChange}
							selectedIndex={selectedIndex}
						/>
					</HoverProvider>
				</div>
				<div className="portal-cotainer" />
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
