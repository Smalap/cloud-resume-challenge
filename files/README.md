# Cloud Resume Challenge

A serverless resume website with a live visitor counter, built on AWS.

**Live site:** _(added after CloudFront deploy)_

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
- [ ] Phase 2 — S3 hosting
- [ ] Phase 3 — CloudFront
- [ ] Phase 4 — Route 53 domain
- [ ] Phase 5 — DynamoDB
- [ ] Phase 6 — Lambda
- [ ] Phase 7 — API Gateway
- [ ] Phase 8 — Wire counter to API
- [ ] Phase 9 — CI/CD with GitHub Actions

Built by [Shivam Malap](https://github.com/Smalap).
