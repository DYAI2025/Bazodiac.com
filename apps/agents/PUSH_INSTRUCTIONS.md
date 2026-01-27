# Git Push Instructions

Your repository has been prepared and committed with all deployment configurations. To push to GitHub, follow these steps:

## 1. Set up the remote repository

First, you'll need to add your GitHub repository as the remote origin. Replace the URL below with your actual repository URL:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

If you haven't created a repository on GitHub yet:
1. Go to https://github.com/new
2. Create a new repository with the same name as your project
3. Copy the repository URL and use it in the command above

## 2. Push the changes

After adding the remote origin, push your changes:

```bash
git push -u origin main
```

This will:
- Push the main branch to GitHub
- Set up tracking so future `git push` and `git pull` commands work without arguments
- Trigger the GitHub Actions workflow to deploy to GitHub Pages

## 3. Enable GitHub Pages (if not already done)

After pushing, you need to enable GitHub Pages in your repository settings:
1. Go to your GitHub repository
2. Navigate to Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source

## 4. Configure Environment Variables

To make the application work properly, you need to configure the following secrets in your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add these secrets:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `ELEVENLABS_API_KEY`: Your ElevenLabs API key

## Important Notes

- The `dist` directory (build output) is intentionally excluded from git via .gitignore
- GitHub Actions will build the project automatically during deployment
- Make sure to set both `GEMINI_API_KEY` and `ELEVENLABS_API_KEY` as GitHub Secrets in repository settings for the app to function properly
- Without the ElevenLabs API key, the voice interface will not work

## Next Steps

Once pushed, your GitHub Actions workflow will automatically:
1. Build the application
2. Deploy it to GitHub Pages

The Vercel deployment will also be ready once the repository is connected to your Vercel account.