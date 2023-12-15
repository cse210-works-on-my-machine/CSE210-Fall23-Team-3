# Title: Main Project Deployment

## Decision Description
Decided to use Netlify as our deployment platform for the main project. 

## Alternatives Considered
- **Self-hosted servers**, where we would manage our own servers for deployment.
- **Other cloud providers** such as AWS S3 with CloudFront, Google Cloud Storage with Firebase, or Vercel.

## Pros and Cons

| Pros | Cons |
|------|------|
| Simplifies the deployment process with continuous deployment from Git. | Limited to static sites and serverless functions, not suitable for full-stack applications. |
| Offers free SSL certificates and handles HTTPS redirection automatically. | Potential vendor lock-in, as migrating to another platform may require configuration changes. |
| Provides a generous free tier and scalable pricing for higher usage. | Custom domains on the free tier may have lower priority in support and resources. |
| Built-in preview deployments for pull requests enhance the review process. | Overages beyond the free tier can become costly without proper monitoring. |
| Easy to set up with a user-friendly interface and excellent documentation. | |

## Links/References
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Pricing](https://www.netlify.com/pricing/)
- [Meeting Notes for November 29](admin/meetings/2023-11-29.md)

## Date: 2023-11-29
The date the decision was made.
(ISO 8601 date format)

