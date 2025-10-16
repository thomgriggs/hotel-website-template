// Global Preview Mode Module
// Extracted from individual pages to eliminate code duplication

export function initPreviewMode() {
	// Check if preview mode is requested
	const urlParams = new URLSearchParams(window.location.search);
	const wantsPreview = urlParams.has('preview');
	
	if (wantsPreview) {
		// Load inline editor and set up preview mode
		import('/src/lib/inlineEditor.ts').then((module: any) => {
			const { InlineEditor } = module;
			(window as any).inlineEditor = new InlineEditor();
			
			// Check if already authenticated
			if (!(window as any).inlineEditor.isAuthenticated) {
				// Show password prompt first
				(window as any).inlineEditor.showPasswordPrompt(() => {
					// After successful authentication, enable preview mode
					initializePreviewMode();
				});
			} else {
				// Already authenticated, enable preview mode
				initializePreviewMode();
			}
		});
	}
}

function initializePreviewMode() {
	// Create smart preview mode indicator with collision detection
	const indicator = document.createElement('div');
	indicator.className = 'smart-preview-indicator';
	indicator.innerHTML = `
		<div class="preview-icon" title="Preview Mode Active">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
				<circle cx="12" cy="12" r="3"></circle>
			</svg>
		</div>
		<div class="preview-menu" style="display: none;">
			<div class="menu-header">
				<span class="menu-title">Preview Mode</span>
				<span class="menu-status">Active</span>
			</div>
			<div class="menu-items">
				<button class="menu-item" id="disable-preview">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18"></path>
						<path d="M6 6l12 12"></path>
					</svg>
					Disable Editing
				</button>
				<a href="http://localhost:3333/" target="_blank" class="menu-item">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<polyline points="14,2 14,8 20,8"></polyline>
						<line x1="16" y1="13" x2="8" y2="13"></line>
						<line x1="16" y1="17" x2="8" y2="17"></line>
						<polyline points="10,9 9,9 8,9"></polyline>
					</svg>
					Open Studio
				</a>
				<button class="menu-item" id="preview-help">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"></circle>
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
						<line x1="12" y1="17" x2="12.01" y2="17"></line>
					</svg>
					Help
				</button>
			</div>
		</div>
	`;
	
	// Smart positioning with collision detection
	const positionIndicator = () => {
		const header = document.querySelector('header');
		const mobileMenu = document.querySelector('.mobile-menu');
		const rightSide = window.innerWidth - 20;
		const leftSide = 20;
		const topPosition = 80;
		
		// Check for header collision
		let finalPosition = 'right';
		let finalTop = topPosition;
		
		if (header) {
			const headerRect = header.getBoundingClientRect();
			const headerRight = headerRect.right;
			const headerLeft = headerRect.left;
			
			// If header extends far right, position on left
			if (headerRight > rightSide - 100) {
				finalPosition = 'left';
			}
			
			// Adjust top position if header is tall
			if (headerRect.height > 60) {
				finalTop = headerRect.bottom + 10;
			}
		}
		
		// Apply positioning
		indicator.style.cssText = `
			position: fixed;
			${finalPosition}: 20px;
			top: ${finalTop}px;
			z-index: 1000;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		`;
	};
	
	// Add styles
	const style = document.createElement('style');
	style.id = 'smart-preview-styles';
	style.textContent = `
		.smart-preview-indicator {
			position: fixed;
			right: 20px;
			top: 80px;
			z-index: 1000;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events: none;
		}
		
		.preview-icon {
			background: linear-gradient(135deg, #10b981 0%, #059669 100%);
			color: white;
			width: 44px;
			height: 44px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
			transition: all 0.3s ease;
			animation: pulse 2s infinite;
            pointer-events: auto;
		}
		
		.preview-icon:hover {
			transform: scale(1.1);
			box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
		}
		
		@keyframes pulse {
			0%, 100% { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); }
			50% { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.8); }
		}
		
		.preview-menu {
			position: absolute;
			top: 50px;
			right: 0;
			background: white;
			border-radius: 12px;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
			border: 1px solid #e5e7eb;
			min-width: 200px;
			overflow: hidden;
			animation: slideDown 0.2s ease;
            pointer-events: auto;
		}
		
		.smart-preview-indicator[data-position="left"] .preview-menu {
			right: auto;
			left: 0;
		}
		
		@keyframes slideDown {
			from {
				opacity: 0;
				transform: translateY(-10px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
		
		.menu-header {
			background: linear-gradient(135deg, #10b981 0%, #059669 100%);
			color: white;
			padding: 12px 16px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.menu-title {
			font-weight: 600;
			font-size: 14px;
		}
		
		.menu-status {
			font-size: 12px;
			opacity: 0.9;
		}
		
		.menu-items {
			padding: 8px 0;
		}
		
		.menu-item {
			width: 100%;
			padding: 12px 16px;
			border: none;
			background: none;
			text-align: left;
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 12px;
			font-size: 14px;
			color: #374151;
			text-decoration: none;
			transition: background-color 0.2s ease;
		}
		
		.menu-item:hover {
			background-color: #f3f4f6;
		}
		
		.menu-item svg {
			flex-shrink: 0;
		}
		
		/* Mobile responsiveness */
		@media (max-width: 768px) {
			.smart-preview-indicator {
				right: 10px;
				top: 70px;
			}
			
			.preview-icon {
				width: 40px;
				height: 40px;
			}
			
			.preview-menu {
				min-width: 180px;
			}
		}
	`;
	document.head.appendChild(style);
	document.body.appendChild(indicator);
	
	// Position indicator
	positionIndicator();
	
	// Re-position on resize
	window.addEventListener('resize', positionIndicator);
	
	// Menu toggle functionality
	const icon = indicator.querySelector('.preview-icon');
	const menu = indicator.querySelector('.preview-menu');
	let menuOpen = false;
	
	icon.addEventListener('click', (e) => {
		e.stopPropagation();
		menuOpen = !menuOpen;
		menu.style.display = menuOpen ? 'block' : 'none';
	});
	
	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!indicator.contains(e.target)) {
			menuOpen = false;
			menu.style.display = 'none';
		}
	});
	
	// Menu item functionality
	const disableBtn = indicator.querySelector('#disable-preview');
	const helpBtn = indicator.querySelector('#preview-help');
	
	disableBtn.addEventListener('click', () => {
		// Toggle editing mode (keep preview but disable editing)
		const isEditingDisabled = document.body.classList.contains('preview-no-edit');
		
		if (isEditingDisabled) {
			// Re-enable editing
			document.body.classList.remove('preview-no-edit');
			disableBtn.innerHTML = `
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18"></path>
					<path d="M6 6l12 12"></path>
				</svg>
				Disable Editing
			`;
			disableBtn.title = 'Disable editing overlays';
		} else {
			// Disable editing
			document.body.classList.add('preview-no-edit');
			disableBtn.innerHTML = `
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M9 12l2 2 4-4"></path>
					<circle cx="12" cy="12" r="10"></circle>
				</svg>
				Enable Editing
			`;
			disableBtn.title = 'Re-enable editing overlays';
		}
		
		// Close menu
		menuOpen = false;
		menu.style.display = 'none';
	});
	
	helpBtn.addEventListener('click', () => {
		alert('Preview Mode Help:\n\n• Hover over content to see edit indicators\n• Click on bordered areas to edit content\n• Use "Disable Editing" to navigate normally\n• Changes save directly to Sanity\n• Use the Studio link for advanced editing');
	});
	
	// PREVIEW MODE PERSISTENCE
	// Intercept all internal links to maintain preview mode
	document.addEventListener('click', (e) => {
		const link = e.target.closest('a');
		if (link && link.href && !link.href.includes('localhost:3333')) {
			const url = new URL(link.href);
			if (url.hostname === window.location.hostname) {
				e.preventDefault();
				// Add preview parameter to maintain mode
				const newUrl = new URL(link.href);
				newUrl.searchParams.set('preview', 'true');
				window.location.href = newUrl.toString();
			}
		}
	});
	
	// Add preview mode styles with improved hover interactions
	const previewStyle = document.createElement('style');
	previewStyle.id = 'preview-mode-styles';
	previewStyle.textContent = `
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
		
		/* UNIFIED EDITABLE ELEMENT SYSTEM - ROBUST VERSION */
		[data-sanity-edit-field] {
			position: relative;
			transition: all 0.2s ease;
		}
		
		[data-sanity-edit-field]:hover {
			cursor: pointer;
		}
		
		/* Unified border and background for ALL editable elements */
		[data-sanity-edit-field]:hover::before {
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
			z-index: 9999; /* High z-index to avoid conflicts */
			box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
		}
		
		/* Unified content type label for ALL elements */
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
			z-index: 10000; /* Even higher z-index for labels */
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		}
		
		/* Special positioning for images */
		[data-sanity-edit-field][data-field-type="image"]:hover::after {
			top: 8px;
			left: 8px;
			font-size: 14px;
		}
		
		/* Special positioning for buttons/links */
		[data-sanity-edit-field][data-field-type="button"]:hover::after,
		[data-sanity-edit-field][data-field-type="link"]:hover::after {
			top: -32px;
			left: 0;
		}
		
		/* ADAPTIVE COLOR SYSTEM - High contrast alternatives */
		[data-sanity-edit-field]:hover::before {
			/* Default orange - works on light backgrounds */
			border-color: #ff6b35;
			background: rgba(255, 107, 53, 0.08);
		}
		
		/* Detect dark backgrounds and use high contrast */
		[data-sanity-edit-field]:hover::before {
			/* Use CSS custom properties for dynamic theming */
			--edit-border: #ff6b35;
			--edit-bg: rgba(255, 107, 53, 0.08);
			--edit-label-bg: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		}
		
		/* High contrast mode for dark backgrounds */
		.dark-mode [data-sanity-edit-field]:hover::before,
		[data-sanity-edit-field].dark-context:hover::before {
			--edit-border: #00d4ff;
			--edit-bg: rgba(0, 212, 255, 0.15);
			--edit-label-bg: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
		}
		
		/* Apply the custom properties */
		[data-sanity-edit-field]:hover::before {
			border-color: var(--edit-border);
			background: var(--edit-bg);
		}
		
		[data-sanity-edit-field]:hover::after {
			background: var(--edit-label-bg);
		}
		
		/* IMAGE-SPECIFIC ENHANCEMENTS */
		[data-sanity-edit-field][data-field-type="image"]:hover {
			/* Add subtle image enhancement on hover */
			filter: brightness(1.02) contrast(1.01);
			transform: scale(1.005);
		}
		
		/* Ensure images don't break layout */
		[data-sanity-edit-field][data-field-type="image"] {
			display: inline-block;
			max-width: 100%;
		}
		
		/* CONTAINER OVERFLOW FIX */
		/* Ensure parent containers don't clip our borders */
		[data-sanity-edit-field] {
			/* Add padding to prevent clipping */
			margin: 4px;
		}
		
		/* Override common overflow settings that might clip borders */
		*:has([data-sanity-edit-field]:hover) {
			overflow: visible !important;
		}
		
		/* Specific fixes for common layout containers */
		.container:has([data-sanity-edit-field]:hover),
		.wrapper:has([data-sanity-edit-field]:hover),
		.section:has([data-sanity-edit-field]:hover) {
			overflow: visible !important;
		}
		
		/* DISABLE EDITING MODE */
		/* Hide all editing overlays when preview-no-edit class is present */
		.preview-no-edit [data-sanity-edit-field]:hover::before,
		.preview-no-edit [data-sanity-edit-field]:hover::after {
			display: none !important;
		}
		
		.preview-no-edit [data-sanity-edit-field]:hover {
			cursor: default !important;
		}
		
		/* Disable click handlers for editing when in no-edit mode */
		.preview-no-edit [data-sanity-edit-field] {
			pointer-events: auto !important;
		}
	`;
	document.head.appendChild(previewStyle);
	
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
				contentLabel = '🖼️ Image';
			} else if (field.tagName === 'A' || fieldName.toLowerCase().includes('button')) {
				fieldType = 'button';
				contentLabel = '🔘 Button';
			} else if (fieldName.toLowerCase().includes('description') || fieldName.toLowerCase().includes('paragraph')) {
				fieldType = 'paragraph';
				contentLabel = '📄 Paragraph';
			} else if (fieldName.toLowerCase().includes('address')) {
				fieldType = 'paragraph';
				contentLabel = '📍 Address';
			}
		
		field.setAttribute('data-content-label', contentLabel);
		field.setAttribute('data-field-type', fieldType);
		
		// ADAPTIVE COLOR DETECTION
		// Detect background color and apply appropriate contrast
		field.addEventListener('mouseenter', () => {
			const computedStyle = window.getComputedStyle(field);
			const backgroundColor = computedStyle.backgroundColor;
			
			// Parse RGB values
			const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
			if (rgbMatch) {
				const r = parseInt(rgbMatch[1]);
				const g = parseInt(rgbMatch[2]);
				const b = parseInt(rgbMatch[3]);
				
				// Calculate luminance
				const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
				
				// If background is dark (luminance < 0.5), use high contrast colors
				if (luminance < 0.5) {
					field.classList.add('dark-context');
				} else {
					field.classList.remove('dark-context');
				}
			}
			
			// Also check parent elements for dark backgrounds
			let parent = field.parentElement;
			while (parent && parent !== document.body) {
				const parentStyle = window.getComputedStyle(parent);
				const parentBg = parentStyle.backgroundColor;
				const parentRgbMatch = parentBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
				
				if (parentRgbMatch) {
					const pr = parseInt(parentRgbMatch[1]);
					const pg = parseInt(parentRgbMatch[2]);
					const pb = parseInt(parentRgbMatch[3]);
					const parentLuminance = (0.299 * pr + 0.587 * pg + 0.114 * pb) / 255;
					
					if (parentLuminance < 0.5) {
						field.classList.add('dark-context');
						break;
					}
				}
				parent = parent.parentElement;
			}
		});
		
		// Make entire bordered area clickable
		field.addEventListener('click', (e) => {
			// Skip editing if in no-edit mode
			if (document.body.classList.contains('preview-no-edit')) {
				return; // Allow normal link behavior
			}
			
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
			(window as any).inlineEditor.showEditor(fieldPath, currentValue, fieldType, currentUrl, contentLabel);
		});
	});
}
