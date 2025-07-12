# GitHub App Setup for Netlify CMS

This guide will help you set up a GitHub app to enable GitHub authentication for your Netlify CMS visual editor.

## Step 1: Create GitHub Repository

1. **Go to GitHub** and create a new repository named `twitter-hippo`
2. **Make it public** (required for free Netlify CMS)
3. **Don't initialize** with README (we'll push our existing code)

## Step 2: Push Your Code to GitHub

```bash
# Add GitHub remote (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/twitter-hippo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Create GitHub OAuth App

1. **Go to GitHub Settings**
   - Navigate to https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"

2. **Fill in OAuth App Details:**
   ```
   Application name: TWL Community CMS
   Homepage URL: https://your-site-name.netlify.app
   Authorization callback URL: https://api.netlify.com/auth/done
   ```

3. **Save the app** and note down:
   - Client ID
   - Client Secret (generate one)

## Step 4: Configure Netlify

1. **Deploy to Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Connect your GitHub repository
   - Deploy settings are auto-configured via `netlify.toml`

2. **Add GitHub OAuth to Netlify:**
   - In Netlify dashboard: Site settings → Access control
   - Scroll to "OAuth providers"
   - Click "Install provider" → "GitHub"
   - Enter your Client ID and Client Secret
   - Save

## Step 5: Update Repository Reference

1. **Edit `admin/config.yml`:**
   ```yaml
   backend:
     name: github
     repo: YOUR_GITHUB_USERNAME/twitter-hippo
     branch: main
     auth_endpoint: https://api.netlify.com/api/v1/oauth/github
   ```

2. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Configure GitHub backend for CMS"
   git push
   ```

## Step 6: Access Visual Editor

1. **Visit your admin panel:**
   ```
   https://your-site-name.netlify.app/admin/
   ```

2. **Click "Login with GitHub"**
   - Authorize the app when prompted
   - You'll be redirected to the CMS interface

## Features Available

With GitHub authentication, you can:

- ✅ **Edit content visually** without touching code
- ✅ **Manage all sections** (hero, features, testimonials, etc.)
- ✅ **Upload images** directly through the interface
- ✅ **Preview changes** before publishing
- ✅ **Version control** - all changes create Git commits
- ✅ **Collaborative editing** - invite team members
- ✅ **Mobile-friendly** admin interface

## Troubleshooting

### Common Issues:

1. **"Repository not found"**
   - Ensure the repository is public
   - Check the repo name in `admin/config.yml`

2. **"Authorization failed"**
   - Verify OAuth app callback URL: `https://api.netlify.com/auth/done`
   - Check Client ID/Secret in Netlify settings

3. **"Access denied"**
   - Ensure you have write access to the repository
   - Check if the branch name is correct (usually `main`)

### Security Notes:

- GitHub OAuth provides secure authentication
- All edits create proper Git commits
- No sensitive credentials stored in frontend
- Full audit trail of all changes

## Next Steps

After setup:
1. Test the admin interface
2. Invite team members via GitHub repository access
3. Customize the CMS fields in `admin/config.yml`
4. Set up branch protection rules for production