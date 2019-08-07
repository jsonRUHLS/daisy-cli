"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var file_1 = require("../../models/file");
var childProcess = tslib_1.__importStar(require("child_process"));
var Changelog = /** @class */ (function () {
    function Changelog(defaultTemplate) {
        this.defaultTemplate = defaultTemplate;
        this.fileName = file_1.FileName.CHANGELOG;
    }
    Changelog.prototype.generateFile = function () {
        this.defaultTemplate.generateFile(this.fileName, this.generateFileContent());
    };
    Changelog.prototype.generateFileContent = function () {
        var gitLogCommand = 'git log --pretty=format:"%h%n%d%n%an%n%s%n%ai%n%b%ae%n%n" --no-merges -z';
        var gitLog = childProcess.execSync(gitLogCommand).toString().trim();
        return this.JSONToMarkdown(gitLog).replace(/,/g, '');
    };
    ;
    Changelog.prototype.JSONToMarkdown = function (gitLog) {
        var newLine = '\n';
        var json = this.gitLogToJSON(gitLog);
        return "# Changelog \n        \n" + json.map(function (commit) {
            return "__Commit:__ [" + commit.hash + "](" + commit.hash + "):  \n__Message:__ " + commit.message + "  \n__Author:__ " + commit.author + " on " + commit.date + " " + newLine + " " + newLine;
        });
    };
    ;
    Changelog.prototype.gitLogToJSON = function (gitLog) {
        return gitLog.split('\0').map(function (commit) {
            var commitParts = commit.split('\n');
            var hash = commitParts[0], author = commitParts[2], message = commitParts[3], date = commitParts[4], mail = commitParts[5];
            return { hash: hash, author: author, message: message, date: date, mail: mail };
        });
    };
    ;
    Changelog = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('DefaultTemplate'))
    ], Changelog);
    return Changelog;
}());
exports.Changelog = Changelog;
