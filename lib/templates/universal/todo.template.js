"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var file_1 = require("../../models/file");
var ToDo = /** @class */ (function () {
    function ToDo(defaultTemplate) {
        this.defaultTemplate = defaultTemplate;
        this.fileName = file_1.FileName.TODO;
    }
    ToDo.prototype.generateFile = function () {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    };
    ToDo.prototype.fileContent = function () {
        return "### TODO\n\n---\n\n- [x] Add the README.md file in the root of your project.\n- [ ] My next todo...\n- [ ] Another todo...";
    };
    ToDo = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('DefaultTemplate'))
    ], ToDo);
    return ToDo;
}());
exports.ToDo = ToDo;
