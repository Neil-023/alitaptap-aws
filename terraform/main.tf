provider "aws" {
  region = "ap-southeast-1" 
}

# 1. LAMBDA EXECUTION ROLE
resource "aws_iam_role" "lambda_exec" {
  name = "alitaptap_lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# 2. THE LAMBDA FUNCTION & URL
resource "aws_lambda_function" "fastapi_backend" {
  function_name = "alitaptap-backend"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "main.handler" # Ensure your Python file is named main.py
  runtime       = "python3.11"   # Matched to Alitaptap's requirement
  timeout       = 30             # Gemini API can sometimes take a few seconds

  # A placeholder zip to allow initial creation
  filename         = "aws_lambda_deploy.zip"

  lifecycle {
    ignore_changes = [filename, source_code_hash, environment]
  }
}

resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.fastapi_backend.function_name
  authorization_type = "NONE"
}

# 3. GITHUB ACTIONS IAM USER
resource "aws_iam_user" "github_actions" {
  name = "alitaptap-github-deployer"
}

resource "aws_iam_access_key" "github_actions_key" {
  user = aws_iam_user.github_actions.name
}

resource "aws_iam_user_policy" "github_actions_policy" {
  name = "AlitaptapGitHubActionsLambdaUpdate"
  user = aws_iam_user.github_actions.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:UpdateFunctionConfiguration",
          "lambda:GetFunctionConfiguration"
        ]
        Resource = aws_lambda_function.fastapi_backend.arn
      }
    ]
  })
}

# OUTPUTS
output "api_endpoint" {
  description = "Paste this into your React frontend / GitHub Secrets"
  value       = aws_lambda_function_url.api_url.function_url
}

output "github_access_key_id" {
  value = aws_iam_access_key.github_actions_key.id
}

output "github_secret_access_key" {
  value     = aws_iam_access_key.github_actions_key.secret
  sensitive = true
}