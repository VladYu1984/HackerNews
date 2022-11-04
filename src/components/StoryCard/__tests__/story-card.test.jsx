import React from 'react';
import {mount} from 'enzyme';
import {BrowserRouter} from "react-router-dom";
import {StoryCard} from "../index";
import {MAIN_PAGE_PATH} from "../../../routing/constants";

describe('StoryCard', () => {
	let wrapper;

	const story = {
		id: 123,
		title: 'someTitle',
		by: 'someUser',
		time: '1662661417',
		score: 2
	};
    
	it('should render correct StoryCard', () => {
		const props = {
			story,
			fieldsToShow: ['id', 'title', 'by', 'time', 'score'],
			asLink: true,
			to: `${MAIN_PAGE_PATH}/${story.id}`
		};
		wrapper = mount(
			<BrowserRouter>
				<StoryCard {...props} />
			</BrowserRouter>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render correct StoryCard with all props', () => {
		const props = {
			story: {
				...story,
				kids: [],
				text: "someText",
				url: "https://reactjs.org/",
				descendants: 0
			}
		};
		wrapper = mount(<StoryCard {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render without url', () => {
		const props = {
			story: {
				...story,
				kids: [],
				text: "someText",
				descendants: 0
			}
		};
		wrapper = mount(<StoryCard {...props} />);
		expect(wrapper.find('a')).toHaveLength(0);
	});

	it('should render without text', () => {
		const props = {
			story: {
				...story,
				kids: [],
				descendants: 0
			}
		};
		const expected = "To read the text, visit the source";
		wrapper = mount(<StoryCard {...props} />);
		expect(wrapper.text()).toMatch(expected);
	});
	
	it('should render story with error', () => {
		wrapper = mount(<StoryCard story={{}} />);
		const expected = "Some troubles in loading story";
		expect(wrapper.text()).toBe(expected);
	});

	it('should render Spinner', () => {
		wrapper = mount(<StoryCard isLoading={true} story={{}} />);
		expect(wrapper.find('Spinner')).toHaveLength(1);
	});
});