# Title: Adoption of VSCode Linter Configuration for Project

## Decision Description
We have decided to adopt a standardized Visual Studio Code (VSCode) linter configuration for our project to ensure consistent code style, improve code quality, and reduce the number of stylistic discrepancies in our codebase.

## Alternatives Considered
- Using different linters per developer, based on personal preference
    - This could lead to inconsistent code styles and make collaboration more difficult.
- No linter usage
    - Without linters, we would rely solely on manual code reviews to catch style issues, which is less efficient and error-prone.

## Pros and Cons

| Pros | Cons |
|------|------|
| Ensures a consistent coding style across the team | Requires all team members to use VSCode or have similar configurations in other IDEs/editors |
| Helps catch potential errors and code smells early | Might have a learning curve for team members not familiar with the rules |
| Automates code formatting, saving time during code reviews | Initial setup time to configure the linter rules and settings |
| Integrates with VSCode, providing immediate feedback to developers | Developers may disagree on certain linter rules, requiring discussion and compromise |

## Links/References
- [VSCode Linter Extension Documentation](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Meeting Notes 2023-11-18](https://github.com/cse210-works-on-my-machine/CSE210-Fall23-Team-3/blob/project-documentation/admin/meetings/2023-11-18.md)

## Date: 2023-11-21
The date the decision was made.
(ISO 8601 date format)
