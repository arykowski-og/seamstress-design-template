# Ephemeral Environment Deployment Guide

This document describes how to use the ephemeral environment deployment system for testing pull requests in the `seamstress-design` repository.

## Overview

Ephemeral environments provide temporary, on-demand Kubernetes deployments for each pull request. When you add the `deploy-ee` label to a PR, a complete environment is automatically deployed with a unique URL that you can use for testing.

## Quick Start

### Triggering an Ephemeral Environment

1. **Open or update a Pull Request** in the repository
2. **Add the `deploy-ee` label** to the PR
3. **Wait for deployment** - The GitHub Actions workflow will automatically:
   - Deploy the application to a unique namespace
   - Create an ingress with a unique hostname
   - Post a comment on the PR with the deployment URL

### Accessing Your Environment

Once deployed, you'll receive a comment on your PR with:
- **Namespace**: `seamstress-design-pr-{PR_NUMBER}`
- **URL**: `https://seamstress-design-pr-{PR_NUMBER}.development.opengov.zone`

**Example**: For PR #61, the URL would be:
```
https://seamstress-design-pr-61.development.opengov.zone
```

### Cleaning Up

**Automatic Cleanup**: Environments are **automatically cleaned up** when:
- The `deploy-ee` label is removed from the PR, OR
- The PR is closed

**Important Notes**:
- ✅ **Cleanup on label removal**: Removing the `deploy-ee` label triggers automatic cleanup
- ✅ **Cleanup on PR close**: Closing a PR also triggers automatic cleanup
- 🔄 **Redeploying after new commits**: When you add new commits to an existing PR with an active deployment:
  1. Remove the `deploy-ee` label (triggers cleanup of old deployment)
  2. Wait for cleanup to complete
  3. Add the `deploy-ee` label again (triggers new deployment with latest changes)

## How It Works

### Architecture

The ephemeral environment system uses:
- **DevSpace**: For Kubernetes-native deployment management
- **GitHub Actions**: For automated CI/CD workflows
- **AWS ALB (Application Load Balancer)**: For public internet-facing access
- **Kubernetes**: For container orchestration

### Workflow Steps

#### 1. Deployment Workflow (`.github/workflows/ee-workflow.yaml`)

When the `deploy-ee` label is added:

1. **Checkout**: Repository code is checked out
2. **Prepare Environment**: 
   - Sets up Teleport access to Kubernetes cluster
   - Configures kubectl with proper context
3. **Install DevSpace**: Downloads and installs DevSpace CLI
4. **Deploy**:
   - Replaces `${PR_NUMBER}` placeholders in manifest files using `sed`
   - Creates/uses namespace: `seamstress-design-pr-{PR_NUMBER}`
   - Deploys using DevSpace with the `development` profile
5. **Comment**: Posts deployment info (namespace and URL) to the PR

#### 2. Cleanup Workflow

The cleanup workflow runs when:
- The `deploy-ee` label is **removed** from the PR, OR
- The PR is **closed**

Steps:
1. **Prepare Environment**: Sets up Kubernetes access via Teleport
2. **Delete Namespace**: Removes the entire namespace and all resources (Deployment, Service, Ingress)
3. **Comment**: Posts cleanup confirmation to the PR

**Redeploying After New Commits**:

If you add new commits to a PR that already has a deployed environment:

1. **Remove the `deploy-ee` label** → Triggers cleanup of the existing deployment
2. **Wait for cleanup to complete** (check the PR comments for confirmation)
3. **Add the `deploy-ee` label again** → Triggers fresh deployment with the latest code changes

This ensures you're testing the latest code and prevents conflicts with the previous deployment.

### Resource Naming

Each PR gets unique resources to avoid conflicts:

- **Namespace**: `seamstress-design-pr-{PR_NUMBER}`
- **Deployment**: `seamstress-design`
- **Service**: `seamstress-design-pr-{PR_NUMBER}`
- **Ingress**: `seamstress-design-pr-{PR_NUMBER}`
- **Hostname**: `seamstress-design-pr-{PR_NUMBER}.development.opengov.zone`

