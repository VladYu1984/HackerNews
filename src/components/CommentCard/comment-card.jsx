// @flow

import React from "react";
import {Button, Card} from "react-bootstrap";
import {isEmpty} from "lodash";
import parse from "html-react-parser";
import './styles.scss';
import {Spinner} from '../Spinner';
import type {Comment} from '../../types';
import {getDateFromTimestamp} from "../../helpers/get-date-from-timestamp";

type Props = {
	comment: Comment;
    isParent?: boolean;
	showAnswers?: () => void;
	children?: ReactNode;
}

export const CommentCard = ({isParent=true, comment, showAnswers, children, ...rest}: Props) => {

	let {by, time, kids, isLoadingChildren, showChildComment} = comment;
	
	const getBtnText = (isOpen: boolean) => {
		if (isOpen) {
			return 'Hide answers';
		}
		else return 'Show answers';
	};

	const getContent = (comment: CommentType) => {
		const {text, deleted, dead} = comment;

		if (deleted) {
			return 'This comment was deleted';
		}

		if (dead) {
			return 'Comment not available';
		}

		return parse(text);
	};

	return (
		<Card
			className={`comment ${isParent ? "parent" : "child"}`}
			border={isParent && "primary"}
			{...rest}>
			<Card.Body>
				<Card.Subtitle className="mb-2 color-grey">
					<span className="bold">{by}</span>{ by && ' | '}{getDateFromTimestamp(time)}
				</Card.Subtitle>
				<Card.Text className="bold color-dark-grey" as='span'>
					{getContent(comment)}
				</Card.Text>
				{ (!isEmpty(kids) && isParent) &&
                        <Button
                        	onClick={() => showAnswers(comment)}
                        	className="mt-20"
                        	variant="light"
                        >
                        	{ isLoadingChildren ? <Spinner size="sm" /> : getBtnText(showChildComment)}
                        </Button>
				}
				{children}
			</Card.Body>
		</Card>
	);
};