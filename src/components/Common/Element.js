import React from 'react';
import { AnimateIn } from './AnimateIn';
import { getSelectionCoords } from '../../utils';
import { ContentState, convertToRaw } from 'draft-js';
import { MegadraftEditor, editorStateFromRaw, Toolbar } from 'megadraft';
import 'megadraft/dist/css/megadraft.css';

class Coolbar extends Toolbar {
	constructor() {
		super(...arguments);
	}

	componentWillReceiveProps(nextProps) {
		const currentContentState = this.props.editorState.getCurrentContent();
		const newContentState = nextProps.editorState.getCurrentContent();

		if (currentContentState === newContentState) {
			this.shouldUpdatePos = true;
			this.setState({
				show: true
			});
		}
	}

	setBarPosition() {
		const editor = this.props.editor;
		const toolbar = this.toolbarEl;
		const selectionCoords = getSelectionCoords(editor, toolbar);
		if (!selectionCoords) {
			return null;
		}

		if (
			(selectionCoords && !this.state.position) ||
			this.state.position.top !== selectionCoords.offsetTop ||
			this.state.position.left !== selectionCoords.offsetLeft ||
			this.state.arrowStyle !== selectionCoords.arrowStyle ||
			!this.state.show
		) {
			this.setState({
				show: true,
				position: {
					top: selectionCoords.offsetTop,
					left: selectionCoords.offsetLeft
				},
				arrowStyle: selectionCoords.arrowStyle
			});
		}
	}
}

export class Element extends React.Component {
	static defaultProps = {
		value: 'Hello World',
		handleChange: () => {}
	};

	constructor() {
		super(...arguments);
		this.state = {
			length: this.props.value.length,
			isFocused: false,
			editorState: editorStateFromRaw(
				convertToRaw(ContentState.createFromText(this.props.value))
			)
		};
	}

	onChange = editorState => {
		const length = editorState.getCurrentContent().getPlainText('').length;
		this.setState({ editorState, length });
	};

	handleBlur = e => {
		const hasText = this.state.editorState.getCurrentContent().hasText();
		this.props.handleChange(hasText);
	};

	render() {
		const { editorState, length, isFocused } = this.state;
		const { maxChars } = this.props;
		const showError = maxChars && length > maxChars;

		const errorMessage = (
			<AnimateIn animation="slide" show={showError}>
				<div className="error-message">You typed too much text </div>
			</AnimateIn>
		);

		return (
			<span className="element">
				<MegadraftEditor
					ref="editor"
					onFocus={() => this.setState({ isFocused: true })}
					onBlur={() => this.setState({ isFocused: false })}
					shouldDisplayToolbarFn={() => isFocused}
					placeholder={this.props.placeholder}
					editorState={editorState}
					onChange={this.onChange}
					sidebarRendererFn={() => null}
					Toolbar={Coolbar}
					{...this.props}
				/>
			</span>
		);
	}
}
