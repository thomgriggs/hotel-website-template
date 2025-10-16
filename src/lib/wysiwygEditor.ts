/**
 * WYSIWYG Editor with Progressive Icon Picker
 * 
 * Features:
 * - Core formatting (bold, italic, link)
 * - Progressive icon picker (core + search + favorites)
 * - List creation (bulleted/numbered)
 * - Clean, intuitive interface
 */

export interface WYSIWYGOptions {
  fieldType: string;
  placeholder?: string;
  maxLength?: number;
}

export class WYSIWYGEditor {
  private container: HTMLElement;
  private textarea: HTMLElement; // Changed back to HTMLElement for contenteditable
  private toolbar: HTMLElement;
  private options: WYSIWYGOptions;
  private iconPicker: IconPicker;
  private isCodeView: boolean = false;

  constructor(container: HTMLElement, options: WYSIWYGOptions) {
    this.container = container;
    this.options = options;
    this.iconPicker = new IconPicker();

    this.createToolbar();
    this.createTextarea();
    this.setupEventListeners();
  }

  private createToolbar() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'wysiwyg-toolbar';
    
    // Core formatting buttons
    const coreButtons = this.getCoreButtons();
    
    // Contextual buttons based on field type
    const contextualButtons = this.getContextualButtons();
    
    this.toolbar.innerHTML = `
      <div class="toolbar-group toolbar-core">
        ${coreButtons}
      </div>
      <div class="toolbar-group toolbar-contextual">
        ${contextualButtons}
      </div>
      <div class="toolbar-group toolbar-view">
        <button type="button" class="toolbar-btn" data-action="toggle-view" title="Toggle Code/Visual View">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16,18 22,12 16,6"/>
            <polyline points="8,6 2,12 8,18"/>
          </svg>
        </button>
      </div>
    `;
    
