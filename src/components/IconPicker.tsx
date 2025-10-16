/**
 * Icon Picker Component
 * React component for selecting icons from the icon registry
 */

import React, { useState, useEffect, useCallback } from 'react';
import { iconManager } from '../lib/iconManager';
import { iconRegistry, IconMetadata } from '../lib/iconRegistry';

export interface IconPickerProps {
  selectedIconId?: string;
  onIconSelect: (iconId: string) => void;
  onClose: () => void;
  category?: string;
  showCustomIcons?: boolean;
  className?: string;
}

export interface IconPickerState {
  icons: IconMetadata[];
  filteredIcons: IconMetadata[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIconId,
  onIconSelect,
  onClose,
  category,
  showCustomIcons = true,
  className = ''
}) => {
  const [state, setState] = useState<IconPickerState>({
    icons: [],
    filteredIcons: [],
    categories: [],
    selectedCategory: category || 'all',
    searchQuery: '',
    loading: true,
    error: null
  });

  // Load icons on component mount
  useEffect(() => {
    loadIcons();
  }, []);

  // Filter icons when search query or category changes
  useEffect(() => {
    filterIcons();
  }, [state.icons, state.searchQuery, state.selectedCategory]);

  const loadIcons = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const allIcons = await iconManager.getAvailableIcons();
      const categories = ['all', ...new Set(allIcons.map(icon => icon.category))];
      
      setState(prev => ({
        ...prev,
        icons: allIcons,
        categories,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load icons'
      }));
    }
  };

  const filterIcons = useCallback(() => {
    let filtered = state.icons;

    // Filter by category
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(icon => icon.category === state.selectedCategory);
    }

    // Filter by search query
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(query) ||
        icon.description.toLowerCase().includes(query) ||
        icon.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter custom icons if needed
    if (!showCustomIcons) {
      filtered = filtered.filter(icon => icon.lucide);
    }

    setState(prev => ({ ...prev, filteredIcons: filtered }));
  }, [state.icons, state.searchQuery, state.selectedCategory, showCustomIcons]);

  const handleCategoryChange = (category: string) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const handleSearchChange = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const handleIconClick = async (iconId: string) => {
    try {
      // Track usage
      iconManager.trackIconUsage(iconId, 'icon-picker');
      
      // Call the selection callback
      onIconSelect(iconId);
      
      // Close the picker
      onClose();
    } catch (error) {
      console.error('Error selecting icon:', error);
    }
  };

  const renderIcon = async (icon: IconMetadata): Promise<JSX.Element> => {
    try {
      const svgContent = await iconRegistry.getIconSVG(icon.id);
      
      return (
        <div
          key={icon.id}
          className={`icon-picker-item ${selectedIconId === icon.id ? 'selected' : ''}`}
          onClick={() => handleIconClick(icon.id)}
          title={`${icon.name} - ${icon.description}`}
        >
          <div className="icon-preview">
            {svgContent ? (
              <div 
                className="icon-svg"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            ) : (
              <div className="icon-placeholder">?</div>
            )}
          </div>
          <div className="icon-info">
            <div className="icon-name">{icon.name}</div>
            <div className="icon-category">{icon.category}</div>
          </div>
          {icon.custom && (
            <div className="icon-badge custom">Custom</div>
          )}
        </div>
      );
    } catch (error) {
      return (
        <div
          key={icon.id}
          className="icon-picker-item error"
          title="Failed to load icon"
        >
          <div className="icon-preview">
            <div className="icon-placeholder error">!</div>
          </div>
          <div className="icon-info">
            <div className="icon-name">{icon.name}</div>
            <div className="icon-category">{icon.category}</div>
          </div>
        </div>
      );
    }
  };

  if (state.loading) {
    return (
      <div className={`icon-picker loading ${className}`}>
        <div className="loading-spinner">Loading icons...</div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className={`icon-picker error ${className}`}>
        <div className="error-message">{state.error}</div>
        <button onClick={loadIcons} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`icon-picker ${className}`}>
      {/* Header */}
      <div className="icon-picker-header">
        <h3>Choose an Icon</h3>
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>

      {/* Search */}
      <div className="icon-picker-search">
        <input
          type="text"
          placeholder="Search icons..."
          value={state.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category Filter */}
      <div className="icon-picker-categories">
        {state.categories.map(cat => (
          <button
            key={cat}
            className={`category-button ${state.selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Icon Grid */}
      <div className="icon-picker-grid">
        {state.filteredIcons.length > 0 ? (
          state.filteredIcons.map(icon => (
            <React.Suspense key={icon.id} fallback={<div className="icon-loading">...</div>}>
              {renderIcon(icon)}
            </React.Suspense>
          ))
        ) : (
          <div className="no-icons">
            No icons found matching your criteria.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="icon-picker-footer">
        <div className="icon-count">
          {state.filteredIcons.length} icon{state.filteredIcons.length !== 1 ? 's' : ''}
        </div>
        {showCustomIcons && (
          <button className="upload-button">
            Upload Custom Icon
          </button>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .icon-picker {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          max-width: 800px;
          max-height: 80vh;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
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

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--preview-text-secondary, #6b7280);
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: var(--preview-background-light, #f3f4f6);
          color: var(--preview-text-inverse, #1f2937);
        }

        .icon-picker-search {
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--preview-border-light, #e5e7eb);
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--preview-primary, #374151);
          box-shadow: 0 0 0 3px var(--preview-background-light, rgba(55, 65, 81, 0.1));
        }

        .icon-picker-categories {
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .category-button {
          padding: 8px 16px;
          border: 1px solid var(--preview-border-light, #e5e7eb);
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .category-button:hover {
          background: var(--preview-background-light, #f9fafb);
        }

        .category-button.active {
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
          border-color: var(--preview-primary, #374151);
        }

        .icon-picker-grid {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
        }

        .icon-picker-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          border: 2px solid var(--preview-border-light, #e5e7eb);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .icon-picker-item:hover {
          border-color: var(--preview-primary, #374151);
          background: var(--preview-background-light, #f9fafb);
          transform: translateY(-2px);
        }

        .icon-picker-item.selected {
          border-color: var(--preview-primary, #374151);
          background: var(--preview-background-light, rgba(55, 65, 81, 0.1));
        }

        .icon-preview {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .icon-svg {
          width: 100%;
          height: 100%;
          color: var(--preview-primary, #374151);
        }

        .icon-placeholder {
          width: 100%;
          height: 100%;
          background: var(--preview-background-light, #f3f4f6);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .icon-info {
          text-align: center;
        }

        .icon-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--preview-text-inverse, #1f2937);
          margin-bottom: 2px;
        }

        .icon-category {
          font-size: 10px;
          color: var(--preview-text-secondary, #6b7280);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .icon-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
        }

        .icon-badge.custom {
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
        }

        .icon-picker-footer {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--preview-background-light, #f9fafb);
        }

        .icon-count {
          font-size: 13px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .upload-button {
          padding: 8px 16px;
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .upload-button:hover {
          background: var(--preview-primary-hover, #4b5563);
        }

        .no-icons {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .loading-spinner {
          padding: 40px;
          text-align: center;
          color: var(--preview-text-secondary, #6b7280);
        }

        .error-message {
          padding: 20px;
          text-align: center;
          color: var(--preview-error, #ef4444);
        }

        .retry-button {
          margin: 16px auto;
          padding: 8px 16px;
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default IconPicker;
