package platform.policies

deny[msg] {
  input.resource.kind == "vm"
  not input.resource.tags["owner"]
  msg := "Resource missing owner tag"
}

deny[msg] {
  input.env == "prod"
  not input.resource.encryption_at_rest
  msg := "Encryption at rest required for prod"
}


