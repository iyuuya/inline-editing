import { v4 as uuid } from 'uuid';

const move = (arr, from, offset) => {
	arr.splice((from + offset: 1), 0, arr.splice(from, 1)[0]);
};

const newItem = () => ({
	id: uuid(),
	heading: {
		content: 'New Item',
		hidden: false
	},
	subheading: {
		content: 'Add a description about this item',
		hidden: false
	},
	price: {
		content: '12',
		hidden: false
	}
});

const newCategory = () => ({
	categoryId: uuid(),
	heading: {
		content: 'New Category',
		hidden: false
	},
	subheading: {
		content: 'Add a description about this category',
		hidden: false
	},
	items: [newItem(), newItem()]
});

export const addItem = id => ({ data }) => {
	data.categories
		.find(category => category.categoryId === id)
		.items.push(newItem());
	return { data };
};

export const duplicateItem = (id, e, i) => ({ data }) => {
	data.categories
		.find(category => category.categoryId === id)
		.items.splice(i, 0, newItem());
	return { data };
};

export const removeItem = id => ({ data }) => {
	data.categories.forEach(category => {
		category.items = category.items.filter(item => item.id !== id);
	});

	return { data };
};

export const moveItemLeft = id => ({ data }) => {
	data.categories.forEach(category => {
		const pos = category.items.map(item => item.id).indexOf(id);
		move(category.items, pos, -1);
	});

	return { data };
};

export const moveItemRight = id => ({ data }) => {
	data.categories.forEach(category => {
		const pos = category.items.map(item => item.id).indexOf(id);
		move(category.items, pos, 1);
	});

	return { data };
};

export const addCategory = ({ data }) => {
	data.categories.push(newCategory());
	return { data };
};

export const duplicateCategory = (id, e, i) => ({ data }) => {
	data.categories.splice(i, 0, newCategory());
	return { data };
};

export const removeCategory = id => ({ data }) => {
	data.categories = data.categories.filter(
		category => category.categoryId !== id
	);
	return { data };
};

export const moveCategoryLeft = id => ({ data }) => {
	const pos = data.categories.map(item => item.id).indexOf(id);
	move(data.categories, pos, -1);
	return { data };
};

export const moveCategoryRight = id => ({ data }) => {
	const pos = data.categories.map(item => item.id).indexOf(id);
	move(data.categories, pos, 1);
	return { data };
};

export const toggleField = key => ({ data }) => {
	data[key].hidden = !data[key].hidden;
	return { data };
};

export const toggleCategoryField = (key, id) => ({ data }) => {
	const item = data.categories.find(item => item.categoryId === id);
	item[key].hidden = !item[key].hidden;
	return { data };
};

export const toggleItemField = (key, id) => ({ data }) => {
	data.categories.forEach(category => {
		const item = category.items.find(item => item.id === id);
		item[key].hidden = !item[key].hidden;
	});
	return { data };
};
