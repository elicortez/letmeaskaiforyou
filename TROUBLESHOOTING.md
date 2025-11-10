# Troubleshooting Guide

## Common Issues and Solutions

### 🎬 Animation Issues

#### Animation is too fast or too slow

**Problem**: The typing animation doesn't match your preference.

**Solution**: Edit the typing speed in `src/app/animate/page.tsx`:

```typescript
// Line ~38 - adjust the typingSpeed value (milliseconds per character)
const typingSpeed = 200; // Current default (slower, easier to read)
// Adjust values:
// 50ms = Very fast (one character per 50 milliseconds)
// 120ms = Faster (original speed)
// 200ms = Current default (slower for readability)
// 500ms = Very slow (for emphasis)
```

#### Animation stutters or has jank

**Problem**: The animation doesn't play smoothly.

**Solution**:
1. Check browser performance (open DevTools > Performance tab)
2. Disable browser extensions that might interfere
3. Close unnecessary tabs/applications
4. Try a different browser
5. Clear browser cache: `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)

#### Animation doesn't start automatically on shared links

**Problem**: When opening a shared link, animation doesn't play automatically.

**Solution**:
1. Ensure URL has query parameters: `?q=your+question&ai=chatgpt`
2. Check browser console for errors: `F12` > Console tab
3. Verify JavaScript is enabled in browser settings
4. Try a different browser

---

### 🖱️ Cursor Animation Issues

#### Cursor is not moving smoothly

**Problem**: Mouse cursor animation appears choppy or doesn't animate.

**Solution**:
1. Check browser performance (open DevTools > Performance tab)
2. Close other applications to free resources
3. Try a different browser (Chrome usually best for animations)
4. Clear browser cache and hard refresh

#### Cursor movement positions are wrong

**Problem**: Cursor doesn't move to the correct input or button location.

**Solution**: Cursor positions are calibrated for standard screen layouts. If incorrect:
1. Try resizing browser window
2. Check browser zoom level (should be 100%)
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Report issue on GitHub with your screen resolution

### 🔗 URL and Link Issues

#### Generated URL doesn't work

**Problem**: The generated link is broken or doesn't open anything.

**Solution**:
1. Check for special characters in your question
2. Ensure the URL is fully copied (check for truncation)
3. Try the shortened URL instead of the full URL
4. Verify the AI service is accessible from your region

#### URL contains strange characters

**Problem**: URL shows encoded characters like `%20` instead of spaces.

**Solution**: This is normal! URL encoding is required:
- Spaces become `%20`
- Commas become `%2C`
- Quotes become `%22`

The AI services automatically decode these. This is not a bug.

#### Copy to clipboard doesn't work

**Problem**: "Copy" button doesn't copy the URL.

**Solution**:
1. Check if your browser has clipboard access:
   - Some browsers restrict this in insecure contexts
   - Use `https://` not `http://`
2. Grant permission when prompted
3. Try right-clicking and selecting "Copy" manually
4. Verify JavaScript is enabled

#### TinyURL shortening is slow

**Problem**: Shortened URL takes a long time to generate.

**Solution**:
1. This is normal - TinyURL API sometimes has delays
2. You can use the full URL while waiting for the short version
3. Check your internet connection
4. If persistent, try again in a few moments

---

### 👀 Preview Issues

#### Preview doesn't show

**Problem**: "Preview Animation" button doesn't display the iframe preview.

**Solution**:
1. Make sure animation has completed first
2. Click "Preview Animation" button (not "Go to AI")
3. Wait 1-2 seconds for the preview iframe to render
4. Check browser console for JavaScript errors: `F12` > Console
5. Ensure JavaScript is enabled

#### Redirect happens in preview iframe

**Problem**: Animation redirects even when previewing in iframe.

**Solution**: This should NOT happen - the iframe detection prevents redirects:
1. Refresh page and try again
2. Check URL has `iframe=true` parameter
3. If still redirecting, report on GitHub

---

### 🎨 Display and Styling Issues

#### Colors look wrong

**Problem**: UI colors don't match the screenshots or expected appearance.

**Solution**:
1. Clear browser cache and hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check if Tailwind CSS loaded:
   - Open DevTools > Elements tab
   - Check if styles are applied
   - Look for `src/styles/globals.css` in Sources tab
3. Ensure JavaScript is enabled
4. Try a different browser

#### Text is too small or too large

**Problem**: Text appears incorrectly sized.

**Solution**:
1. Reset browser zoom: `Ctrl+0` (Windows) or `Cmd+0` (Mac)
2. Check operating system zoom settings
3. Zoom in/out as needed: `Ctrl+Plus/Minus` or `Cmd+Plus/Minus`

#### Text is not centered on buttons

**Problem**: Button text appears left-aligned instead of centered.

**Solution**: This is a display issue:
1. Clear browser cache and hard refresh: `Ctrl+Shift+R`
2. Update browser to latest version
3. Try different browser
4. If persistent, report on GitHub

---

### 🚀 Performance Issues

#### Page loads slowly

**Problem**: Website takes a long time to load.

