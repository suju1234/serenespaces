# Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ installed locally

## Deployment Steps

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/your-username/serene-spaces-website.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Node.js project
5. Click "Deploy"

### 4. Configure Environment Variables
After deployment, add these environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add:
  - `EMAIL_USER`: Your Gmail address
  - `EMAIL_PASS`: Your Gmail app password
  - `OWNER_EMAIL`: Pradeep's email address

### 5. Redeploy
After adding environment variables, redeploy from the Vercel dashboard.

## Important Notes

### Email Configuration
For Gmail to work in production:
1. Enable 2-factor authentication on your Google account
2. Generate an app password at https://myaccount.google.com/apppasswords
3. Use the app password (16 characters) as EMAIL_PASS
4. Never commit your .env file to Git

### File Storage
The current implementation saves submissions to `submissions.json`. This works for development but won't persist on Vercel (serverless functions are ephemeral). For production, consider:
- Using a database (MongoDB, PostgreSQL, etc.)
- Using Vercel's KV storage
- Using a third-party service like Airtable or Google Sheets

### Static Files
All static files (HTML, CSS, JS, images) are served from the public directory automatically by Express.

## Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Testing
After deployment, test:
- Website loads correctly
- Contact form submits successfully
- Email notifications work
- All images load properly
- Responsive design works on mobile

## Support
If you encounter issues:
- Check Vercel deployment logs
- Verify environment variables are set
- Ensure Node.js version is 18+
- Check that all dependencies are in package.json
