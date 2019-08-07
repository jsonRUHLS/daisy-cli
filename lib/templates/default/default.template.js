"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var inversify_1 = require("inversify");
var questions_1 = require("../../questions");
var DefaultTemplate = /** @class */ (function () {
    function DefaultTemplate(logger, checker) {
        this.logger = logger;
        this.checker = checker;
    }
    DefaultTemplate.prototype.generateFile = function (nameOfFileWithExtension, fileContent, hasPath, pathOfFile) {
        if (hasPath === void 0) { hasPath = false; }
        if (pathOfFile === void 0) { pathOfFile = ''; }
        this.logger.showGenerate(nameOfFileWithExtension);
        this.checkIfDirExistElseMakeDir(hasPath, pathOfFile);
        var fileExists = this.checker.checkExistence(pathOfFile + "/" + nameOfFileWithExtension);
        if (!fileExists) {
            this.createFile(pathOfFile, nameOfFileWithExtension, fileContent);
        }
        else {
            this.overwriteOrFileAlreadyExists(pathOfFile, nameOfFileWithExtension, fileContent);
        }
    };
    ;
    DefaultTemplate.prototype.checkIfDirExistElseMakeDir = function (hasPath, pathOfFile) {
        if (hasPath) {
            this.checker.checkIfDirExistElseMakeDir(pathOfFile);
        }
    };
    DefaultTemplate.prototype.createFile = function (pathOfFile, fileName, fileContent, fileExists) {
        var _this = this;
        if (fileExists === void 0) { fileExists = false; }
        var filepath = process.cwd() + (pathOfFile + "/" + fileName);
        fs_extra_1.default.writeFile(filepath, fileContent, function (error) {
            if (!error && fileExists === false) {
                _this.logger.showCreate(fileName, pathOfFile);
            }
            else if (!error && fileExists === true) {
                _this.logger.showUpdate(fileName, pathOfFile);
            }
            else {
                _this.logger.showError(error);
            }
        });
    };
    DefaultTemplate.prototype.overwriteOrFileAlreadyExists = function (pathOfFile, nameOfFileWithExtension, fileContent) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var overwriteAnswer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, questions_1.overwriteFileQuestion()];
                    case 1:
                        overwriteAnswer = _a.sent();
                        if (overwriteAnswer.overwrite === true) {
                            this.createFile(pathOfFile, nameOfFileWithExtension, fileContent, true);
                        }
                        else {
                            this.fileAlreadyExist(nameOfFileWithExtension);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTemplate.prototype.fileAlreadyExist = function (fileName) {
        this.logger.showError(fileName + " already exists!");
        process.exit(1);
    };
    DefaultTemplate = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('Logger')),
        tslib_1.__param(1, inversify_1.inject('Checker'))
    ], DefaultTemplate);
    return DefaultTemplate;
}());
exports.DefaultTemplate = DefaultTemplate;
