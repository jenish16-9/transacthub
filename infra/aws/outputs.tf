output "ecr_repository_url" {
  value = aws_ecr_repository.user_app.repository_url
}

output "application_url" {
  value = "http://${aws_lb.main.dns_name}"
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.address
}
