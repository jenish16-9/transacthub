# AWS deployment

This directory contains Terraform infrastructure for running TransactHub on
AWS using ECS Fargate, Amazon ECR, Amazon RDS for PostgreSQL, Application Load
Balancer, IAM, security groups, and CloudWatch Logs.

## Prerequisites

- AWS account and credentials configured for Terraform
- Terraform 1.6+
- An S3/DynamoDB Terraform backend if state must be shared by a team

## Deploy

```bash
cd infra/aws
terraform init
terraform apply \
  -var='aws_region=us-west-2' \
  -var='db_password=use-a-long-url-safe-password' \
  -var='nextauth_secret=replace-with-a-long-random-secret'
```

The first apply creates the ECR repository and AWS service infrastructure. The
GitHub Actions workflow builds the Docker image, pushes it to ECR, and updates
the ECS service. For local deployment, pass the resulting ECR image URI through
`-var container_image=...` on the second apply.

Do not commit `terraform.tfvars`, database passwords, or AWS access keys.
