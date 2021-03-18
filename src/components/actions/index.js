import { v4 as uuid } from 'uuid';

const move = (arr, from, offset) => {
	arr.splice((from + offset: 1), 0, arr.splice(from, 1)[0]);
};

export const newItem = () => ({
	id: uuid(),
	img: {
		url: `https://source.unsplash.com/random/${uuid()}`,
		hidden: false
	},
	heading: {
		content: 'Ready Your Pack',
		hidden: false
	},
	text: {
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		hidden: false
	}
});

export const moveLeft = id => ({ data }) => {
	const pos = data.map(item => item.id).indexOf(id);
	move(data, pos, -1);
	return { data };
};

export const moveRight = id => ({ data }) => {
	const pos = data.map(item => item.id).indexOf(id);
	move(data, pos, 1);
	return { data };
};

export const addItem = prevState => ({
	data: prevState.data.concat(newItem())
});

export const removeItem = id => prevState => {
	const data = prevState.data.filter(item => item.id !== id);
	return { data };
};

export const updateImage = id => ({ data }) => {
	data.find(
		item => item.id === id
	).img.url = `https://source.unsplash.com/random/${uuid()}`;

	return { data };
};

export const toggleGroupField = (key, id) => ({ data }) => {
	const item = data.find(item => item.id === id);
	item[key].hidden = !item[key].hidden;
	return { data };
};
