"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
describe('isEven', function () {
    it('should return true', function () {
        var result = (0, index_1.isEven)(20);
        expect(result).toEqual(true);
    });
});
describe('isOdd', function () {
    it('should return true', function () {
        var result = (0, index_1.isOdd)(21);
        expect(result).toEqual(true);
    });
});
describe('toCurrency', function () {
    it('should contain a $', function () {
        var result = (0, index_1.toCurrency)(21);
        expect(result).toContain('$');
    });
});
describe('toNumber', function () {
    it('should contain a formatted number', function () {
        var result = (0, index_1.toNumber)(21.65784383, 2);
        expect(result).toEqual('21.66');
    });
});
