"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var file_1 = require("../../models/file");
var Contributing = /** @class */ (function () {
    function Contributing(defaultTemplate) {
        this.defaultTemplate = defaultTemplate;
        this.fileName = file_1.FileName.CONTRIBUTING;
    }
    Contributing.prototype.generateFile = function () {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    };
    Contributing.prototype.fileContent = function () {
        return "## Contributing\n\nFirst fork this project.  \n\n* git clone <your-forked-repo>\n* npm install\n\n* git checkout -b my-fix\n\n#### fix some code...\n\n* git commit -m \"added this feature\"\n* git push origin my-fix\n\nLastly, open a pull request on Github.";
    };
    Contributing = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('DefaultTemplate'))
    ], Contributing);
    return Contributing;
}());
exports.Contributing = Contributing;