### Load Balancer Configuration

**Important**: The load balancer is **public and internet-facing**.

- **ALB Group**: `platform-dev-eks` (shared ALB for all ephemeral environments)
- **Ingress Order**: `10` (processed before shared ingress with order 50)
- **Scheme**: `internet-facing` - accessible from the internet
- **SSL/TLS**: HTTPS on port 443 with automatic SSL redirect
- **Certificate**: AWS ACM certificate for `*.development.opengov.zone`
- **Domain**: `development.opengov.zone`

The ingress uses the shared ALB (`platform-development-shared`) to avoid creating a new load balancer for each PR. All ephemeral environments share the same ALB but have unique hostnames.

### Image Management

- **Image Registry**: `774331681746.dkr.ecr.us-west-2.amazonaws.com`
- **Image Tag**: `pr-{PR_NUMBER}` (e.g., `pr-61`)
- **Image Pull**: Images are built separately by the `docker-build.yml` workflow
- **No Build in EE Workflow**: The ephemeral environment workflow only deploys pre-built images

## Configuration Files

### DevSpace Configuration (`devspace.yaml`)

- Defines deployment manifests and patches
- Uses `development` profile for ephemeral environments
- Patches the container image with the correct PR tag

### Kubernetes Manifests (`ee-deploy/`)

- **`deploy.yaml`**: Deployment configuration
- **`service.yaml`**: ClusterIP service (unique name per PR)
- **`ingress.yaml`**: ALB ingress configuration (unique name and hostname per PR)

### GitHub Actions Workflow (`.github/workflows/ee-workflow.yaml`)

- **Triggers**: `labeled`, `unlabeled`, and `closed` events on pull requests
- **Deploy Job**: Runs when `deploy-ee` label is added (checks if label exists)
- **Cleanup Job**: Runs when `deploy-ee` label is removed OR when PR is closed
- **Variables**: Passes `PR_TAG=pr-{PR_NUMBER}` and `PR_NUMBER` to DevSpace

## Security Considerations

⚠️ **Public Access**: The load balancer is internet-facing, meaning:
- Environments are accessible from anywhere on the internet
- No authentication is required by default
- Use caution when deploying sensitive features or data

## Troubleshooting

### Deployment Fails

1. **Check GitHub Actions logs** for specific errors
2. **Verify the Docker image exists** with tag `pr-{PR_NUMBER}`
3. **Check namespace** exists: `kubectl get namespace seamstress-design-pr-{PR_NUMBER}`
4. **Verify ingress** is created: `kubectl get ingress -n seamstress-design-pr-{PR_NUMBER}`

### URL Not Accessible

1. **Wait a few minutes** - DNS propagation and ALB target registration can take time
2. **Check ingress status**: `kubectl describe ingress -n seamstress-design-pr-{PR_NUMBER}`
3. **Verify external-dns** has created the DNS record
4. **Check ALB target health**: Ensure pods are running and healthy
5. **Verify health check path**: The application must respond to HTTP GET requests on `/seamstress-design/` path on port `80` for health checks to pass

### Multiple PRs Conflict

Each PR uses unique names, so multiple PRs can be deployed simultaneously without conflicts. If you see issues:
- Verify the PR number is correctly substituted in all resources
- Check that namespaces are unique per PR

## Best Practices

1. **Clean up when done**: Remove the `deploy-ee` label after testing to trigger automatic cleanup, or simply close the PR
2. **Redeploy after new commits**: Remove and re-add the label when you push new commits to test the latest changes
3. **Monitor resources**: Ephemeral environments consume cluster resources - remove labels when not actively testing
4. **Test thoroughly**: Use the environment to test your changes before merging
5. **Automatic cleanup**: Environments are automatically cleaned up when you remove the label or close the PR

## Related Documentation

- [DevSpace Documentation](https://www.devspace.sh/docs)
- [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [AWS ALB Ingress Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/)

## Support

For issues or questions:
1. Check the GitHub Actions workflow logs
2. Review this documentation
3. Contact the Cloud Platform team

