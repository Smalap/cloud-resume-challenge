# Cloud Resume Challenge

A serverless resume website with a live visitor counter, built on AWS.

Live site: [https://d2l4rq6pvo02u3.cloudfront.net](https://d2l4rq6pvo02u3.cloudfront.net)

## Architecture

| Layer | Service |
|-------|---------|
| Hosting | Amazon S3 (static website) |
| CDN + HTTPS | Amazon CloudFront |
| DNS | Amazon Route 53 |
| API | Amazon API Gateway (REST) |
| Compute | AWS Lambda (Python) |
| Database | Amazon DynamoDB |
| CI/CD | GitHub Actions |

## Structure

```
cloud-resume/
├── frontend/     # the resume website (HTML / CSS / JS)
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── backend/      # visitor-counter API (added in later phases)
```

## Progress

- [x] Phase 0 — AWS account + local tooling
- [x] Phase 1 — Resume website
- [x] Phase 2 — S3 hosting
- [x] Phase 3 — CloudFront
- [x] Phase 4 — Route 53 domain
- [x] Phase 5 — DynamoDB
- [x] Phase 6 — Lambda
- [x] Phase 7 — API Gateway
- [x] Phase 8 — Wire counter to API
- [x] Phase 9 — CI/CD with GitHub Actions

Built by [Shivam Malap](https://github.com/Smalap).
