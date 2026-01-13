# OpenGov MCP Servers

This directory contains Model Context Protocol (MCP) servers that provide Claude CLI with access to external tools and services.

## Aha! MCP Server

The `aha-server.mjs` file provides Claude with access to Aha! product management data:

### Available Tools

| Tool | Description |
|------|-------------|
| `aha_products_list` | List all products |
| `aha_products_get_details` | Get product details |
| `aha_products_list_features` | List features for a product |
| `aha_features_search` | Search for features |
| `aha_features_get_details` | Get feature details with Jira integration |
| `aha_ideas_list` | List ideas |
| `aha_ideas_get_details` | Get idea details |
| `aha_ideas_search` | Search for ideas |
| `aha_initiatives_list` | List initiatives |
| `aha_initiatives_get_details` | Get initiative details |
| `aha_launches_list` | List releases/launches |
| `aha_workflows_list` | List workflow statuses |
| `aha_company_okrs_list` | List company-level OKRs |
| `aha_team_okrs_list` | List team OKRs |

### Environment Variables

Required environment variables:
- `AHA_SUBDOMAIN` - Your Aha! subdomain (e.g., `opengov` for `opengov.aha.io`)
- `AHA_API_TOKEN` - Your Aha! API token

### Setup

The MCP server is automatically registered with Claude CLI when Aha! credentials are provided. It works via stdio transport.

```bash
# Install dependencies
npm install

# Register with Claude CLI
claude mcp add "aha-tools" -- node /path/to/.claude/mcp-server/aha-server.mjs
```
