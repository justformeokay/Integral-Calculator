# ✅ DEPLOYMENT CHECKLIST & GUIDELINES

## Pre-Deployment Checklist

### Development Phase ✓
- [x] React components created
- [x] Styling implemented
- [x] API integration complete
- [x] Error handling added
- [x] Validation implemented
- [x] Responsive design tested
- [x] Documentation written

### Testing Phase (Before Deploy)
- [ ] Test on Chrome browser
- [ ] Test on Firefox browser
- [ ] Test on Safari browser
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test all form validations
- [ ] Test error scenarios
- [ ] Test API connectivity
- [ ] Test 2D plots render
- [ ] Test 3D plots render
- [ ] Test loading states
- [ ] Test animations

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Code properly formatted
- [ ] Comments where needed
- [ ] No hardcoded URLs (use .env)
- [ ] No sensitive data exposed
- [ ] CSS classes properly named
- [ ] Component props documented

### Build Phase
- [x] Build command: `npm run build`
- [x] Build creates `build/` folder
- [x] No build errors
- [x] File sizes reasonable
- [x] Source maps generated

---

## Deployment Options

### Option 1: Vercel (Recommended - FREE)

#### Advantages:
- ✅ Very easy setup
- ✅ Automatic builds on git push
- ✅ Free SSL certificate
- ✅ CDN globally distributed
- ✅ Environment variables support
- ✅ Built for React apps

#### Steps:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd /Users/putramac/Desktop/integral_app/frontend
vercel
```

3. **Follow prompts:**
- Link to existing project or create new
- Confirm project name
- Confirm build settings
- Confirm environment variables

4. **Set Environment Variables**
```
REACT_APP_API_URL=http://103.127.139.243:8000
```

5. **Done!**
```
✓ Deployed to: https://your-app.vercel.app
```

#### Subsequent Deployments:
```bash
vercel --prod
```

---

### Option 2: Netlify (FREE)

#### Advantages:
- ✅ Easy drag-and-drop
- ✅ Git integration
- ✅ Form handling available
- ✅ Good analytics

#### Steps:

1. **Build locally**
```bash
cd frontend
npm run build
```

2. **Upload to Netlify**
- Go to https://netlify.com
- Click "Drag & drop"
- Drag `build/` folder

3. **Alternative: Git Integration**
- Push code to GitHub
- Connect GitHub to Netlify
- Auto-deploy on push

---

### Option 3: GitHub Pages (FREE)

#### Advantages:
- ✅ Free hosting
- ✅ Git-based
- ✅ Simple setup

#### Steps:

1. **Update package.json**
```json
{
  "homepage": "https://your-username.github.io/integral_app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^3.2.3"
  }
}
```

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Deploy**
```bash
npm run deploy
```

---

### Option 4: Custom Server (Self-Hosted)

#### Requirements:
- Web server (Nginx, Apache)
- Basic Linux knowledge
- Server rental (Digital Ocean, AWS, etc.)

#### Steps:

1. **Build**
```bash
npm run build
```

2. **Upload build/ folder** to server:
```bash
scp -r build/ user@server:/var/www/html/
```

3. **Configure Web Server**

**Nginx example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html/build;
    
    location / {
        try_files $uri /index.html;
    }
}
```

4. **Enable HTTPS**
```bash
sudo certbot certonly --nginx -d yourdomain.com
```

---

## Environment Variables for Production

Create `.env.production.local`:

```
REACT_APP_API_URL=http://103.127.139.243:8000
REACT_APP_ENV=production
REACT_APP_ENABLE_ANALYTICS=true
```

Or set in deployment platform:

**Vercel:** Settings → Environment Variables
**Netlify:** Site Settings → Build & Deploy → Environment

---

## Performance Optimization

### Before Deployment

1. **Check bundle size**
```bash
npm run build
# Check size of build/ folder
```

2. **Minification**
```bash
npm run build
# Automatically minifies in production
```

3. **Code splitting** (optional)
```javascript
const Plot2D = React.lazy(() => import('./components/Plot2D'));
```

