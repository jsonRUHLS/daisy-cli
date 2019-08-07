"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var choice_1 = require("./models/choice");
var questions_1 = require("./questions");
var console_message_1 = require("./models/console-message");
var DaisyCLI = /** @class */ (function () {
    function DaisyCLI(logger, codeOfConduct, license, contributing, bugReport, featureRequest, pullRequest, todo, readme, changelog) {
        this.logger = logger;
        this.codeOfConduct = codeOfConduct;
        this.license = license;
        this.contributing = contributing;
        this.bugReport = bugReport;
        this.featureRequest = featureRequest;
        this.pullRequest = pullRequest;
        this.todo = todo;
        this.readme = readme;
        this.changelog = changelog;
        this.logger.showTitleAndBanner();
        this.executeDaisyCLI();
    }
    DaisyCLI.prototype.executeDaisyCLI = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.githubActions()];
            });
        });
    };
    DaisyCLI.prototype.githubActions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var githubFileAnswer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, questions_1.githubFileQuestion()];
                    case 1:
                        githubFileAnswer = _a.sent();
                        switch (githubFileAnswer.files) {
                            case choice_1.UniversalChoiceValue.ALL: {
                                this.logger.showInfo(console_message_1.ConsoleMessage.START_GENERATING);
                                this.codeOfConduct.generateFile();
                                this.contributing.generateFile();
                                this.bugReport.generateFile();
                                this.featureRequest.generateFile();
                                return [2 /*return*/, this.pullRequest.generateFile()];
                            }
                            case choice_1.UniversalChoiceValue.LICENSE: {
                                return [2 /*return*/, this.license.generateLicense()];
                            }
                            case choice_1.UniversalChoiceValue.CHANGELOG: {
                                return [2 /*return*/, this.changelog.generateFile()];
                            }
                            case choice_1.UniversalChoiceValue.CONTRIBUTING: {
                                return [2 /*return*/, this.contributing.generateFile()];
                            }
                            case choice_1.UniversalChoiceValue.CODE_OF_CONDUCT: {
                                return [2 /*return*/, this.codeOfConduct.generateFile()];
                            }
                            case choice_1.UniversalChoiceValue.TODO: {
                                return [2 /*return*/, this.todo.generateFile()];
                            }
                            case choice_1.UniversalChoiceValue.README: {
                                return [2 /*return*/, this.readme.generateFile()];
                            }
                            case choice_1.GithubChoiceValue.BUG_REPORT: {
                                return [2 /*return*/, this.bugReport.generateFile()];
                            }
                            case choice_1.GithubChoiceValue.FEATURE_REQUEST: {
                                return [2 /*return*/, this.featureRequest.generateFile()];
                            }
                            case choice_1.GithubChoiceValue.PULL_REQUEST: {
                                return [2 /*return*/, this.pullRequest.generateFile()];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DaisyCLI = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('Logger')),
        tslib_1.__param(1, inversify_1.inject('CodeOfConduct')),
        tslib_1.__param(2, inversify_1.inject('License')),
        tslib_1.__param(3, inversify_1.inject('Contributing')),
        tslib_1.__param(4, inversify_1.inject('BugReport')),
        tslib_1.__param(5, inversify_1.inject('FeatureRequest')),
        tslib_1.__param(6, inversify_1.inject('PullRequest')),
        tslib_1.__param(7, inversify_1.inject('ToDo')),
        tslib_1.__param(8, inversify_1.inject('Readme')),
        tslib_1.__param(9, inversify_1.inject('Changelog'))
    ], DaisyCLI);
    return DaisyCLI;
}());
exports.DaisyCLI = DaisyCLI;
