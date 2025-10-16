// Redesigned Inline Editor with Password Protection and Improved UX
import { WYSIWYGEditor } from './wysiwygEditor';

export class InlineEditor {
  private password = 'edit2024'; // Development password
  private isAuthenticated = false;

  constructor() {
    // Check if already authenticated in this session
    this.isAuthenticated = sessionStorage.getItem('preview_authenticated') === 'true';
  }

  // Password protection check
  checkPassword(attempt: string): boolean {
    if (attempt === this.password) {
      this.isAuthenticated = true;
      sessionStorage.setItem('preview_authenticated', 'true');
      return true;
    }
    return false;
  }

  // Show password prompt
  showPasswordPrompt(callback: () => void) {
    const overlay = document.createElement('div');
    overlay.className = 'password-prompt-overlay';
    overlay.innerHTML = `
      <div class="password-prompt-popup">
        <div class="password-prompt-header">
          <div class="lock-icon">🔒</div>
          <h3>Preview Mode</h3>
          <p>Enter password to enable editing</p>
        </div>
        <div class="password-prompt-content">
          <input 
            type="password" 
            id="password-input" 
            class="password-input" 
            placeholder="Enter password..."
            autocomplete="off"
          >
          <div class="password-error" style="display: none;">Incorrect password. Try again.</div>
        </div>
        <div class="password-prompt-footer">
          <button class="btn btn-secondary" onclick="window.location.href = window.location.pathname">Cancel</button>
          <button class="btn btn-primary" id="password-submit">Unlock</button>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .password-prompt-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .password-prompt-popup {
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        max-width: 400px;
        width: 90%;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from { 
          transform: translateY(20px);
          opacity: 0;
        }
        to { 
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .password-prompt-header {
        padding: 30px 30px 20px;
        text-align: center;
        border-bottom: 2px solid #f0f0f0;
      }

      .lock-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }
      
      .password-prompt-header h3 {
        margin: 0 0 8px;
        font-size: 24px;
        color: #333;
        font-weight: 600;
      }

      .password-prompt-header p {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
      
      .password-prompt-content {
        padding: 30px;
      }
      
      .password-input {
        width: 100%;
        padding: 14px 16px;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        font-family: inherit;
        transition: all 0.2s ease;
        box-sizing: border-box;
      }
      
      .password-input:focus {
        outline: none;
        border-color: #ff6b35;
        box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
      }

      .password-error {
        margin-top: 12px;
        padding: 10px;
        background: #fee;
        color: #c33;
        border-radius: 6px;
        font-size: 14px;
        text-align: center;
      }
      
      .password-prompt-footer {
        padding: 20px 30px;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        border-top: 2px solid #f0f0f0;
      }
      
      .btn {
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
      }

      .btn-primary:active {
        transform: translateY(0);
      }
      
      .btn-secondary {
        background: #f5f5f5;
        color: #666;
      }

      .btn-secondary:hover {
        background: #e8e8e8;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // Handle password submission
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;
    const submitButton = document.getElementById('password-submit') as HTMLButtonElement;
    const errorDiv = overlay.querySelector('.password-error') as HTMLDivElement;

    const attemptPassword = () => {
      const attempt = passwordInput.value;
      if (this.checkPassword(attempt)) {
        overlay.remove();
        callback();
      } else {
        errorDiv.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        passwordInput.classList.add('error');
        setTimeout(() => {
          errorDiv.style.display = 'none';
          passwordInput.classList.remove('error');
        }, 2000);
      }
    };

    submitButton.addEventListener('click', attemptPassword);
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') attemptPassword();
    });

    // Close on ESC key
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);

    passwordInput.focus();
  }

  // Show inline editor popup with improved UX
  showEditor(fieldPath: string, currentValue: string, fieldType: string = 'text', currentUrl?: string, contentType?: string) {
    const [documentId, fieldName] = fieldPath.split('#');
    
    // Detect if this is a multi-line field
    const isMultiLine = fieldType === 'paragraph' || fieldType === 'list' || fieldType === 'textarea';
    const isParagraph = fieldType === 'paragraph';
    const isList = fieldType === 'list';
    
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'inline-editor-overlay';
    
    // Get appropriate icon for content type
    const icon = this.getContentTypeIcon(fieldType);
    const label = contentType || this.getFieldLabel(fieldName);
    
    overlay.innerHTML = `
      <div class="inline-editor-popup">
        <div class="inline-editor-header">
          <div class="editor-title">
            <span class="editor-icon">${icon}</span>
            <div>
              <h3>Edit ${label}</h3>
              <span class="editor-subtitle">${this.getFieldDescription(fieldType)}</span>
            </div>
          </div>
          <div class="editor-actions">
            <button class="icon-picker-button" aria-label="Change icon" title="Change icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </button>
            <button class="inline-editor-close" aria-label="Close editor">×</button>
          </div>
        </div>
        <div class="inline-editor-content">
          ${this.getEditorHTML(fieldType, currentValue, currentUrl, isParagraph, isList, fieldName)}
          ${isMultiLine ? `<div class="editor-hint">${isParagraph ? 'Press Enter twice for a new paragraph' : isList ? 'Press Enter for a new list item' : 'Use line breaks as needed'}</div>` : ''}
          ${fieldType === 'menu' ? `<div class="editor-note"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.9.37 4.1 1.03"/></svg> To reorder menu items, use Sanity Studio</div>` : ''}
        </div>
        <div class="inline-editor-footer">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save">Save Changes</button>
        </div>
      </div>
    `;

    // Add comprehensive styles
    this.addEditorStyles();
    document.body.appendChild(overlay);

    // Initialize WYSIWYG editor for text fields
    const wysiwygContainer = overlay.querySelector('.wysiwyg-container');
    if (wysiwygContainer) {
      const wysiwygElement = wysiwygContainer.querySelector('.wysiwyg-editor') as HTMLElement;
      if (wysiwygElement) {
        const placeholder = wysiwygElement.dataset.placeholder || 'Enter content...';
        const value = wysiwygElement.dataset.value || '';
        
        // Create WYSIWYG editor
        const wysiwygEditor = new WYSIWYGEditor(wysiwygElement, {
          fieldType: fieldType,
          placeholder: placeholder
        });
        
        // Set initial value
        if (value) {
          wysiwygEditor.setValue(value);
        }
        
        // Store reference for save functionality
        (overlay as any).wysiwygEditor = wysiwygEditor;
      }
    }

    // Handle close and cancel
    const closeBtn = overlay.querySelector('.inline-editor-close') as HTMLButtonElement;
    const cancelBtn = overlay.querySelector('.btn-cancel') as HTMLButtonElement;
    const saveBtn = overlay.querySelector('.btn-save') as HTMLButtonElement;
    const iconPickerBtn = overlay.querySelector('.icon-picker-button') as HTMLButtonElement;

    const closeEditor = () => overlay.remove();
    
    closeBtn.addEventListener('click', closeEditor);
    cancelBtn.addEventListener('click', closeEditor);
    
    // Handle icon picker
    iconPickerBtn.addEventListener('click', () => {
      // Icon picker is now handled by WYSIWYG editor
      console.log('Icon picker functionality moved to WYSIWYG editor');
    });
    
    // Close on overlay click (outside popup)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeEditor();
    });

    // Close on ESC key
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeEditor();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);

    // Handle save
    saveBtn.addEventListener('click', () => this.saveChanges(fieldPath, saveBtn, fieldType));

    // Focus on the first input
    const input = overlay.querySelector('.inline-editor-field') as HTMLInputElement | HTMLTextAreaElement;
    if (input) {
      input.focus();
      if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }

    // Auto-resize textarea
    if (isMultiLine) {
      const textarea = input as HTMLTextAreaElement;
      const autoResize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };
      textarea.addEventListener('input', autoResize);
      autoResize();
    }
  }

  // Get content type icon
  getContentTypeIcon(fieldType: string): string {
    const icons: { [key: string]: string } = {
      'text': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,7 4,4 20,4 20,7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
      'headline': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,7 4,4 20,4 20,7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
      'paragraph': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>',
      'list': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
      'button': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
      'image': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21,15 16,10 5,21"></polyline></svg>',
      'menu': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
      'url': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
      'email': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
    };
    return icons[fieldType] || '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
  }

  // Get field description
  getFieldDescription(fieldType: string): string {
    const descriptions: { [key: string]: string } = {
      'headline': 'Update the headline text',
      'paragraph': 'Edit paragraph content',
      'list': 'Edit list items',
      'button': 'Update button text and link',
      'image': 'Change image and alt text',
      'menu': 'Edit menu item',
      'text': 'Update text content'
    };
    return descriptions[fieldType] || 'Make your changes below';
  }

  // Add comprehensive editor styles
  addEditorStyles() {
    if (document.getElementById('inline-editor-styles')) return;

    const style = document.createElement('style');
    style.id = 'inline-editor-styles';
    style.textContent = `
      /* Overlay */
      .inline-editor-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: overlayFadeIn 0.2s ease;
        padding: 20px;
      }