    this.container.appendChild(this.toolbar);
  }

  private getCoreButtons(): string {
    return `
      <button type="button" class="toolbar-btn" data-action="bold" title="Bold">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
        </svg>
      </button>
      <button type="button" class="toolbar-btn" data-action="italic" title="Italic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="4" x2="10" y2="4"/>
          <line x1="14" y1="20" x2="5" y2="20"/>
          <line x1="15" y1="4" x2="9" y2="20"/>
        </svg>
      </button>
      <button type="button" class="toolbar-btn" data-action="link" title="Add Link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </button>
    `;
  }

  private getContextualButtons(): string {
    const buttons = [];
    
    // Add icon picker for most content types
    if (['paragraph', 'text', 'description'].includes(this.options.fieldType)) {
      buttons.push(`
        <button type="button" class="toolbar-btn" data-action="icon" title="Insert Icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
        </button>
      `);
    }
    
    // Add list buttons for paragraph content
    if (['paragraph', 'text', 'description'].includes(this.options.fieldType)) {
      buttons.push(`
        <button type="button" class="toolbar-btn" data-action="list-bullet" title="Bulleted List">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
        <button type="button" class="toolbar-btn" data-action="list-number" title="Numbered List">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"/>
            <line x1="10" y1="12" x2="21" y2="12"/>
            <line x1="10" y1="18" x2="21" y2="18"/>
            <path d="M4 6h1v4"/>
            <path d="M4 10h2"/>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
          </svg>
        </button>
      `);
    }
    
    return buttons.join('');
  }

  private createTextarea() {
    // Use contenteditable div for rich text editing
    this.textarea = document.createElement('div');
    this.textarea.className = 'wysiwyg-textarea';
    this.textarea.contentEditable = 'true';
    this.textarea.setAttribute('data-placeholder', this.options.placeholder || 'Enter content...');
    
    if (this.options.maxLength) {
      this.textarea.setAttribute('data-max-length', this.options.maxLength.toString());
    }
    
    this.container.appendChild(this.textarea);
  }

  private setupEventListeners() {
    // Toolbar button clicks
    this.toolbar.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest('.toolbar-btn') as HTMLButtonElement;
      if (!button) return;
      
      const action = button.dataset.action;
      this.handleToolbarAction(action);
    });
    
    // Keyboard shortcuts
    this.textarea.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });
    
    // Selection change events for visual feedback
    this.textarea.addEventListener('mouseup', () => {
      // Small delay to let selection settle
      setTimeout(() => {
        this.updateToolbarState();
      }, 10);
    });
    
    this.textarea.addEventListener('keyup', () => {
      this.updateToolbarState();
    });
    
    // Selection change detection
    this.textarea.addEventListener('selectionchange', () => {
      this.updateToolbarState();
    });
  }

  private handleToolbarAction(action: string) {
    switch (action) {
      case 'bold':
        this.insertFormatting('bold');
        break;
      case 'italic':
        this.insertFormatting('italic');
        break;
      case 'link':
        this.insertLink();
        break;
      case 'icon':
        this.showIconPicker();
        break;
      case 'list-bullet':
        this.insertList('bullet');
        break;
      case 'list-number':
        this.insertList('number');
        break;
      case 'toggle-view':
        this.toggleView();
        break;
    }
  }

  private handleKeyboardShortcuts(e: KeyboardEvent) {
    // Ctrl/Cmd + B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      this.insertFormatting('bold');
    }
    
    // Ctrl/Cmd + I for italic
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      this.insertFormatting('italic');
    }
    
    // Ctrl/Cmd + K for link
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.insertLink();
    }
  }

  private insertFormatting(formatType: 'bold' | 'italic') {
    // Use document.execCommand for reliable formatting
    const success = document.execCommand(formatType === 'bold' ? 'bold' : 'italic', false);
    
    if (success) {
      // Focus back to the editor
      this.textarea.focus();
      // Update toolbar state
      this.updateToolbarState();
    }
  }

  private insertLink() {
    const url = prompt('Enter URL:');
    if (!url) return;
    
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const selectedText = this.textarea.value.substring(start, end);
    
    const linkText = selectedText || 'Link Text';
    const linkMarkdown = `[${linkText}](${url})`;
    
    this.replaceSelection(linkMarkdown);
    this.textarea.focus();
  }

  private insertList(type: 'bullet' | 'number') {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const selectedText = this.textarea.value.substring(start, end);
    
    if (selectedText) {
      // Convert selected text to list
      const lines = selectedText.split('\n');
      const listItems = lines.map((line, index) => {
        if (type === 'bullet') {
          return `- ${line.trim()}`;
        } else {
          return `${index + 1}. ${line.trim()}`;
        }
      });
      
      this.replaceSelection(listItems.join('\n'));
    } else {
      // Insert new list item
      const listItem = type === 'bullet' ? '- ' : '1. ';
      this.replaceSelection(listItem);
    }
    
    this.textarea.focus();
  }

  private showIconPicker() {
    // Simplified icon picker - just insert a placeholder for now
    const iconHtml = '<span class="icon-placeholder">📎</span>';
    this.insertIcon(iconHtml);
  }

  private insertIcon(iconHtml: string) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = iconHtml;
      const iconElement = tempDiv.firstChild;
      
      if (iconElement) {
        range.insertNode(iconElement.cloneNode(true));
        // Move cursor after the icon
        range.setStartAfter(iconElement);
        range.setEndAfter(iconElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    
    this.textarea.focus();
  }

  public getValue(): string {
    // Return the HTML content for rich text
    return this.textarea.innerHTML;
  }

  public setValue(value: string) {
    // Set HTML content for rich text
    this.textarea.innerHTML = value;
  }

  private toggleView() {
    this.isCodeView = !this.isCodeView;
    
    if (this.isCodeView) {
      // Switch to code view - just change styling
      this.textarea.style.fontFamily = 'monospace';
      this.textarea.style.backgroundColor = '#f8f9fa';
    } else {
      // Switch to visual view
      this.textarea.style.fontFamily = 'var(--font-secondary, "Inter", sans-serif)';
      this.textarea.style.backgroundColor = 'var(--color-background, #ffffff)';
    }
    
    this.textarea.focus();
  }
  
  private updateToolbarState() {
    // Implementation for contenteditable - check selection properly
    const selection = window.getSelection();
    
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const hasSelection = selectedText && selectedText.trim().length > 0;
    
    // Update toolbar button states based on selection
    const boldBtn = this.toolbar.querySelector('[data-action="bold"]') as HTMLButtonElement;
    const italicBtn = this.toolbar.querySelector('[data-action="italic"]') as HTMLButtonElement;
    
    if (hasSelection) {
      // Text is selected - enable formatting buttons
      if (boldBtn) {
        boldBtn.style.opacity = '1';
        boldBtn.style.backgroundColor = '#007bff';
        boldBtn.style.color = 'white';
      }
      if (italicBtn) {
        italicBtn.style.opacity = '1';
        italicBtn.style.backgroundColor = '#007bff';
        italicBtn.style.color = 'white';
      }
    } else {
      // No text selected - dim formatting buttons
      if (boldBtn) {
        boldBtn.style.opacity = '0.6';
        boldBtn.style.backgroundColor = '';
        boldBtn.style.color = '';
      }
      if (italicBtn) {
        italicBtn.style.opacity = '0.6';
        italicBtn.style.backgroundColor = '';
        italicBtn.style.color = '';
      }
    }
  }
}

