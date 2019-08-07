import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { GithubPath } from '../../models/path';
import { FileName } from '../../models/file';

@injectable()
export class BugReport {
    private fileName = FileName.BUG_REPORT;
    private hasPath = true;
    private pathOfFile = GithubPath.ISSUE_TEMPLATE;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent(), this.hasPath, this.pathOfFile);
    } 

    private fileContent(): string {
        return `---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
    - OS: [e.g. iOS]
    - Browser [e.g. chrome, safari]
    - Version [e.g. 22]

**Smartphone (please complete the following information):**
    - Device: [e.g. iPhone6]
    - OS: [e.g. iOS8.1]
    - Browser [e.g. stock browser, safari]
    - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
        `;
     }
}
