# Fediverse Feed Amalgamator

This repository is a Feed Amalgamator for various Fediverse platforms, in order to have a shared trending feed across all of them. This project was completed by 'Works on my Machine', Team 3 of CSE 210 at UC San Diego in Fall of 2023. 

## Team Members
- Eric Zhang
- Jackson Conte
- Josh Cross
- Kaize Yao
- Lakshya Lnu
- Om Prakaash Pandiyaraju
- Shrivaths Shyam
- Sidd
- Varun Singh

# Running this Server

This platform is hosted and available at https://fediblend.netlify.app/. If you want to host it yourself, you'll need NodeJS >= 14.0. Then, simply follow these instructions:

1. Clone or download the repository
2. With a terminal in the repo's directory, run `npm install` to download dependencies
3. Run `npm run` to start the server

# CICD Pipeline

Our code follows the pipeline below before it hits production environments.

![CICD Pipeline, with flow from makng changes, creating a pull request, which starts the pipeline with steps described below, and a final team member code review before code is merged.](admin/cicd-flowchart.jpg)

Our CICD pipeline specifically has the following checks:
- All unit tests are ran and must pass
- Documentation must successfully generate without errors.
- A deployment to a test environment must succeed.
- Code coverage is checked (but not currently enforced).

Pushing to main is blocked unless all of the above steps pass and the code is approved by a different team member.