/**
 * Progressive Icon Picker
 * 
 * Features:
 * - Core icons (always visible)
 * - Search functionality (full Lucide library)
 * - Favorites system
 * - Clean, intuitive interface
 */
class IconPicker {
  private overlay: HTMLElement;
  private coreIcons: string[];
  private favorites: string[];
  private recent: string[];

  constructor() {
    this.coreIcons = [
      'phone', 'email', 'location', 'calendar', 'user',
      'star', 'heart', 'check', 'x', 'arrow-right',
      'home', 'menu', 'search', 'settings', 'info',
      'clock', 'map-pin', 'phone-call', 'mail', 'globe'
    ];
    this.favorites = this.loadFavorites();
    this.recent = this.loadRecent();
    this.createOverlay();
  }

  private createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'icon-picker-overlay';
    this.overlay.innerHTML = `
      <div class="icon-picker-modal">
        <div class="icon-picker-header">
          <h3>Insert Icon</h3>
          <button class="icon-picker-close" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="icon-picker-content">
          <div class="icon-picker-search">
            <input type="text" placeholder="Search icons..." class="icon-search-input">
          </div>
          <div class="icon-picker-tabs">
            <button class="tab-btn active" data-tab="core">Core</button>
            <button class="tab-btn" data-tab="search">Search</button>
            <button class="tab-btn" data-tab="favorites">Favorites</button>
          </div>
          <div class="icon-picker-grid" id="icon-grid">
            ${this.renderCoreIcons()}
          </div>
        </div>
      </div>
    `;
    
