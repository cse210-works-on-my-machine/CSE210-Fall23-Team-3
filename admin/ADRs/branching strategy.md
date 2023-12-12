# Title: Branching strategy
​
## Decision Description
​We plan to follow a feature branching style for the project, where branches are made to work on particular features or aspects of the project and merged back in to the main line when this is complete.
​
## Alternatives Considered
​- CI-style branching, where branches are merged into a shared mainline multiple times a day
    - not particularly viable for us since people do not work as often as CI would expect (unlike in an actual software organization)
- Team-member branching, where branches are made for each team member, and each branch has multiple PRs into main over the course of the project
    - can be confusing to understand which work is where in the repo
​
## Pros and Cons
​
| Pros | Cons |
|------|------|
| lends itself to our work style | since there isn't continuous integration, merge conflicts can arise more frequently |
| promotes incrementalism in our development | more dense pull requests can lead to longer reviews and merge meetings |
​
## Notes​
We did not end up originally deciding on a branching style early in the project, but our working style within the team lended itself to the feature branching strategy. We tended to work on particular features in bursts of work, not consistently each day, which lead us to make branches for each feature. We decided to formalize this strategy after our second sprint retrospective.

## Links/References
[Second sprint retrospective](../meetings/2023-12-4.md#sprint-retrospective)
​
## Date: 2023-12-04
The date the decision was made.
(ISO 8601 date format)