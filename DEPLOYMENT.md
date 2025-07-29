# AI Corner - Deployment Guide

## Environment Variables

Before deploying, you need to set up the following environment variables in your deployment platform:

### Required Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Admin Authentication
ADMIN_SECRET_KEY=your_secure_admin_password
JWT_SECRET=your_jwt_secret_key
```

## Netlify Deployment

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Set Environment Variables**: Add all the environment variables listed above in Netlify's dashboard
3. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Deploy**: Trigger the deployment

### Netlify Configuration

The `netlify.toml` file is already configured with:
- Next.js plugin
- Proper redirects for API routes
- Cache headers for static assets
- Secrets scanning disabled (since we're using environment variables properly)

## Vercel Deployment

1. **Connect Repository**: Import your project from GitHub
2. **Set Environment Variables**: Add all environment variables in Vercel's dashboard
3. **Deploy**: Vercel will automatically build and deploy

## Other Platforms

The application is compatible with:
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Heroku

## Admin Access

After deployment, access the admin panel at:
- URL: `https://your-domain.com/admin/login`
- Username: `admin`
- Password: The value you set for `ADMIN_SECRET_KEY`

## Database Setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your deployment platform's IP addresses
4. Use the connection string as `MONGODB_URI`

## Cloudinary Setup

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret from the dashboard
3. Set up upload presets if needed
4. Use the credentials in your environment variables

## Security Notes

- Never commit `.env.local` or any file containing secrets
- Use strong, unique passwords for `ADMIN_SECRET_KEY` and `JWT_SECRET`
- Regularly rotate your API keys and secrets
- Enable 2FA on your MongoDB Atlas and Cloudinary accounts