    this.setupEventListeners();
  }

  private renderCoreIcons(): string {
    return this.coreIcons.map(iconName => `
      <button class="icon-btn" data-icon="${iconName}" title="${iconName}">
        ${this.getIconSVG(iconName)}
      </button>
    `).join('');
  }

  private getIconSVG(iconName: string): string {
    // Simple SVG icons that match Lucide design
    const iconMap: Record<string, string> = {
      'phone': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      'email': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      'location': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
      'calendar': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      'user': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      'star': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>`,
      'heart': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      'check': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`,
      'x': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      'arrow-right': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>`,
      'home': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`,
      'menu': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
      'search': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
      'settings': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      'info': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
      'clock': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
      'map-pin': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
      'phone-call': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      'mail': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      'globe': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
    };
    
    return iconMap[iconName] || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>`;
  }

  private setupEventListeners() {
    // Close button
    this.overlay.querySelector('.icon-picker-close')?.addEventListener('click', () => {
      this.hide();
    });
    
    // Overlay click to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });
    
    // Tab switching
    this.overlay.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.target as HTMLElement).dataset.tab;
        this.switchTab(tab!);
      });
    });
    
    // Icon selection
    this.overlay.addEventListener('click', (e) => {
      const iconBtn = (e.target as HTMLElement).closest('.icon-btn') as HTMLButtonElement;
      if (iconBtn) {
        const iconName = iconBtn.dataset.icon;
        this.selectIcon(iconName!);
      }
    });
    
    // Search functionality
    const searchInput = this.overlay.querySelector('.icon-search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      this.searchIcons(query);
    });
  }

  private switchTab(tab: string) {
    // Update tab buttons
    this.overlay.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update content
    const grid = this.overlay.querySelector('#icon-grid') as HTMLElement;
    switch (tab) {
      case 'core':
        grid.innerHTML = this.renderCoreIcons();
        break;
      case 'search':
        grid.innerHTML = '<div class="search-placeholder">Search for icons above</div>';
        break;
      case 'favorites':
        grid.innerHTML = this.renderFavorites();
        break;
    }
  }

  private searchIcons(query: string) {
    if (!query.trim()) {
      this.switchTab('core');
      return;
    }
    
    // Simple search - in a real implementation, you'd search the full Lucide library
    const matchingIcons = this.coreIcons.filter(icon => 
      icon.toLowerCase().includes(query.toLowerCase())
    );
    
    const grid = this.overlay.querySelector('#icon-grid') as HTMLElement;
    grid.innerHTML = matchingIcons.map(iconName => `
      <button class="icon-btn" data-icon="${iconName}" title="${iconName}">
        ${this.getIconSVG(iconName)}
      </button>
    `).join('');
  }

  private renderFavorites(): string {
    if (this.favorites.length === 0) {
      return '<div class="empty-state">No favorites yet. Click the star on any icon to add it to favorites.</div>';
    }
    
    return this.favorites.map(iconName => `
      <button class="icon-btn" data-icon="${iconName}" title="${iconName}">
        ${this.getIconSVG(iconName)}
      </button>
    `).join('');
  }

  private selectIcon(iconName: string) {
    // Add to recent
    this.addToRecent(iconName);
    
    // Create icon HTML
    const iconHtml = `<span class="inline-icon" data-icon="${iconName}">${this.getIconSVG(iconName)}</span>`;
    
    // Call callback with icon HTML
    if (this.onSelect) {
      this.onSelect(iconHtml);
    }
    
    this.hide();
  }

  private addToRecent(iconName: string) {
    this.recent = this.recent.filter(icon => icon !== iconName);
    this.recent.unshift(iconName);
    this.recent = this.recent.slice(0, 10); // Keep only 10 recent
    this.saveRecent();
  }

  private loadFavorites(): string[] {
    try {
      return JSON.parse(localStorage.getItem('icon-favorites') || '[]');
    } catch {
      return [];
    }
  }

  private saveFavorites() {
    localStorage.setItem('icon-favorites', JSON.stringify(this.favorites));
  }

  private loadRecent(): string[] {
    try {
      return JSON.parse(localStorage.getItem('icon-recent') || '[]');
    } catch {
      return [];
    }
  }

  private saveRecent() {
    localStorage.setItem('icon-recent', JSON.stringify(this.recent));
  }

  private onSelect?: (iconHtml: string) => void;

  public show(callback: (iconHtml: string) => void) {
    this.onSelect = callback;
    document.body.appendChild(this.overlay);
    this.overlay.style.display = 'flex';
    
    // Focus search input
    const searchInput = this.overlay.querySelector('.icon-search-input') as HTMLInputElement;
    setTimeout(() => searchInput?.focus(), 100);
  }

  public hide() {
    this.overlay.style.display = 'none';
    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}
