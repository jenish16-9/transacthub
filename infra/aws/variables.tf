variable "aws_region" {
  type    = string
  default = "us-west-2"
}

variable "project_name" {
  type    = string
  default = "transacthub"
}

variable "container_image" {
  description = "ECR image URI with tag. Use the latest pushed image for production."
  type        = string
  default     = "public.ecr.aws/docker/library/node:20-alpine"
}

variable "db_name" {
  type    = string
  default = "transacthub"
}

variable "db_username" {
  type    = string
  default = "transacthub"
}

variable "db_password" {
  description = "Use a URL-safe password or store the resulting DATABASE_URL in a secret manager."
  type        = string
  sensitive   = true
}

variable "nextauth_secret" {
  type      = string
  sensitive = true
}
