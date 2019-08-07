"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var file_1 = require("../../models/file");
var Readme = /** @class */ (function () {
    function Readme(defaultTemplate) {
        this.defaultTemplate = defaultTemplate;
        this.fileName = file_1.FileName.README;
    }
    Readme.prototype.generateFile = function () {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    };
    Readme.prototype.fileContent = function () {
        return "# Project Title\n\n## Table of Contents\n+ [About](#about)\n+ [Getting Started](#getting_started)\n+ [Usage](#usage)\n+ [Contributing](./CONTRIBUTING.md)\n\n## About <a name = \"about\"></a>\nWrite about 1-2 paragraphs describing the purpose of your project.\n\n## Getting Started <a name = \"getting_started\"></a>\nThese instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.\n\n### Prerequisites\n\nWhat things you need to install the software and how to install them.\n\n\n### Installing\n\nA step by step series of examples that tell you how to get a development env running.\n\nSay what the step will be\n\nAnd repeat\n\n\nEnd with an example of getting some data out of the system or using it for a little demo.\n\n## Usage <a name = \"usage\"></a>\n\nAdd notes about how to use the system.";
    };
    Readme = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('DefaultTemplate'))
    ], Readme);
    return Readme;
}());
exports.Readme = Readme;
