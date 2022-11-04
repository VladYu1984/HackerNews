// @flow

import React from "react";
import {Spinner} from "react-bootstrap";

type Props = {
	variant?: string;
}

export const SpinnerComponent = ({variant = "secondary", ...rest}: Props) => {

	return (
		<div className="spinner">
			<Spinner animation="border" variant={variant} {...rest} />
		</div>
	);
};