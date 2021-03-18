import React, { PureComponent } from 'react';
import cx from 'classnames';
import { UtilityBar } from '../UtilityBar/';

export class Base extends PureComponent {
	render() {
		const {
			isHovered,
			isSelected,
			overlay,
			danger,
			className,
			children,
			actions,
			...props
		} = this.props;
		const classNames = cx(
			'base',
			{
				hover: isHovered,
				selected: isSelected,
				danger: danger && isHovered,
				overlay
			},
			className
		);
		return (
			<div className={classNames} {...props}>
				<UtilityBar
					handleMouseOver={this.handleMouseOver}
					actions={actions}
					// fields={this.props.fields}
				/>
				{children}
			</div>
		);
	}
}
