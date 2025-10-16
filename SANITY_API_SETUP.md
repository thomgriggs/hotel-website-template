# Sanity API Integration Setup

## Environment Variables Required

Create a `.env` file in the project root with the following variables:

```bash
# Required: Sanity API Token for reading content
SANITY_API_READ_TOKEN=your_read_token_here

# Optional: Sanity API Token for writing content (if different from read token)
SANITY_API_WRITE_TOKEN=your_write_token_here
```

## Getting Your Sanity Tokens

1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select your project (`0knotzp4`)
3. Go to "API" tab
4. Create a new token with appropriate permissions:
   - **Read Token**: For fetching content (minimum required)
   - **Write Token**: For inline editing (needs write permissions)

## Token Permissions

For inline editing to work, your token needs:
- `read` permission for fetching content
- `write` permission for updating documents
- `create` permission for creating new documents (if needed)

## Security Notes

- Never commit your `.env` file to version control
- Use different tokens for development and production
- Rotate tokens regularly
- Use the principle of least privilege

## Testing the Integration

1. Start the development server: `npm run dev`
2. Visit: `http://localhost:4321/?preview=true`
3. Try editing any content with the orange outlines
4. Changes should save to Sanity and persist after page refresh

## Troubleshooting

- **"Failed to save changes"**: Check token permissions
- **"Missing required fields"**: Verify field paths are correct
- **CORS errors**: Ensure API endpoint is accessible
- **Network errors**: Check if Sanity API is reachable



