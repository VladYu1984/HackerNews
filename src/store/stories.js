import {createSlice} from '@reduxjs/toolkit';

export const storiesSlice = createSlice({
	name: 'stories',
	initialState: {
		value: []
	},
	reducers: {
		setStories: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const {setStories} = storiesSlice.actions;

export default storiesSlice.reducer;