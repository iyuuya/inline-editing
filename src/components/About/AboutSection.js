import React from 'react';
import * as actions from './actions';
import { UtilityBarItem, FieldToggleItem } from '../UtilityBar/';
import { Section, Group, Element } from '../index';
import { AboutCard } from './AboutCard';
import './AboutSection.css';

const items = Array.from({ length: 3 }).map(item => actions.newItem());
const initialData = {
	heading: {
		content: 'Our Specialties',
		hidden: false
	},
	items
};

export class AboutSection extends React.Component {
	static defaultProps = {
		maxItems: 6
	};

	constructor() {
		super(...arguments);
		this.state = {
			data: initialData
		};
	}

	updateImage = id => {
		this.setState(actions.updateImage(id));
	};

	addItem = () => {
		this.setState(actions.addItem);
	};

	duplicateItem = (id, e, i) => {
		this.setState(actions.duplicateItem(i));
	};

	removeItem = id => {
		if (window.confirm('Are you sure you want to delete this group?')) {
			this.setState(actions.removeItem(id));
		}
	};

	moveItemLeft = id => {
		this.setState(actions.moveLeft(id));
	};

	moveItemRight = id => {
		this.setState(actions.moveRight(id));
	};

	toggleGroup = (key, id) => {
		this.setState(actions.toggleGroupField(key, id));
	};

	toggleField = key => {
		this.setState(actions.toggleField(key));
	};

	render() {
		const { data } = this.state;
		const fields = [
			<FieldToggleItem
				key="headding-toggle"
				field="heading"
				hidden={data.heading.hidden}
				handleToggle={this.toggleField}
			/>
		];

		return (
			<Section layout="about" actions={this.props.actions} {...this.props}>
				<div className="about-section">
					<div className="container">
						{!data.heading.hidden && (
							<h2>
								<Element
									value="The Total Experience"
									placeholder="Enter a heading"
								/>
							</h2>
						)}
						<div className="about-items">
							{data.items.map(({ id, ...item }, i) => {
								return (
									<Group
										key={id}
										fields={Object.keys(item).map(key => {
											return (
												<FieldToggleItem
													key={key}
													id={id}
													field={key}
													hidden={item[key].hidden}
													handleToggle={this.toggleGroup}
												/>
											);
										})}
										actions={[
											<UtilityBarItem
												key="about-add-item"
												icon="duplicate"
												message="Duplicate Group"
												action={this.duplicateItem}
												itemId={id}
												itemIndex={i}
											/>,
											<UtilityBarItem
												key="about-left"
												disabled={i < 1}
												icon="left"
												message="Move Group Left"
												action={this.moveItemLeft}
												itemId={id}
											/>,
											<UtilityBarItem
												key="about-right"
												disabled={i === data.items.length - 1}
												icon="right"
												message="Move Group Right"
												action={this.moveItemRight}
												itemId={id}
											/>,
											<UtilityBarItem
												key="about-trash"
												icon="trash"
												message="Delete Group"
												action={this.removeItem}
												itemId={id}
											/>
										]}>
										<AboutCard {...item} />
									</Group>
								);
							})}
						</div>
					</div>
				</div>
			</Section>
		);
	}
}
