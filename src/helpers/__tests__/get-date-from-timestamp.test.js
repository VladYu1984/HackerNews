import {getDateFromTimestamp} from "../get-date-from-timestamp";

describe('getDateFromTimestamp', () => {
	it('should return correct date (without adding zeros)', () => {
		const result = getDateFromTimestamp('1665512617');
		const expected = '11.10.2022';
		expect(result).toBe(expected);
	});

	it('should return correct date (by adding zeros)', () => {
		const result = getDateFromTimestamp('1662575017');
		const expected = '07.09.2022';
		expect(result).toBe(expected);
	});
});