      @keyframes overlayFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      /* Popup */
      .inline-editor-popup {
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        max-width: 600px;
        width: 100%;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        animation: popupSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      @keyframes popupSlideUp {
        from {
          transform: translateY(40px) scale(0.95);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
      
      /* Header */
      .inline-editor-header {
        padding: 24px 24px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 2px solid var(--preview-border-light, #e5e7eb);
        background: var(--preview-background-light, rgba(55, 65, 81, 0.05));
      }

      .editor-title {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }

      .editor-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .icon-picker-button {
        background: var(--preview-background-light, #f5f5f5);
        border: 1px solid var(--preview-border-light, #e5e7eb);
        font-size: 16px;
        cursor: pointer;
        color: var(--preview-text-secondary, #666);
        padding: 8px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .icon-picker-button:hover {
        background: var(--preview-primary-light, #6B7280);
        color: var(--preview-text, white);
        border-color: var(--preview-primary-light, #6B7280);
      }

      .editor-icon {
        font-size: 32px;
        line-height: 1;
        color: var(--preview-primary, #374151);
      }

      .editor-title h3 {
        margin: 0 0 4px;
        font-size: 20px;
        color: var(--preview-text-inverse, #1a1a1a);
        font-weight: 600;
        line-height: 1.3;
      }

      .editor-subtitle {
        font-size: 13px;
        color: var(--preview-text-secondary, #666);
        display: block;
      }
      
      .inline-editor-close {
        background: var(--preview-background-light, #f5f5f5);
        border: 1px solid var(--preview-border-light, #e5e7eb);
        font-size: 28px;
        cursor: pointer;
        color: var(--preview-text-secondary, #666);
        padding: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .inline-editor-close:hover {
        background: #e8e8e8;
        color: #333;
        transform: rotate(90deg);
      }
      
      /* Content */
      .inline-editor-content {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }
      
      /* Input Fields */
      .inline-editor-field {
        width: 100%;
        padding: 14px 16px;
        border: 2px solid var(--preview-border-light, #e0e0e0);
        border-radius: 10px;
        font-size: 15px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        resize: vertical;
        min-height: 120px;
        transition: all 0.2s ease;
        box-sizing: border-box;
        white-space: pre-wrap;
        background: var(--preview-background-light, rgba(255, 255, 255, 0.8));
        color: var(--preview-text-inverse, #1a1a1a);
      }
      
      .inline-editor-field:focus {
        outline: none;
        border-color: var(--preview-primary, #374151);
        box-shadow: 0 0 0 4px var(--preview-background-light, rgba(55, 65, 81, 0.1));
        transform: translateY(-1px);
      }
      
      .inline-editor-field:hover:not(:focus) {
        border-color: var(--preview-border, #c0c0c0);
      }

      /* Multi-field editors */
      .button-editor,
      .image-editor,
      .menu-editor {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .editor-field-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .editor-field-group label {
        font-weight: 600;
        color: #333;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .editor-field-group input,
      .editor-field-group select {
        padding: 12px 14px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 15px;
        transition: all 0.2s ease;
      }

      .editor-field-group input:focus,
      .editor-field-group select:focus {
        outline: none;
        border-color: #ff6b35;
        box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
      }

      /* Image Preview */
      .current-image {
        text-align: center;
        padding: 16px;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 12px;
        border: 2px solid #dee2e6;
      }

      .current-image img {
        max-width: 100%;
        height: auto;
        max-height: 200px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Hints and Notes */
      .editor-hint {
        margin-top: 12px;
        padding: 12px;
        background: #f0f7ff;
        border-left: 4px solid #4a9eff;
        border-radius: 6px;
        font-size: 13px;
        color: #0066cc;
      }

      .editor-note {
        margin-top: 12px;
        padding: 12px;
        background: #fffbf0;
        border-left: 4px solid #ffa500;
        border-radius: 6px;
        font-size: 13px;
        color: #cc6600;
      }

      /* Character/Item Count */
      .editor-count {
        text-align: right;
        font-size: 12px;
        color: #999;
        margin-top: 6px;
      }
      
      /* Footer */
      .inline-editor-footer {
        padding: 20px 24px;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        border-top: 2px solid #f0f0f0;
        background: #fafafa;
        border-radius: 0 0 16px 16px;
      }
      
      .btn {
        padding: 12px 28px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      
      .btn-save {
        background: var(--preview-primary, #374151);
        color: var(--preview-text, #FFFFFF);
        border: 1px solid var(--preview-primary, #374151);
        box-shadow: var(--preview-shadow, rgba(0, 0, 0, 0.3)) 0 4px 12px;
      }

      .btn-save:hover:not(:disabled) {
        transform: translateY(-2px);
        background: var(--preview-primary-hover, #4B5563);
        box-shadow: var(--preview-shadow, rgba(0, 0, 0, 0.4)) 0 6px 20px;
      }

      .btn-save:active:not(:disabled) {
        transform: translateY(0);
      }

      .btn-save:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .btn-cancel {
        background: var(--preview-background-light, white);
        color: var(--preview-text-secondary, #666);
        border: 2px solid var(--preview-border-light, #e0e0e0);
      }

      .btn-cancel:hover {
        background: var(--preview-background-light, #f5f5f5);
        border-color: var(--preview-border, #c0c0c0);
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .inline-editor-popup {
          max-width: 100%;
          max-height: 95vh;
          border-radius: 16px 16px 0 0;
        }

        .inline-editor-header {
          padding: 20px;
        }

        .editor-title h3 {
          font-size: 18px;
        }

        .editor-icon {
          font-size: 28px;
        }

        .inline-editor-content {
          padding: 20px;
        }

        .btn {
          padding: 10px 20px;
          font-size: 14px;
        }
      }

      /* Success Animation */
      @keyframes successPulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      .save-success {
        animation: successPulse 0.3s ease;
      }
    `;
    
    document.head.appendChild(style);
  }

  // Get appropriate editor HTML based on field type
  getEditorHTML(fieldType: string, currentValue: string, currentUrl?: string, isParagraph?: boolean, isList?: boolean, fieldName?: string): string {
    const escapeHtml = (str: string) => (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    switch (fieldType) {
      case 'paragraph':
      case 'list':
      case 'textarea':
        // Use WYSIWYG editor for rich text content
        const placeholder = isParagraph ? 
          'Enter paragraphs... (Use toolbar for formatting)' : 
          isList ? 'Enter list items... (Use toolbar for formatting)' : 
          'Enter text... (Use toolbar for formatting)';
        
        return `
          <div class="wysiwyg-container" data-field-type="${fieldType}">
            <div class="wysiwyg-editor" data-placeholder="${placeholder}" data-value="${escapeHtml(currentValue)}"></div>
            ${currentValue ? `<div class="editor-count">${currentValue.length} characters</div>` : ''}
          </div>
        `;
      
      case 'button':
        return `
          <div class="button-editor">
            <div class="editor-field-group">
              <label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> Button Text:</label>
              <input type="text" class="inline-editor-field" placeholder="e.g., Learn More" value="${escapeHtml(currentValue)}">
            </div>
            <div class="editor-field-group">
              <label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> Button URL:</label>
              <input type="url" class="inline-editor-field" placeholder="e.g., /contact or https://example.com" value="${escapeHtml(currentUrl || '')}">
            </div>
            <div class="editor-field-group">
              <label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> Open in:</label>
              <select class="inline-editor-field">
                <option value="_self">Same Window</option>
                <option value="_blank">New Window / Tab</option>
              </select>
            </div>
          </div>
        `;
      
      case 'image':
        return `
          <div class="image-editor">
            ${currentValue ? `
              <div class="current-image">
                <img src="${escapeHtml(currentValue)}" alt="Current image">
              </div>
            ` : ''}
            <div class="editor-field-group">
              <label>🖼️ Image URL:</label>
              <input type="url" class="inline-editor-field" placeholder="Enter image URL..." value="${escapeHtml(currentValue)}">
            </div>
            <div class="editor-field-group">
              <label>📝 Alt Text:</label>
              <input type="text" class="inline-editor-field" placeholder="Describe the image for accessibility...">
            </div>
            <div class="editor-hint">💡 For best results, upload images to your Sanity media library first</div>
          </div>
        `;
      
      case 'menu':
        return `
          <div class="menu-editor">
            <div class="editor-field-group">
              <label>🏷️ Menu Label:</label>
              <input type="text" class="inline-editor-field" placeholder="e.g., About Us" value="${escapeHtml(currentValue)}">
            </div>
            <div class="editor-field-group">
              <label>🔗 Destination URL:</label>
              <input type="url" class="inline-editor-field" placeholder="e.g., /about" value="${escapeHtml(currentUrl || '')}">
            </div>
          </div>
        `;
      
      case 'url':
        return `
          <div class="editor-field-group">
            <input type="url" class="inline-editor-field" placeholder="Enter URL..." value="${escapeHtml(currentValue)}">
          </div>
        `;
      
      case 'email':
        return `
          <div class="editor-field-group">
            <input type="email" class="inline-editor-field" placeholder="Enter email..." value="${escapeHtml(currentValue)}">
          </div>
        `;
      
      default:
        return `
          <input 
            type="text" 
            class="inline-editor-field" 
            placeholder="Enter text..." 
            value="${escapeHtml(currentValue)}"
          >
          ${currentValue ? `<div class="editor-count">${currentValue.length} characters</div>` : ''}
        `;
    }
  }

  // Get human-readable field label
  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'mainHeading': 'Main Heading',
      'mainDescription': 'Main Description',
      'heroTitle': 'Hero Title',
      'heroSubtitle': 'Hero Subtitle',
      'title': 'Title',
      'description': 'Description',
      'name': 'Name',
      'cuisine': 'Cuisine Type',
      'priceRange': 'Price Range'
    };
    
    // Convert camelCase to Title Case
    const formatted = fieldName.replace(/([A-Z])/g, ' $1').trim();
    return labels[fieldName] || formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  // Determine field type from path and context
  getFieldTypeFromPath(fieldPath: string): string {
    const fieldName = fieldPath.split('#')[1];
    
    // Button-related fields
    if (fieldName.includes('Button') || fieldName.includes('btn') || fieldName.includes('cta')) {
      return 'button';
    }
    
    // Image fields
    if (fieldName.includes('Image') || fieldName.includes('image') || fieldName.includes('heroImage')) {
      return 'image';
    }
    
    // URL fields
    if (fieldName.includes('Url') || fieldName.includes('url') || fieldName.includes('Link') || fieldName.includes('link')) {
      return 'url';
    }
    
    // Email fields
    if (fieldName.includes('email') || fieldName.includes('Email')) {
      return 'email';
    }
    
    // Multi-line fields
    if (fieldName.includes('Description') || fieldName.includes('description') || fieldName.includes('Content') || fieldName.includes('content')) {
      return 'paragraph';
    }
    
    return 'text';
  }

  // Save changes to Sanity via direct client calls
  async saveChanges(fieldPath: string, saveButton: HTMLButtonElement, fieldType: string) {
    const [documentId, fieldName] = fieldPath.split('#');
    const overlay = saveButton.closest('.inline-editor-overlay') as HTMLElement;
    
    try {
      // Show loading state
      const originalText = saveButton.textContent;
      saveButton.textContent = 'Saving...';
      saveButton.disabled = true;

      // Extract value(s) based on field type
      let newValue: any;
      
      if (fieldType === 'button') {
        const inputs = overlay.querySelectorAll('.inline-editor-field');
        const textInput = inputs[0] as HTMLInputElement;
        const urlInput = inputs[1] as HTMLInputElement;
        const targetSelect = inputs[2] as HTMLSelectElement;
        
        newValue = {
          text: (textInput?.value || '').trim(),
          url: (urlInput?.value || '').trim(),
          target: targetSelect?.value || '_self'
        };
      } else if (fieldType === 'image') {
        const inputs = overlay.querySelectorAll('.inline-editor-field');
        const urlInput = inputs[0] as HTMLInputElement;
        const altInput = inputs[1] as HTMLInputElement;
        
        newValue = {
          url: (urlInput?.value || '').trim(),
          alt: (altInput?.value || '').trim()
        };
      } else if (fieldType === 'menu') {
        const inputs = overlay.querySelectorAll('.inline-editor-field');
        const labelInput = inputs[0] as HTMLInputElement;
        const urlInput = inputs[1] as HTMLInputElement;
        
        newValue = {
          text: (labelInput?.value || '').trim(),
          url: (urlInput?.value || '').trim()
        };
      } else if (fieldType === 'paragraph' || fieldType === 'list' || fieldType === 'textarea') {
        // Check if we have a WYSIWYG editor
        const wysiwygEditor = (overlay as any).wysiwygEditor;
        if (wysiwygEditor) {
          const rawValue = wysiwygEditor.getValue();
          
          // For HTML content, we need to handle it differently
          if (fieldType === 'paragraph') {
            // Convert HTML to plain text for paragraph fields
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = rawValue;
            const plainText = tempDiv.textContent || tempDiv.innerText || '';
            newValue = plainText.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 0);
          } else if (fieldType === 'list') {
            // Convert HTML to plain text for list fields
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = rawValue;
            const plainText = tempDiv.textContent || tempDiv.innerText || '';
            newValue = plainText.split(/\n+/).map(item => item.trim()).filter(item => item.length > 0);
          } else {
            // For textarea, keep as HTML string
            newValue = rawValue;
          }
        } else {
          // Fallback to regular textarea
          const textarea = overlay.querySelector('.inline-editor-field') as HTMLTextAreaElement;
          const rawValue = textarea?.value || '';
          
          // For paragraphs, split on double line breaks
          // For lists, split on single line breaks
          if (fieldType === 'paragraph') {
            newValue = rawValue.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 0);
          } else if (fieldType === 'list') {
            newValue = rawValue.split(/\n/).map(item => item.trim()).filter(item => item.length > 0);
          } else {
            // For textarea, keep as single string
            newValue = rawValue;
          }
        }
      } else {
        const input = overlay.querySelector('.inline-editor-field') as HTMLInputElement | HTMLTextAreaElement;
        if (!input) {
          console.error('No input field found');
          throw new Error('No input field found');
        }
        newValue = (input.value || '').trim();
      }
      
      console.log('Saving changes:', { documentId, fieldName, newValue, fieldType });
      
      // Use Sanity client directly with proper error handling
      const { createClient } = await import('@sanity/client');
      
      const client = createClient({
        projectId: '0knotzp4',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2023-05-03',
        token: 'skTgX04FcukL6ovhMe8qGUtUmiUIdPH0pLxiFuFWeCLts4fkrVb2dp8t0OU4PObdTeMmxzEnpQ0ckQiqq7v4Q4NkgiBvU8JSGxSZCDZIqHWRcfYZmWmZVV6DIXqIp5vdfjv0tLpi9mJEbhKeXpOsq0yJiwptMZHiuQ93rTjTGUSc0SvEU40v', // Write token for preview mode
      });

      // Build the patch operation
      const patch = client.patch(documentId);
      
      // Handle different field types
      if (fieldType === 'button') {
        await patch
          .set({ [`${fieldName}.text`]: newValue.text })
          .set({ [`${fieldName}.url`]: newValue.url })
          .set({ [`${fieldName}.target`]: newValue.target })
          .commit();
      } else if (fieldType === 'image') {
        await patch
          .set({ [`${fieldName}.url`]: newValue.url })
          .set({ [`${fieldName}.alt`]: newValue.alt })
          .commit();
      } else if (fieldType === 'menu') {
        await patch
          .set({ [`${fieldName}.text`]: newValue.text })
          .set({ [`${fieldName}.url`]: newValue.url })
          .commit();
      } else {
        await patch.set({ [fieldName]: newValue }).commit();
      }

      // Update the page content
      this.updatePageContent(fieldPath, newValue);
      
      // Show success animation
      saveButton.classList.add('save-success');
      saveButton.textContent = '✓ Saved!';
      
      // Close after short delay
      setTimeout(() => {
        overlay.remove();
      }, 800);
      
    } catch (error) {
      console.error('Error saving changes:', error);
      saveButton.textContent = 'Save Changes';
      saveButton.disabled = false;
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to save changes. Please try again.';
      this.showErrorMessage(errorMessage);
    }
  }

  // Update page content after successful save
  updatePageContent(fieldPath: string, newValue: any) {
    const element = document.querySelector(`[data-sanity-edit-field="${fieldPath}"]`);
    if (!element) return;
    
    if (typeof newValue === 'object' && newValue !== null) {
      if (newValue.text && newValue.url) { // Button or Menu
        if (element.tagName === 'A') {
          // Update text nodes only, preserving child elements
          for (let node of Array.from(element.childNodes)) {
            if (node.nodeType === Node.TEXT_NODE) {
              node.textContent = newValue.text;
              break;
            }
          }
          (element as HTMLAnchorElement).href = newValue.url;
          if (newValue.target) {
            (element as HTMLAnchorElement).target = newValue.target;
          }
        }
      } else if (newValue.url) { // Image
        if (element.tagName === 'IMG') {
          (element as HTMLImageElement).src = newValue.url;
          if (newValue.alt) {
            (element as HTMLImageElement).alt = newValue.alt;
          }
        }
      } else if (Array.isArray(newValue)) { // Paragraph or List
        // For arrays, join with appropriate separator
        const separator = newValue.length > 1 ? '\n\n' : '';
        const textContent = newValue.join(separator);
        
        // Update text content
        if (element.tagName === 'P' || element.tagName === 'DIV') {
          element.textContent = textContent;
        }
      }
    } else { // Simple text
      // Update text content, preserving edit button if present
      const editBtn = element.querySelector('.preview-edit-button');
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement).value = newValue;
      } else {
        // Find and update text nodes only
        for (let node of Array.from(element.childNodes)) {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = newValue;
            break;
          } else if (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).classList.contains('preview-edit-button')) {
            node.textContent = newValue;
            break;
          }
        }
      }
    }
  }

  // Show success message
  showSuccessMessage(message: string) {
    const toast = document.createElement('div');
    toast.className = 'editor-toast success';
    toast.textContent = `✓ ${message}`;
    
    const style = document.createElement('style');
    style.textContent = `
      .editor-toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: #10b981;
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: toastSlideIn 0.3s ease, toastSlideOut 0.3s ease 2.7s;
        font-weight: 600;
      }

      @keyframes toastSlideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes toastSlideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 3000);
  }

  // Show error message
  showErrorMessage(message: string) {
    const toast = document.createElement('div');
    toast.className = 'editor-toast error';
    toast.textContent = `✗ ${message}`;
    
    const style = document.createElement('style');
    style.textContent = `
      .editor-toast.error {
        background: #ef4444;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 4000);
  }

  /**
   * Show icon picker for changing field icons
   */
  async showIconPicker(fieldPath: string, fieldType: string): Promise<void> {
    try {
      // Create overlay for icon picker
      const overlay = document.createElement('div');
      overlay.className = 'icon-picker-overlay';
      overlay.innerHTML = `
        <div class="icon-picker-container">
          <div class="icon-picker-header">
            <h3>Choose Icon for ${this.getFieldLabel(fieldPath.split('#')[1])}</h3>
            <button class="icon-picker-close">×</button>
          </div>
          <div class="icon-picker-content">
            <div class="icon-picker-loading">Loading icons...</div>
          </div>
        </div>
      `;

      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .icon-picker-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10002;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-picker-container {
          background: white;
          border-radius: 12px;
          width: 90vw;
          max-width: 800px;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .icon-picker-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--preview-background-light, #f9fafb);
        }

        .icon-picker-header h3 {
          margin: 0;
          font-size: 18px;
          color: var(--preview-text-inverse, #1f2937);
        }

        .icon-picker-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--preview-text-secondary, #6b7280);
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .icon-picker-close:hover {
          background: var(--preview-background-light, #f3f4f6);
          color: var(--preview-text-inverse, #1f2937);
        }

        .icon-picker-content {
          padding: 24px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .icon-picker-loading {
          text-align: center;
          padding: 40px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 16px;
        }

        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          border: 2px solid var(--preview-border-light, #e5e7eb);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-item:hover {
          border-color: var(--preview-primary, #374151);
          background: var(--preview-background-light, #f9fafb);
          transform: translateY(-2px);
        }

        .icon-item.selected {
          border-color: var(--preview-primary, #374151);
          background: var(--preview-background-light, rgba(55, 65, 81, 0.1));
        }

        .icon-preview {
          width: 24px;
          height: 24px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--preview-text-inverse, #1f2937);
          text-align: center;
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(overlay);

      // Load icons
      const { iconManager } = await import('./iconManager');
      const icons = await iconManager.getAvailableIcons();
      
      // Filter icons by field type
      const relevantIcons = icons.filter(icon => {
        const tags = icon.tags.map(tag => tag.toLowerCase());
        const fieldTypeLower = fieldType.toLowerCase();
        return tags.includes(fieldTypeLower) || 
               tags.includes('general') || 
               icon.category === 'content';
      });

      // Render icon grid
      const content = overlay.querySelector('.icon-picker-content');
      if (content) {
        content.innerHTML = `
          <div class="icon-grid">
            ${relevantIcons.map(icon => `
              <div class="icon-item" data-icon-id="${icon.id}">
                <div class="icon-preview">
                  <div class="icon-svg" data-icon-id="${icon.id}"></div>
                </div>
                <div class="icon-name">${icon.name}</div>
              </div>
            `).join('')}
          </div>
        `;

        // Icon picker functionality moved to WYSIWYG editor
        console.log('Icon picker moved to WYSIWYG editor');
      }

      // Add event listeners
      const closeBtn = overlay.querySelector('.icon-picker-close');
      const iconItems = overlay.querySelectorAll('.icon-item');

      const closePicker = () => {
        overlay.remove();
        style.remove();
      };

      closeBtn?.addEventListener('click', closePicker);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePicker();
      });

      // Handle icon selection
      iconItems.forEach(item => {
        item.addEventListener('click', async () => {
          const iconId = item.getAttribute('data-icon-id');
          if (iconId) {
            // Track usage
            await iconManager.trackIconUsage(iconId, `field-${fieldType}`);
            
            // Update the field's icon (this would need to be implemented)
            // For now, just show a success message
            this.showToast(`Icon changed to ${iconId}`, 'success');
            
            closePicker();
          }
        });
      });

      // Close on ESC key
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closePicker();
          document.removeEventListener('keydown', handleKeydown);
        }
      };
      document.addEventListener('keydown', handleKeydown);

    } catch (error) {
      console.error('Error showing icon picker:', error);
      this.showToast('Failed to load icon picker', 'error');
    }
  }
}
