import React from 'react';
import {mount} from 'enzyme';
import {CommentCard} from "../index";

describe('CommentCard', () => {
	let wrapper;

	const comment = {
		id: 123,
		by: 'coolUser',
		text: 'someText',
		time: 1666689031,
		kids: [124],
		showChildComment: true
	};
	const childComment = {
		id: 124,
		by: 'coolUser124',
		text: 'someText124',
		time: 1666689031,
		parent: 123
	};
	const showAnswers = jest.fn();

	const getComponent = (parentComment: Comment) => {
		return mount(
			<CommentCard comment={parentComment} showAnswers={showAnswers}>
				<CommentCard comment={childComment} isParent={false}/>
			</CommentCard>);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});
	
	it('should render correct card', () => {
		wrapper = getComponent(comment);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render correct text when comment was deleted', () => {
		wrapper = getComponent({...comment, deleted: true, by: undefined});
		expect(wrapper.find('.card-text').at(0).text()).toBe('This comment was deleted');
	});

	it('should render correct text when comment is dead', () => {
		wrapper = getComponent({...comment, dead: true});
		expect(wrapper.find('.card-text').at(0).text()).toBe('Comment not available');
	});

	it('should call showAnswers with parent comment', () => {
		wrapper = getComponent(comment);
		wrapper.find('.comment .parent .btn').simulate('click');
		expect(showAnswers).toHaveBeenCalledWith(comment);
	});

	it('should render correct button text when comment tree is closed', () => {
		wrapper = getComponent({...comment, showChildComment: false});
		const result = wrapper.find('.comment .parent .btn').text();
		expect(result).toBe('Show answers');
	});

	it('should render spinner in button', () => {
		wrapper = getComponent({...comment, isLoadingChildren: true});
		const spinner = wrapper.find('.comment .parent .btn Spinner');
		expect(spinner).toHaveLength(1);
	});
});