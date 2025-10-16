# Preview Mode Template for New Pages

This template shows how to add preview mode and inline editing to any new page in the hotel website template.

## 1. Add Edit Attributes to Content

Add `data-sanity-edit-field` attributes to all editable content:

```astro
<!-- Headlines -->
<h1 data-sanity-edit-field="page-name#title">Page Title</h1>
<h2 data-sanity-edit-field="page-name#sectionTitle">Section Title</h2>

<!-- Paragraphs -->
<p data-sanity-edit-field="page-name#description">Page description text</p>

<!-- Buttons/Links -->
<a href="/link" class="btn" data-sanity-edit-field="page-name#buttonName">Button Text</a>

<!-- Images -->
<img src="image.jpg" alt="Alt text" data-sanity-edit-field="page-name#imageName" />

<!-- Lists -->
<ul data-sanity-edit-field="page-name#listName">
  <li>List item</li>
</ul>
```

## 2. Add Preview Mode Script

Add this script at the end of your page, before the closing `</Layout>` tag:

```astro
<script>
  // NEW: Redesigned preview mode with password protection and improved UX
  const urlParams = new URLSearchParams(window.location.search);
  const wantsPreview = urlParams.has('preview');
  
  if (wantsPreview) {
    // Load inline editor and set up preview mode
    import('/src/lib/inlineEditor.ts').then(module => {
      const { InlineEditor } = module;
      window.inlineEditor = new InlineEditor();
      
      // Check if already authenticated
      if (!window.inlineEditor.isAuthenticated) {
        // Show password prompt first
        window.inlineEditor.showPasswordPrompt(() => {
          // After successful authentication, enable preview mode
          initializePreviewMode();
        });
      } else {
        // Already authenticated, enable preview mode
        initializePreviewMode();
      }
    });
  }
  
  function initializePreviewMode() {
    // Add preview mode indicator (minimal locked indicator)
    const indicator = document.createElement('div');
    indicator.className = 'preview-mode-indicator';
    indicator.innerHTML = '🔓 Preview Mode Active';
    indicator.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(indicator);
    
    // Add preview mode styles with improved hover interactions
    const style = document.createElement('style');
    style.id = 'preview-mode-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      /* NEW: Hover interactions with borders and labels */
      [data-sanity-edit-field] {
        position: relative;
        transition: all 0.2s ease;
      }
      
      [data-sanity-edit-field]:hover {
        cursor: pointer;
      }
      
      /* Border and background for text content */
      [data-sanity-edit-field]:not(img):not(a):hover::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 3px solid #ff6b35;
        border-radius: 6px;
        background: rgba(255, 107, 53, 0.08);
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
      }
      
      /* Border for images with high visibility */
      [data-sanity-edit-field] img:hover {
        outline: 4px solid #ff6b35;
        outline-offset: 4px;
        box-shadow: 0 0 0 4px #ff6b35, 0 0 0 8px rgba(255, 255, 255, 0.8);
        filter: brightness(1.05);
        border-radius: 8px;
      }
      
      /* Border for buttons/links */
      [data-sanity-edit-field] a:hover,
      a[data-sanity-edit-field]:hover {
        outline: 3px solid #ff6b35;
        outline-offset: 3px;
        box-shadow: 0 0 0 3px #ff6b35, 0 0 0 6px rgba(255, 255, 255, 0.8);
      }
      
      /* Content type label (icon + text) */
      [data-sanity-edit-field]:hover::after {
        content: attr(data-content-label);
        position: absolute;
        top: -32px;
        left: 0;
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      
      /* Special styling for images */
      [data-sanity-edit-field][data-field-type="image"]:hover::after {
        top: 12px;
        left: 12px;
        font-size: 20px;
      }
    `;
    document.head.appendChild(style);
    
    // Make ALL content editable - add labels and click handlers
    document.querySelectorAll('[data-sanity-edit-field]').forEach(field => {
      const fieldPath = field.getAttribute('data-sanity-edit-field');
      const fieldName = fieldPath.split('#')[1];
      
      // Determine field type
      let fieldType = 'text';
      let contentLabel = '✏️ Text';
      
      if (field.tagName === 'H1' || field.tagName === 'H2' || field.tagName === 'H3') {
        fieldType = 'headline';
        contentLabel = '📰 Headline';
      } else if (field.tagName === 'IMG' || fieldName.toLowerCase().includes('image')) {
        fieldType = 'image';
        contentLabel = '🖼️';
      } else if (field.tagName === 'A' || fieldName.toLowerCase().includes('button')) {
        fieldType = 'button';
        contentLabel = '🔘 Button';
      } else if (fieldName.toLowerCase().includes('description') || fieldName.toLowerCase().includes('paragraph')) {
        fieldType = 'paragraph';
        contentLabel = '📄 Paragraph';
      }
      
      field.setAttribute('data-content-label', contentLabel);
      field.setAttribute('data-field-type', fieldType);
      
      // Make entire bordered area clickable
      field.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Get current value
        let currentValue = '';
        let currentUrl = '';
        
        if (field.tagName === 'IMG') {
          currentValue = field.src;
          currentUrl = field.alt || '';
        } else if (field.tagName === 'A') {
          currentValue = field.textContent.trim();
          currentUrl = field.href;
        } else {
          // Get text content excluding any child buttons
          currentValue = Array.from(field.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE || !node.classList?.contains('preview-edit-button'))
            .map(node => node.textContent)
            .join('').trim();
        }
        
        // Show editor
        window.inlineEditor.showEditor(fieldPath, currentValue, fieldType, currentUrl, contentLabel);
      });
    });
  }
</script>
```

## 3. Field Naming Convention

Use this naming pattern for `data-sanity-edit-field` attributes:

- **Page identifier**: Use kebab-case (e.g., `contact-page`, `location-page`, `about-page`)
- **Field name**: Use camelCase (e.g., `heroTitle`, `mainDescription`, `contactButton`)

Examples:
- `contact-page#heroTitle`
- `location-page#addressTitle`
- `about-page#teamDescription`

## 4. Content Types Supported

The system automatically detects and provides appropriate editors for:

- **📰 Headlines** (H1, H2, H3, H4, H5, H6)
- **📄 Paragraphs** (multi-line with line breaks)
- **🔘 Buttons** (text + URL + target window)
- **🖼️ Images** (URL + alt text)
- **🧭 Menu Items** (text + URL)
- **📋 Lists** (amenities, features, etc.)

## 5. Testing Preview Mode

To test preview mode on any page:

1. Visit the page with `?preview=true` parameter
2. Enter password: `edit2024`
3. Hover over content to see orange borders and labels
4. Click on bordered areas to edit content
5. Changes save directly to Sanity

Example URLs:
- `http://localhost:4322/?preview=true`
- `http://localhost:4322/contact?preview=true`
- `http://localhost:4322/location?preview=true`

## 6. Pages Already Configured

These pages already have preview mode enabled:
- ✅ Homepage (`/`)
- ✅ Rooms (`/rooms`)
- ✅ Dining (`/dining`)
- ✅ Amenities (`/amenities`)
- ✅ Contact (`/contact`)
- ✅ Location (`/location`)

## 7. Components with Preview Mode

These components have edit attributes:
- ✅ Header (logo, navigation, buttons)
- ✅ Footer (logo, contact info, social links)
- ✅ HeroSlider (all slider content)

## 8. Security Notes

- Password protection prevents unauthorized access
- Session-based authentication
- All changes require valid Sanity API token
- Preview mode only activates with `?preview=true` parameter

---

**Need Help?** Check existing pages like `contact.astro` or `location.astro` for complete examples of how to implement preview mode.