4. **Image optimization** (if needed)
- Use WebP format
- Compress images

5. **CSS optimization**
- Remove unused CSS
- Minify CSS

---

## Security Checklist

- [ ] No API keys in code
- [ ] Use environment variables
- [ ] No sensitive data in localStorage
- [ ] API calls over HTTPS
- [ ] CORS properly configured
- [ ] Input validation on frontend
- [ ] Error messages don't expose internals
- [ ] No eval() or unsafe operations

---

## Post-Deployment Testing

### Browser Compatibility
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone)
- [ ] Mobile (Android)

### Functionality Testing
- [ ] Form submission works
- [ ] API calls succeed
- [ ] Results display correctly
- [ ] Graphs render
- [ ] No console errors
- [ ] Loading states work
- [ ] Error handling works

### Performance
- [ ] Page load time < 3s
- [ ] Graphs render smoothly
- [ ] Animations smooth
- [ ] Form responsive

---

## Monitoring & Maintenance

### Set up monitoring (Recommended)

**Google Analytics** (FREE)
```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

**Sentry** (Error tracking - FREE tier)
```bash
npm install --save @sentry/react
```

### Regular Maintenance
- [ ] Monitor error logs
- [ ] Check uptime
- [ ] Review analytics
- [ ] Update dependencies (quarterly)
- [ ] Test API integration
- [ ] Backup data

---

## Rollback Plan

If deployment has issues:

### Vercel:
```bash
vercel rollback
```

### Netlify:
- Settings → Deploys
- Click previous successful deploy
- "Restore" to previous version

### Manual:
- Keep previous build backed up
- Restore from backup
- Re-deploy

---

## Common Deployment Issues

### Issue: "Cannot find module"
**Solution:** 
```bash
npm install
npm run build
```

### Issue: "API timeout"
**Solution:**
- Check backend is running
- Check network connectivity
- Increase timeout in fetch

### Issue: "Port already in use"
**Solution:**
```bash
PORT=3000 npm start  # Change port
```

### Issue: "Build fails"
**Solution:**
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

### Issue: "Graphs not showing"
**Solution:**
- Check Plotly CDN access
- Check browser console
- Verify plot data JSON

---

## Domain Setup (Optional)

### Point domain to deployment:

**For Vercel:**
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

**For Netlify:**
1. Domain Settings
2. Add domain
3. Update DNS CNAME record

---

## SSL Certificate (HTTPS)

Most platforms provide FREE SSL:
- ✅ Vercel - Automatic
- ✅ Netlify - Automatic
- ✅ GitHub Pages - Automatic
- ⚠️ Custom Server - Use Let's Encrypt

---

## Quick Deployment Commands

```bash
# Vercel
npm install -g vercel
vercel --prod

# Netlify
npm run build
# Then upload build/ folder

# GitHub Pages
npm install --save-dev gh-pages
npm run deploy

# Local build
npm run build
# Serve build/ folder with any web server
```

---

## URLs After Deployment

**Template:**
```
Vercel: https://your-app-name.vercel.app
Netlify: https://your-app-name.netlify.app
GitHub Pages: https://your-username.github.io/integral_app
Custom: https://yourdomain.com
```

---

## Support & Documentation

For deployment help:
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages:** https://pages.github.com

---

## Checklist Summary

Before deploying:
- [ ] All tests passed
- [ ] No console errors
- [ ] Build successful
- [ ] Environment variables set
- [ ] API endpoint verified
- [ ] Performance optimized
- [ ] Security checked

After deploying:
- [ ] Test functionality
- [ ] Check performance
- [ ] Monitor errors
- [ ] Set up analytics
- [ ] Configure domain (optional)

---

## Next: When Ready to Deploy

1. Run `npm run build`
2. Choose deployment platform above
3. Follow platform-specific steps
4. Test deployed app
5. Share URL with users!

---

**Deployment Guide Completed:** December 18, 2025

Happy deploying! 🚀✨
