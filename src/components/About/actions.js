import { v4 as uuid } from 'uuid';

const move = (arr, from, offset) => {
	arr.splice((from + offset: 1), 0, arr.splice(from, 1)[0]);
};

export const newItem = () => ({
	id: uuid(),
	img: {
		url: `https://source.unsplash.com/featured/?food/${uuid()}`,
		hidden: false
	},
	heading: {
		content: 'Specialty',
		hidden: false
	},
	text: {
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		hidden: false
	}
});

export const moveLeft = id => ({ data }) => {
	const pos = data.items.map(item => item.id).indexOf(id);
	move(data.items, pos, -1);
	return { data };
};

export const moveRight = id => ({ data }) => {
	const pos = data.items.map(item => item.id).indexOf(id);
	move(data.items, pos, 1);
	return { data };
};

export const addItem = ({ data }) => {
	data.items = data.items.concat(newItem());
	return { data };
};

export const duplicateItem = i => ({ data }) => {
	// data.items = data.items.concat(newItem());
	data.items.splice(i, 0, newItem());
	return { data };
};

export const removeItem = id => ({ data }) => {
	data.items = data.items.filter(item => item.id !== id);
	return { data };
};

export const updateImage = id => ({ data }) => {
	data.items.find(
		item => item.id === id
	).img.url = `https://source.unsplash.com/random/${uuid()}`;

	return { data };
};

export const toggleField = key => ({ data }) => {
	data[key].hidden = !data[key].hidden;
	return { data };
};

export const toggleGroupField = (key, id) => ({ data }) => {
	const item = data.items.find(item => item.id === id);
	item[key].hidden = !item[key].hidden;
	return { data };
};
