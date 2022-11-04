// @flow

import React from 'react';
import {Outlet} from 'react-router-dom';
import './styles.scss';

export const Layout = () => {
	return (
		<>
			<div className='layout bg-orange'>
				<h2 className="color-white">HACKER NEWS</h2>
			</div>
			<Outlet/>
		</>
	);
};