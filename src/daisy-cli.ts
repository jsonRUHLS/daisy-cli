#!/usr/bin/env node
import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger.util';
import { CodeOfConduct, Contributing, License, ToDo, Readme, Changelog } from './templates/universal';
import { BugReport, FeatureRequest, PullRequest } from './templates/github';
import { UniversalChoiceValue, GithubChoiceValue, Answer } from './models/choice';
import { githubFileQuestion } from './questions';
import { ConsoleMessage } from './models/console-message';
import { } from '.'

@injectable()
export class DaisyCLI {

    constructor(@inject('Logger') private logger: Logger,
        @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
        @inject('License') private license: License,
        @inject('Contributing') private contributing: Contributing,
        @inject('BugReport') private bugReport: BugReport,
        @inject('FeatureRequest') private featureRequest: FeatureRequest,
        @inject('PullRequest') private pullRequest: PullRequest,
        @inject('ToDo') private todo: ToDo,
        @inject('Readme') private readme: Readme,
        @inject('Changelog') private changelog: Changelog) {
        this.logger.showTitleAndBanner();
        this.executeDaisyCLI();
        this.executeGithubRepo();
    }

    public async executeDaisyCLI(): Promise<any> {
        return this.githubActions();
    }

    public async executeGithubRepo(): Promise<any> {
        return this.repoActions();
    }

    private async githubActions() {
        let githubFileAnswer: Answer = await githubFileQuestion();

        switch (githubFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);

                this.codeOfConduct.generateFile();
                this.contributing.generateFile();
                this.bugReport.generateFile();
                this.featureRequest.generateFile();
                return this.pullRequest.generateFile();
            }
            case UniversalChoiceValue.LICENSE: {
                return this.license.generateLicense();
            }
            case UniversalChoiceValue.CHANGELOG: {
                return this.changelog.generateFile();
            }
            case UniversalChoiceValue.CONTRIBUTING: {
                return this.contributing.generateFile();
            }
            case UniversalChoiceValue.CODE_OF_CONDUCT: {
                return this.codeOfConduct.generateFile();
            }
            case UniversalChoiceValue.TODO: {
                return this.todo.generateFile();
            }
            case UniversalChoiceValue.README: {
                return this.readme.generateFile();
            }
            case GithubChoiceValue.BUG_REPORT: {
                return this.bugReport.generateFile();
            }
            case GithubChoiceValue.FEATURE_REQUEST: {
                return this.featureRequest.generateFile();
            }
            case GithubChoiceValue.PULL_REQUEST: {
                return this.pullRequest.generateFile();
            }
        }
    }

    private async repoActions() {

        const chalk = require('chalk');
        const clear = require('clear');
        const figlet = require('figlet');

        const github = require('./utils/github-util');
        const repo = require('./utils/repo.util');
        const files = require('./utils/files.util');

        clear();
        console.log(
            chalk.yellow(
                figlet.textSync('Ginit', { horizontalLayout: 'full' })
            )
        );

        if (files.directoryExists('.git')) {
            console.log(chalk.red('Already a git repository!'));
            process.exit();
        }

        const getGithubToken = async () => {
            // Fetch token from config store
            let token = github.getStoredGithubToken();
            if (token) {
                return token;
            }

            // No token found, use credentials to access github account
            await github.setGithubCredentials();

            // Check if access token for ginit was registered
            const accessToken = await github.hasAccessToken();
            if (accessToken) {
                console.log(chalk.yellow('An existing access token has been found!'));
                // ask user to regenerate a new token
                token = await github.regenerateNewToken(accessToken.id);
                return token;
            }

            // No access token found, register one now
            token = await github.registerNewToken();
            return token;
        }

        const run = async () => {
            try {
                // Retrieve & Set Authentication Token
                const token = await getGithubToken();
                github.githubAuth(token);

                // Create remote repository
                const url = await repo.createRemoteRepo();

                // Create .gitignore file
                await repo.createGitignore();

                // Setup local repository and push to remote
                const done = await repo.setupRepo(url);
                if (done) {
                    console.log(chalk.green('All done!'));
                }
            } catch (err) {
                if (err) {
                    switch (err.code) {
                        case 401:
                            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
                            break;
                        case 422:
                            console.log(chalk.red('There already exists a remote repository with the same name'));
                            break;
                        default:
                            console.log(err);
                    }
                }
            }
        }

        run();

    }
}
