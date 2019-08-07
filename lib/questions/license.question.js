"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
var choice_1 = require("../models/choice");
function licenseQuestion() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var listOfLicenses;
        return tslib_1.__generator(this, function (_a) {
            listOfLicenses = [
                { name: 'MIT License', value: choice_1.LicenseValue.MIT },
                { name: 'ISC License', value: choice_1.LicenseValue.ISC },
                { name: 'Apache 2.0 License', value: choice_1.LicenseValue.APACHE },
                { name: 'BSD 2-Clause License', value: choice_1.LicenseValue.BSD2 },
                { name: 'GPLv3 License', value: choice_1.LicenseValue.GPL3 },
            ];
            return [2 /*return*/, inquirer_1.default.prompt([{
                        name: 'licenses',
                        type: 'list',
                        message: 'Which type of license do you want to generate?',
                        choices: listOfLicenses
                    }])];
        });
    });
}
exports.licenseQuestion = licenseQuestion;
