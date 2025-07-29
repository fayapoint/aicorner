# Deployment Checklist for AInSeconds

## Before Deploying

### 1. Environment Variables in Netlify
Make sure these are set in Netlify Dashboard → Site Settings → Environment Variables:

```env
ADMIN_SECRET_KEY=ainseconds_admin_2024_secure_key
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_123456789
MONGODB_URI=mongodb+srv://aicorner:aicorner123@cluster0.ixqhj.mongodb.net/aicorner?retryWrites=true&w=majority
```

### 2. Build Settings in Netlify
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18

### 3. Files to Check
- ✅ `netlify.toml` - Updated with proper redirects
- ✅ `next.config.js` - Updated with external packages
- ✅ `package.json` - Added Netlify plugin

## After Deploying

### 1. Test API Health
Visit: `https://ainseconds.shop/api/health`

Expected response:
```json
{
  "status": "OK",
  "environment": {
    "ADMIN_SECRET_KEY": "SET",
    "JWT_SECRET": "SET",
    "MONGODB_URI": "SET"
  }
}
```

### 2. Test Admin Login
1. Go to: `https://ainseconds.shop/admin/login`
2. Use credentials:
   - Username: `admin`
   - Password: `ainseconds_admin_2024_secure_key`

### 3. If Still Getting 404 Errors

#### Option A: Check Netlify Function Logs
1. Go to Netlify Dashboard → Functions
2. Look for `___netlify-server-handler`
3. Check logs for errors

#### Option B: Alternative Deployment Method
If the issue persists, we might need to switch to Vercel or use a different deployment approach.

## Common Issues and Solutions

### Issue: "Unexpected token '<'" Error
- **Cause**: API route returning HTML instead of JSON (404 error)
- **Solution**: Check that API routes are properly deployed as Netlify functions

### Issue: Environment Variables Not Working
- **Cause**: Variables not set in Netlify or deployment not triggered after setting them
- **Solution**: Set variables in Netlify dashboard and trigger new deployment

### Issue: API Routes Not Found
- **Cause**: Netlify not properly handling Next.js 14 App Router API routes
- **Solution**: Updated `netlify.toml` with proper configuration

## Next Steps After Successful Deployment

1. Test all admin panel features
2. Verify news/video management works
3. Test file uploads (if using Cloudinary)
4. Check that all pages load correctly
