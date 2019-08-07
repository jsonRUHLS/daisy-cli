"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var path_1 = require("../../models/path");
var file_1 = require("../../models/file");
var PullRequest = /** @class */ (function () {
    function PullRequest(defaultTemplate) {
        this.defaultTemplate = defaultTemplate;
        this.fileName = file_1.FileName.PULL_REQUEST;
        this.hasPath = true;
        this.pathOfFile = path_1.GithubPath.PULL_REQUEST_TEMPLATE;
    }
    PullRequest.prototype.generateFile = function () {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent(), this.hasPath, this.pathOfFile);
    };
    PullRequest.prototype.fileContent = function () {
        return "* **Please check if the PR fulfills these requirements**\n- [ ] The commit message follows our guidelines\n- [ ] Tests for the changes have been added (for bug fixes / features)\n- [ ] Docs have been added / updated (for bug fixes / features)\n\n\n* **What kind of change does this PR introduce?** (Bug fix, feature, docs update, ...)\n\n\n\n* **What is the current behavior?** (You can also link to an open issue here)\n\n\n\n* **What is the new behavior (if this is a feature change)?**\n\n\n\n* **Does this PR introduce a breaking change?** (What changes might users need to make in their application due to this PR?)\n\n\n\n* **Other information**:\n        ";
    };
    PullRequest = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('DefaultTemplate'))
    ], PullRequest);
    return PullRequest;
}());
exports.PullRequest = PullRequest;
