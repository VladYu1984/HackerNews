// @flow

import React from "react";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {isEmpty} from "lodash";
import parse from "html-react-parser";
import './styles.scss';
import {Spinner} from "../Spinner";
import type {Story} from '../../types';
import {getDateFromTimestamp} from "../../helpers/get-date-from-timestamp";

type Props = {
    story: Story;
    isLoading?: boolean;
	asLink?: boolean;
	to?: string;
	fieldsToShow?: Array<string>;
}

export const StoryCard = ({isLoading=false, story, asLink=false, to, fieldsToShow=['all'], ...rest}: Props) => {

	let {title, score, by, time, url, text, descendants} = story;

	const shouldShowField = (key: string): boolean => {
		if (fieldsToShow.includes("all")) {
			return true;
		}

		return fieldsToShow.includes(key);
	};

	return (
		<Card
			className='story mt-10 mb-20'
			as={asLink ? Link : undefined}
			to={to}
			{...rest}
		>
			{
				isLoading ? <Spinner className="mt-20 mb-20" /> :
					!isEmpty(story) ?
						<Card.Body>
							<Card.Title className="color-orange">{title}</Card.Title>
							<Card.Subtitle className="mb-2 color-grey">{score} points | {by} | {getDateFromTimestamp(time)}</Card.Subtitle>
							{
								shouldShowField("url") &&
								<Card.Subtitle className="mb-2 color-grey">
									{url ? <a href={url} target="_blank" rel="noreferrer">Source</a> : 'No source'}
								</Card.Subtitle>
							}

							{
								shouldShowField("descendants") &&
								<Card.Subtitle className="mb-2 color-grey">Comment count: {descendants}</Card.Subtitle>
							}

							{
								shouldShowField("text") &&
								(text ?
									<Card.Text as='span' className="bold color-dark-grey">
										{parse(text)}
									</Card.Text>
									: <span className='bold color-dark-grey'>To read the text, visit the source</span>)
							}
						</Card.Body>
						: <h6 className="error mt-20 mb-20">Some troubles in loading story</h6>
			}
		</Card>
	);
};