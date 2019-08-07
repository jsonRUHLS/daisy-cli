"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
function userNameQuestion() {
    return inquirer_1.default.prompt([{
            name: 'userName',
            type: 'input',
            message: 'Please fill in your Git username:',
        }]);
}
exports.userNameQuestion = userNameQuestion;
