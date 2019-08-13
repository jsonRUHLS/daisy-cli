import 'reflect-metadata';
import { Container } from 'inversify';
import { DaisyCLI } from './daisy-cli';
import { Logger } from './utils/logger.util';
import { CodeOfConduct } from './templates/universal/code-of-conduct.template';
import { License } from './templates/universal/license.template';
import { Checker } from './utils/checker.util';
import { Contributing } from './templates/universal/contributing.template';
import { BugReport } from './templates/github/bug-report.template';
import { FeatureRequest } from './templates/github/feature-request.template';
import { PullRequest } from './templates/github/pull-request.template';
import { DefaultTemplate } from './templates/default/default.template';
import { ToDo } from './templates/universal/todo.template';
import { Readme } from './templates/universal/readme.template';
import { Changelog } from './templates/universal/changelog.template';

export function index(): DaisyCLI {
  const container: Container = new Container();
  const chalk = require('chalk');
  const clear = require('clear');
  const figlet = require('figlet');

  const github = require('./utils/github.util');
  const repo = require('./utils/repo.util');
  const files = require('./utils/files.util');

  // Utils
  container.bind<Logger>('Logger').to(Logger).inSingletonScope();
  container.bind<Checker>('Checker').to(Checker).inSingletonScope();

  // Default Template
  container.bind<DefaultTemplate>('DefaultTemplate').to(DefaultTemplate).inSingletonScope();

  // Universal Templates (Github, Gitlab and Bitbucket)
  container.bind<License>('License').to(License).inSingletonScope();
  container.bind<Contributing>('Contributing').to(Contributing).inSingletonScope();
  container.bind<CodeOfConduct>('CodeOfConduct').to(CodeOfConduct).inSingletonScope();
  container.bind<ToDo>('ToDo').to(ToDo).inSingletonScope();
  container.bind<Readme>('Readme').to(Readme).inSingletonScope();
  container.bind<Changelog>('Changelog').to(Changelog).inSingletonScope();

  // Github Templates
  container.bind<BugReport>('BugReport').to(BugReport).inSingletonScope();
  container.bind<FeatureRequest>('FeatureRequest').to(FeatureRequest).inSingletonScope();
  container.bind<PullRequest>('PullRequest').to(PullRequest).inSingletonScope();

  // DaisyCLI
  container.bind<DaisyCLI>('DaisyCLI').to(DaisyCLI).inSingletonScope();

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

  return container.get<DaisyCLI>('DaisyCLI');
};

index();
