# Missing Keys Fix Guide

## 🎯 Problem
Sanity Studio shows "Missing keys" errors for array fields like:
- Page Sections
- Description arrays  
- Navigation items
- Social links
- Footer menu items

## 🔧 Solution: Manual Fix in Sanity Studio

### Step 1: Access Sanity Studio
1. Go to: http://localhost:3334/
2. Wait for the studio to fully load

### Step 2: Fix Each Document
For each document showing "Missing keys" errors:

1. **Click on the document** (e.g., "Our Rooms", "Homepage", etc.)
2. **Find the array field** with the error (e.g., "Page Sections")
3. **Click on the array field** to open it
4. **Simply save the document** (Ctrl+S or Cmd+S)
5. **Sanity will automatically generate missing `_key` properties**

### Step 3: Documents to Check
Check these document types for missing keys:

**Overview Pages:**
- Rooms Overview Page
- Dining Overview Page  
- Amenities Overview Page
- Events Overview Page
- Services Overview Page
- Gallery Overview Page

**Standalone Pages:**
- Homepage
- Contact Page
- Location Page
- Terms of Use
- Privacy Policy
- About Us
- Newsletter Signup

**Site Settings:**
- Global Settings (check navigation, footer menu, social links, legal links)

### Step 4: Verify Fix
After saving each document:
1. The "Missing keys" error should disappear
2. You should be able to edit array items normally
3. Drag-and-drop reordering should work

## 🚀 Quick Fix Script (Alternative)
If you have Sanity token access, run:
```bash
cd /Users/thomasgriggs/Development/hotel-website-template/hotel-website
SANITY_TOKEN=your_token node scripts/fix-keys-simple.js
```

## ✅ Expected Result
- All "Missing keys" errors resolved
- Array fields editable in Studio
- Drag-and-drop ordering working
- No more validation errors




