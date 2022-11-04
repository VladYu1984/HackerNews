import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './stories';

export default configureStore({
	reducer: {
		stories: storiesReducer
	}
});