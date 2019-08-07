"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
function overwriteFileQuestion() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, inquirer_1.default.prompt([{
                        name: 'overwrite',
                        type: 'confirm',
                        message: 'This file already exists. Do you want to overwrite it?',
                        default: false
                    }])];
        });
    });
}
exports.overwriteFileQuestion = overwriteFileQuestion;
