import React from 'react';
import cx from 'classnames';
import { ContextMenuToggle } from './ContextMenuToggle';
import './UtilityBar.css';
import { Consumer } from '../Common/HoverContext';
export * from './AddButton';
export * from './UtilityBarItem';
export * from './FieldToggleItem';
export * from './LayoutChanger';

export const UtilityBar = ({
	actions = [],
	fields = [],
	layout,
	hasText = true,
	vertical
}) => {
	return (
		<Consumer>
			{({ showOverlay, hideOverlay, danger, isHovered }) => {
				const classNames = cx('utility-bar', {
					vertical,
					danger: danger && isHovered
				});

				return Boolean(actions.length || fields.length) ? (
					<div className="utility-bar-wrapper">
						<div
							className={classNames}
							onMouseOver={showOverlay}
							onMouseLeave={hideOverlay}>
							{actions}
							{Boolean(fields.length) && (
								<ContextMenuToggle
									fields={fields}
									layout={layout}
									hasText={hasText}
								/>
							)}
						</div>
					</div>
				) : null;
			}}
		</Consumer>
	);
};
