"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var daisy_cli_1 = require("./daisy-cli");
var logger_util_1 = require("./utils/logger.util");
var code_of_conduct_template_1 = require("./templates/universal/code-of-conduct.template");
var license_template_1 = require("./templates/universal/license.template");
var checker_util_1 = require("./utils/checker.util");
var contributing_template_1 = require("./templates/universal/contributing.template");
var bug_report_template_1 = require("./templates/github/bug-report.template");
var feature_request_template_1 = require("./templates/github/feature-request.template");
var pull_request_template_1 = require("./templates/github/pull-request.template");
var default_template_1 = require("./templates/default/default.template");
var todo_template_1 = require("./templates/universal/todo.template");
var readme_template_1 = require("./templates/universal/readme.template");
var changelog_template_1 = require("./templates/universal/changelog.template");
function index() {
    var container = new inversify_1.Container();
    // Utils
    container.bind('Logger').to(logger_util_1.Logger).inSingletonScope();
    container.bind('Checker').to(checker_util_1.Checker).inSingletonScope();
    // Default Template
    container.bind('DefaultTemplate').to(default_template_1.DefaultTemplate).inSingletonScope();
    // Universal Templates (Github, Gitlab and Bitbucket)
    container.bind('License').to(license_template_1.License).inSingletonScope();
    container.bind('Contributing').to(contributing_template_1.Contributing).inSingletonScope();
    container.bind('CodeOfConduct').to(code_of_conduct_template_1.CodeOfConduct).inSingletonScope();
    container.bind('ToDo').to(todo_template_1.ToDo).inSingletonScope();
    container.bind('Readme').to(readme_template_1.Readme).inSingletonScope();
    container.bind('Changelog').to(changelog_template_1.Changelog).inSingletonScope();
    // Github Templates
    container.bind('BugReport').to(bug_report_template_1.BugReport).inSingletonScope();
    container.bind('FeatureRequest').to(feature_request_template_1.FeatureRequest).inSingletonScope();
    container.bind('PullRequest').to(pull_request_template_1.PullRequest).inSingletonScope();
    // DaisyCLI
    container.bind('DaisyCLI').to(daisy_cli_1.DaisyCLI).inSingletonScope();
    return container.get('DaisyCLI');
}
exports.index = index;
;
index();
