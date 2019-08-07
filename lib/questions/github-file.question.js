"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
var choice_1 = require("../models/choice");
function githubFileQuestion() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var listOfFiles;
        return tslib_1.__generator(this, function (_a) {
            listOfFiles = [
                { name: 'All main files (without license, changelog, todo and readme)', value: choice_1.UniversalChoiceValue.ALL },
                { name: 'License', value: choice_1.UniversalChoiceValue.LICENSE },
                { name: 'Changelog', value: choice_1.UniversalChoiceValue.CHANGELOG },
                { name: 'Contributing', value: choice_1.UniversalChoiceValue.CONTRIBUTING },
                { name: 'Code of conduct', value: choice_1.UniversalChoiceValue.CODE_OF_CONDUCT },
                { name: 'Todo', value: choice_1.UniversalChoiceValue.TODO },
                { name: 'Readme', value: choice_1.UniversalChoiceValue.README },
                { name: 'Bug report (issue)', value: choice_1.GithubChoiceValue.BUG_REPORT },
                { name: 'Feature request (issue)', value: choice_1.GithubChoiceValue.FEATURE_REQUEST },
                { name: 'Pull request', value: choice_1.GithubChoiceValue.PULL_REQUEST },
            ];
            return [2 /*return*/, inquirer_1.default.prompt([{
                        name: 'files',
                        type: 'list',
                        message: 'Which Github files do you want to generate?',
                        choices: listOfFiles
                    }])];
        });
    });
}
exports.githubFileQuestion = githubFileQuestion;
