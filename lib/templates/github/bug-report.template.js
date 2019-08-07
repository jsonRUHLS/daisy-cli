"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var path_1 = require("../../models/path");
var file_1 = require("../../models/file");
var BugReport = /** @class */ (function () {
    function BugReport(defaultTemplate) {
        this.defaultTemplate = defaultTemplate;
        this.fileName = file_1.FileName.BUG_REPORT;
        this.hasPath = true;
        this.pathOfFile = path_1.GithubPath.ISSUE_TEMPLATE;
    }
    BugReport.prototype.generateFile = function () {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent(), this.hasPath, this.pathOfFile);
    };
    BugReport.prototype.fileContent = function () {
        return "---\nname: Bug report\nabout: Create a report to help us improve\ntitle: ''\nlabels: ''\nassignees: ''\n\n---\n\n**Describe the bug**\nA clear and concise description of what the bug is.\n\n**To Reproduce**\nSteps to reproduce the behavior:\n1. Go to '...'\n2. Click on '....'\n3. Scroll down to '....'\n4. See error\n\n**Expected behavior**\nA clear and concise description of what you expected to happen.\n\n**Screenshots**\nIf applicable, add screenshots to help explain your problem.\n\n**Desktop (please complete the following information):**\n    - OS: [e.g. iOS]\n    - Browser [e.g. chrome, safari]\n    - Version [e.g. 22]\n\n**Smartphone (please complete the following information):**\n    - Device: [e.g. iPhone6]\n    - OS: [e.g. iOS8.1]\n    - Browser [e.g. stock browser, safari]\n    - Version [e.g. 22]\n\n**Additional context**\nAdd any other context about the problem here.\n        ";
    };
    BugReport = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('DefaultTemplate'))
    ], BugReport);
    return BugReport;
}());
exports.BugReport = BugReport;
