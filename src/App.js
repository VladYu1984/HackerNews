import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Main, Layout, SingleStory} from "./pages";
import './App.scss';
import {MAIN_PAGE_PATH, ROOT_PATH, SINGLE_STORY_PAGE_PATH} from "./routing/constants";

export const  App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROOT_PATH} element={<Layout/>}>
					<Route index element={<Navigate to={MAIN_PAGE_PATH} replace />}/>
					<Route path={MAIN_PAGE_PATH} element={<Main/>}/>
					<Route path={SINGLE_STORY_PAGE_PATH} element={<SingleStory />}/>
					<Route path="*" element={<Navigate to={MAIN_PAGE_PATH} replace />}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

