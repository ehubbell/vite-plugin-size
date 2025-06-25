import { isEven, isOdd, toCurrency, toNumber } from '../src/index';

describe('isEven', () => {
	it('should return true', () => {
		const result = isEven(20);
		expect(result).toEqual(true);
	});
});

describe('isOdd', () => {
	it('should return true', () => {
		const result = isOdd(21);
		expect(result).toEqual(true);
	});
});

describe('toCurrency', () => {
	it('should contain a $', () => {
		const result = toCurrency(21);
		expect(result).toContain('$');
	});
});

describe('toNumber', () => {
	it('should contain a formatted number', () => {
		const result = toNumber(21.65784383, 2);
		expect(result).toEqual('21.66');
	});
});