**Solution**:
1. Check internet connection speed
2. Wait longer - first load might take 5-10 seconds
3. Clear browser cache: `Ctrl+Shift+Delete` or `Cmd+Shift+Delete`
4. Disable browser extensions
5. Check if server is down: [status.vercel.com](https://status.vercel.com)

#### Page is unresponsive

**Problem**: Page freezes or doesn't respond to clicks.

**Solution**:
1. Wait 30 seconds for JavaScript to load
2. Refresh the page: `F5` or `Ctrl+R`
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Clear browser cache
5. Close other tabs/applications to free up memory
6. Try in private/incognito mode to disable extensions

#### Animation causes lag

**Problem**: Typing animation makes page slow.

**Solution**:
1. Close other browser tabs
2. Close other applications
3. Try a different browser (Chrome usually best for animations)
4. Reduce browser window size
5. Disable hardware acceleration and re-enable it:
   - Settings > System > Use hardware acceleration

---

### 🌐 Browser Compatibility

#### Works in Chrome but not Firefox/Safari

**Problem**: Site works differently in different browsers.

**Solution**:
1. Update your browser to latest version
2. Clear cache and cookies
3. Disable extensions
4. Try in private/incognito mode
5. Check browser console for errors: `F12` > Console
6. Open an [issue](https://github.com/elicortez/letmeaskaiforyou/issues) with browser details

#### Not working on mobile

**Problem**: App doesn't work on phone or tablet.

**Solution**:
1. Use latest browser (Chrome, Firefox, Safari, or Edge)
2. Ensure mobile browser has JavaScript enabled
3. Refresh page: pull down to refresh
4. Close and reopen browser
5. Restart your device
6. Try on WiFi instead of mobile data

---

### 📱 Mobile-Specific Issues

#### Buttons too small to tap

**Problem**: UI elements are hard to click on mobile.

**Solution**:
1. Zoom in: `Cmd+Plus` (iOS) or two-finger pinch zoom (Android)
2. Buttons are designed to be at least 44x44 pixels (standard)
3. If still too small, open an [issue](https://github.com/elicortez/letmeaskaiforyou/issues)

#### Keyboard covers input on mobile

**Problem**: Virtual keyboard blocks the text input.

**Solution**:
1. Scroll up after the keyboard appears
2. Type your question before the keyboard opens fully
3. This is normal mobile browser behavior

#### Copy to clipboard doesn't work on iOS

**Problem**: Can't copy URLs on iPhone/iPad.

**Solution**:
1. Grant permission when prompted
2. Try triple-tap to select and copy manually
3. Use Share button if available
4. Try Safari instead of Chrome

---

### 🔐 Security & Privacy

#### "Insecure connection" warning

**Problem**: Browser shows security warning.

**Solution**:
1. Ensure URL starts with `https://` not `http://`
2. If on `http://localhost:3000`, this is normal for development
3. Production site should always use `https://`
4. If not on localhost, contact developer

#### Worried about my question being stored

**Problem**: Concerned about privacy of queries.

**Solution**:
1. **Your questions are NOT stored on our servers**
2. URLs are only used to generate links
3. TinyURL API may log URL statistics (check their privacy policy)
4. Avoid putting sensitive information in questions
5. Open source code is auditable on GitHub

---

### 🛠️ Development Issues

#### npm install fails

**Problem**: Installation of dependencies fails.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# Or use a different package manager
yarn install
# or
pnpm install
```

#### Port 3000 already in use

**Problem**: `npm run dev` says port 3000 is in use.

**Solution**:
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

#### Build fails with TypeScript errors

**Problem**: `npm run build` shows type errors.

**Solution**:
1. Run `npm run type-check` to see all errors
2. Fix errors one by one
3. Ensure all imports are correct
4. Check that all variables are typed
5. See [TypeScript Handbook](https://www.typescriptlang.org/docs/)

#### Next.js says "Module not found"

**Problem**: Build error about missing modules.

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Try building again
npm run build
```

---

### 📝 Documentation Issues

#### README is unclear

**Problem**: Documentation doesn't explain something.

**Solution**:
1. Check [CONTRIBUTING.md](CONTRIBUTING.md) for more details
2. See [API Documentation](README.md#-api-documentation) section
3. Open a [discussion](https://github.com/elicortez/letmeaskaiforyou/discussions)
4. Submit a documentation improvement PR

---

## Still Having Issues?

### Get Help

1. **Check existing issues**: [GitHub Issues](https://github.com/elicortez/letmeaskaiforyou/issues)
2. **Ask in discussions**: [GitHub Discussions](https://github.com/elicortez/letmeaskaiforyou/discussions)
3. **Report new issue**: [Create Issue](https://github.com/elicortez/letmeaskaiforyou/issues/new)

### When Reporting an Issue, Include

- **Browser**: Chrome, Firefox, Safari, Edge (and version)
- **OS**: Windows, Mac, Linux (and version)
- **Steps to reproduce**: Exact steps that cause the issue
- **Expected vs actual**: What should happen vs what happens
- **Screenshots/videos**: If applicable
- **Console errors**: `F12` > Console tab (copy error messages)
- **URL**: Where you encountered the issue

### Debugging Tips

**Enable verbose logging**:
1. Open browser DevTools: `F12`
2. Go to Console tab
3. Run: `localStorage.setItem('DEBUG', '1')`
4. Reproduce the issue
5. Check console for debug messages

**Check network tab**:
1. Open browser DevTools: `F12`
2. Go to Network tab
3. Refresh page
4. Look for failed requests (red text)
5. Check response codes (200 = OK, 404 = Not Found, 500 = Server Error)

---

## Report a Security Issue

⚠️ **Do NOT create a public issue for security problems**

Email security concerns to: [security@example.com](mailto:security@example.com)

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

Last updated: November 10, 2025
