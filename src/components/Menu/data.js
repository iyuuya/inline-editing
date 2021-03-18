import { v4 as uuid } from 'uuid';
export default {
	heading: {
		content: 'Menu / Price List',
		hidden: false
	},
	subheading: {
		content: 'Add a footnote about this group',
		hidden: false
	},
	categories: [
		{
			categoryId: uuid(),
			heading: {
				content: 'First Category',
				hidden: false
			},
			subheading: {
				content: 'Add a description about this category',
				hidden: false
			},
			items: [
				{
					id: uuid(),
					heading: {
						content: 'First Item',
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
				},
				{
					id: uuid(),
					heading: {
						content: 'Second Item',
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
				}
			]
		},
		{
			categoryId: uuid(),
			heading: {
				content: 'Second Category',
				hidden: false
			},
			subheading: {
				content: 'Add a description about this category',
				hidden: false
			},
			items: [
				{
					id: uuid(),
					heading: {
						content: 'First Item',
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
				},
				{
					id: uuid(),
					heading: {
						content: 'Second Item',
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
				}
			]
		}
	]
};
