# TWL Community Growth Project

A complete community growth solution with Twitter bot automation and a professional landing page.

## 🤖 Twitter Bot

Automated Twitter bot for community engagement and growth.

### Features
- **Automated Posting**: Schedule tweets to promote your community
- **Smart Engagement**: Like and retweet relevant content
- **Member Discovery**: Find and engage potential community members
- **Analytics**: Track performance and engagement metrics
- **Success Stories**: Share community achievements

### Quick Start
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Twitter API credentials to .env

# Run basic bot
npm start

# Run enhanced bot with advanced features
npm run start:enhanced
```

## 🌐 Landing Page

Professional landing page optimized for community growth and conversions.

### Features
- **Modern Design**: Responsive layout with animations
- **Community Focus**: Dedicated sections showcasing your community
- **Strong CTAs**: Multiple conversion points
- **SEO Optimized**: Meta tags and structured content
- **Netlify CMS**: Visual editing capabilities

### Netlify Deployment

1. **Deploy to Netlify**
   ```bash
   # Push to GitHub first
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Deploy settings are automatically configured via `netlify.toml`

3. **Enable Netlify Identity & Git Gateway**
   - In Netlify dashboard: Site settings → Identity
   - Click "Enable Identity"
   - Settings → Registration preferences → Invite only
   - Services → Git Gateway → Enable Git Gateway

4. **Access Visual Editor**
   - Visit `https://yoursite.netlify.app/admin/`
   - Invite yourself via Identity tab in Netlify dashboard
   - Login and start editing content visually

### Visual Editing Capabilities

The Netlify CMS integration allows you to edit:
- **Hero Section**: Title, description, button text
- **Features**: Add/remove/edit feature cards
- **Statistics**: Update community numbers
- **Testimonials**: Manage member quotes
- **Community Settings**: Update links and branding
- **Site Colors**: Change theme colors
- **Social Links**: Update social media URLs

## 📁 Project Structure

```
twitter-hippo/
├── bot.js                 # Core Twitter bot
├── community-features.js  # Enhanced bot features
├── index.html            # Landing page
├── styles.css            # Styling
├── script.js             # JavaScript functionality
├── admin/
│   ├── config.yml        # Netlify CMS configuration
│   └── index.html        # CMS admin interface
├── site-config.json      # Site configuration
├── netlify.toml          # Netlify deployment config
├── package.json          # Dependencies
└── .env.example          # Environment template
```

## 🚀 Twitter API Setup

1. **Create Twitter Developer Account**
   - Visit [developer.twitter.com](https://developer.twitter.com)
   - Create a new project and app

2. **Set App Permissions**
   - App settings → User authentication settings
   - Set permissions to "Read and write"
   - Callback URL: `http://localhost:3000/callback`
   - Website URL: Your site URL

3. **Generate Credentials**
   - Generate API Key & Secret
   - Generate Access Token & Secret
   - Copy Bearer Token

4. **Configure Environment**
   ```bash
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_SECRET=your_access_secret
   TWITTER_BEARER_TOKEN=your_bearer_token
   TWITTER_USER_ID=your_numeric_user_id
   ```

## 🎯 Community Configuration

Your community is pre-configured for:
- **Community ID**: `1943464833229226222`
- **Community URL**: `https://x.com/i/communities/1943464833229226222`

To change the community:
1. Update `communityId` and `communityUrl` in bot files
2. Update community links in `index.html`
3. Update `site-config.json` social links

## 📊 Analytics & Monitoring

The bot includes built-in analytics:
- Tweet performance metrics
- Engagement tracking
- Growth statistics
- Weekly reports

For web analytics, add your tracking code to `index.html`.

## 🔧 Customization

### Bot Customization
- Edit `contentLibrary` arrays for custom messaging
- Modify scheduling in `startScheduledTasks()`
- Adjust engagement keywords and strategies

### Landing Page Customization
- Use Netlify CMS for visual editing
- Modify `styles.css` for design changes
- Update content in `index.html`
- Configure colors in `site-config.json`

## 📈 Best Practices

### Twitter Bot
- Respect API rate limits
- Engage authentically, not aggressively
- Monitor performance and adjust strategy
- Comply with Twitter Terms of Service

### Landing Page
- Regularly update testimonials and stats
- A/B test different headlines and CTAs
- Monitor conversion rates
- Keep content fresh and relevant

## 🆘 Troubleshooting

### Common Bot Issues
- **401 Unauthorized**: Regenerate access tokens
- **403 Forbidden**: Check app permissions
- **Rate Limited**: Reduce posting frequency

### Deployment Issues
- **CMS not loading**: Enable Identity and Git Gateway
- **Build failures**: Check `netlify.toml` configuration
- **Styling issues**: Verify CSS file paths

## 📞 Support

For issues:
1. Check the troubleshooting section
2. Review Twitter API documentation
3. Check Netlify documentation for deployment issues

## 📄 License

This project is open source and available under the MIT License.