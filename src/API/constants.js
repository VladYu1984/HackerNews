// @flow

type ID = number | string;

const BASE = 'https://hacker-news.firebaseio.com/v0';

export const NEW_STORIES = () => `${BASE}/newstories.json`;
export const ITEM = (id: ID)=> `${BASE}/item/${id}.json`;