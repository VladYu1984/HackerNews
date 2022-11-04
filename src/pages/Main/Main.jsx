// @flow

import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {Button, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {isEmpty, isNull, pick} from 'lodash';
import './styles.scss';
import type {Story} from '../../types';
import {setStories} from '../../store/stories';
import {ITEM, NEW_STORIES} from "../../API/constants";
import {MINUTE} from "../../constants/time";
import {MAIN_PAGE_PATH} from '../../routing/constants';
import {StoryCard} from "../../components/StoryCard";

const STORIES_NUMBER = 100;

export const Main = () => {

	const stories = useSelector(state => state.stories.value);
	const dispatch = useDispatch();

	const [isLoading, setLoading] = useState(stories.length <= 0);

	let location = useLocation();

	const fieldsToShowInCard = ['id', 'title', 'by', 'time', 'score'];

	let timer;

	useEffect(() => {
		loadStoriesEachMinute();
		return () => clearTimeout(timer);
	}, [location?.pathname]);

	const loadStoriesEachMinute = () => {
		loadNewStories();
		timer = setTimeout(loadStoriesEachMinute, MINUTE);
	};

	const loadNewStories = (event = undefined) => {

		if (event) {
			setLoading(true);
		}

		axios(NEW_STORIES())
			.then(async ({data}) => {
				const newestStories = [...data.slice(0, STORIES_NUMBER)];
				let loadedStories = [];
				const promises = newestStories.map(loadOneStory);
				await Promise.allSettled(promises)
					.then(data =>
						loadedStories = data
							.filter(({status})=> status === 'fulfilled')
							.map(({value}) => value)
					)
					.finally(() => {
						dispatch(setStories(loadedStories));
						setLoading(false);
					});
			})
			.catch((err) => console.error(err));
	};

	const loadOneStory = (id: string | number) => {
		return new Promise((resolve, reject)=> {
			axios(ITEM(id))
				.then(({data}) => !isNull(data) ? resolve(data) : reject())
				.catch(err => reject(err));
		});
	};

	const getFieldsToShowInCard = (fields, story) => {
		return pick(story, fields);
	};

	return (
		<div className="main">
			<div className='content'>
				<div className='header bg-white'>
					<h4 className="color-grey2">Latest news</h4>
					<Button onClick={(e) => loadNewStories(e)} variant="outline-success">Update news</Button>
				</div>

				<div className='cards mt-10'>
					{isLoading ? <Spinner animation="border" variant="secondary" className="mt-20" /> :
						(!isEmpty(stories)) ? stories.map((story: Story) =>
							<StoryCard
								story={getFieldsToShowInCard(fieldsToShowInCard, story)}
								key={story.id}
								asLink
								to={`${MAIN_PAGE_PATH}/${story.id}`}
								fieldsToShow={fieldsToShowInCard}
							/>
						) : <h5 className="mt-20">No stories found</h5>
					}
				</div>

			</div>
		</div>);
};