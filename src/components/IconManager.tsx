/**
 * Icon Manager Component
 * Admin interface for managing custom icons
 */

import React, { useState, useEffect, useCallback } from 'react';
import { iconManager } from '../lib/iconManager';
import { iconUploadHandler, UploadProgress } from '../lib/iconUploader';
import { IconMetadata, IconUsageStats } from '../lib/iconRegistry';

export interface IconManagerProps {
  className?: string;
}

export interface IconManagerState {
  icons: IconMetadata[];
  customIcons: IconMetadata[];
  usageStats: IconUsageStats[];
  loading: boolean;
  error: string | null;
  uploadProgress: UploadProgress | null;
  showUploadForm: boolean;
  selectedIcon: IconMetadata | null;
}

export const IconManager: React.FC<IconManagerProps> = ({
  className = ''
}) => {
  const [state, setState] = useState<IconManagerState>({
    icons: [],
    customIcons: [],
    usageStats: [],
    loading: true,
    error: null,
    uploadProgress: null,
    showUploadForm: false,
    selectedIcon: null
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const [icons, usageStats] = await Promise.all([
        iconManager.getAvailableIcons(),
        iconManager.getAllUsageStats()
      ]);
      
      const customIcons = icons.filter(icon => icon.custom);
      
      setState(prev => ({
        ...prev,
        icons,
        customIcons,
        usageStats,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load data'
      }));
    }
  };

  const handleFileUpload = async (file: File, metadata: any) => {
    try {
      setState(prev => ({ ...prev, uploadProgress: null }));
      
      const result = await iconUploadHandler.uploadIcon(
        file,
        metadata,
        (progress) => {
          setState(prev => ({ ...prev, uploadProgress: progress }));
        }
      );

      if (result.success) {
        // Reload data to show new icon
        await loadData();
        setState(prev => ({ 
          ...prev, 
          showUploadForm: false,
          uploadProgress: null 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.error || 'Upload failed',
          uploadProgress: null 
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Upload failed',
        uploadProgress: null
      }));
    }
  };

  const handleDeleteIcon = async (iconId: string) => {
    if (!confirm('Are you sure you want to delete this icon?')) {
      return;
    }

    try {
      const success = await iconManager.deleteCustomIcon(iconId);
      
      if (success) {
        await loadData();
      } else {
        setState(prev => ({
          ...prev,
          error: 'Failed to delete icon'
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Delete failed'
      }));
    }
  };

  const getUsageStats = (iconId: string): IconUsageStats | null => {
    return state.usageStats.find(stats => stats.iconId === iconId) || null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (state.loading) {
    return (
      <div className={`icon-manager loading ${className}`}>
        <div className="loading-spinner">Loading icon manager...</div>
      </div>
    );
  }

  return (
    <div className={`icon-manager ${className}`}>
      {/* Header */}
      <div className="icon-manager-header">
        <h2>Icon Manager</h2>
        <div className="header-actions">
          <button 
            onClick={() => setState(prev => ({ ...prev, showUploadForm: true }))}
            className="upload-button"
          >
            Upload Icon
          </button>
          <button onClick={loadData} className="refresh-button">
            Refresh
          </button>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="error-banner">
          <span>{state.error}</span>
          <button onClick={() => setState(prev => ({ ...prev, error: null }))}>
            ×
          </button>
        </div>
      )}

      {/* Upload Progress */}
      {state.uploadProgress && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${state.uploadProgress.progress}%` }}
            />
          </div>
          <div className="progress-text">
            {state.uploadProgress.message} ({state.uploadProgress.progress}%)
          </div>
        </div>
      )}

      {/* Upload Form */}
      {state.showUploadForm && (
        <UploadForm
          onUpload={handleFileUpload}
          onCancel={() => setState(prev => ({ ...prev, showUploadForm: false }))}
        />
      )}

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{state.icons.length}</div>
          <div className="stat-label">Total Icons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{state.customIcons.length}</div>
          <div className="stat-label">Custom Icons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{state.usageStats.length}</div>
          <div className="stat-label">Used Icons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {state.usageStats.reduce((sum, stats) => sum + stats.usageCount, 0)}
          </div>
          <div className="stat-label">Total Usage</div>
        </div>
      </div>

      {/* Custom Icons List */}
      <div className="icons-section">
        <h3>Custom Icons ({state.customIcons.length})</h3>
        
        {state.customIcons.length > 0 ? (
          <div className="icons-grid">
            {state.customIcons.map(icon => {
              const usage = getUsageStats(icon.id);
              return (
                <div key={icon.id} className="icon-card">
                  <div className="icon-preview">
                    <IconPreview iconId={icon.id} />
                  </div>
                  <div className="icon-details">
                    <div className="icon-name">{icon.name}</div>
                    <div className="icon-description">{icon.description}</div>
                    <div className="icon-meta">
                      <span className="icon-category">{icon.category}</span>
                      <span className="icon-size">{formatFileSize(icon.fileSize || 0)}</span>
                      <span className="icon-date">{formatDate(icon.uploadDate || '')}</span>
                    </div>
                    {usage && (
                      <div className="icon-usage">
                        Used {usage.usageCount} times
                        {usage.lastUsed && (
                          <span> • Last used {formatDate(usage.lastUsed)}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="icon-actions">
                    <button 
                      onClick={() => setState(prev => ({ ...prev, selectedIcon: icon }))}
                      className="view-button"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDeleteIcon(icon.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <p>No custom icons uploaded yet.</p>
            <button 
              onClick={() => setState(prev => ({ ...prev, showUploadForm: true }))}
              className="upload-first-button"
            >
              Upload Your First Icon
            </button>
          </div>
        )}
      </div>

      {/* Icon Detail Modal */}
      {state.selectedIcon && (
        <IconDetailModal
          icon={state.selectedIcon}
          usageStats={getUsageStats(state.selectedIcon.id)}
          onClose={() => setState(prev => ({ ...prev, selectedIcon: null }))}
          onDelete={() => {
            handleDeleteIcon(state.selectedIcon!.id);
            setState(prev => ({ ...prev, selectedIcon: null }));
          }}
        />
      )}

      {/* Styles */}
      <style jsx>{`
        .icon-manager {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .icon-manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--preview-border-light, #e5e7eb);
        }

        .icon-manager-header h2 {
          margin: 0;
          font-size: 24px;
          color: var(--preview-text-inverse, #1f2937);
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .upload-button, .refresh-button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .upload-button {
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
        }

        .upload-button:hover {
          background: var(--preview-primary-hover, #4b5563);
        }

        .refresh-button {
          background: var(--preview-background-light, #f3f4f6);
          color: var(--preview-text-inverse, #1f2937);
          border: 1px solid var(--preview-border-light, #e5e7eb);
        }

        .refresh-button:hover {
          background: var(--preview-background-light, #e5e7eb);
        }

        .error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .upload-progress {
          background: var(--preview-background-light, #f9fafb);
          border: 1px solid var(--preview-border-light, #e5e7eb);
          border-radius: 6px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: var(--preview-border-light, #e5e7eb);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: var(--preview-primary, #374151);
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 13px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: var(--preview-background-light, #f9fafb);
          border: 1px solid var(--preview-border-light, #e5e7eb);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: var(--preview-primary, #374151);
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .icons-section h3 {
          margin: 0 0 16px;
          font-size: 18px;
          color: var(--preview-text-inverse, #1f2937);
        }

        .icons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .icon-card {
          background: white;
          border: 1px solid var(--preview-border-light, #e5e7eb);
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }

        .icon-card:hover {
          border-color: var(--preview-primary, #374151);
          box-shadow: 0 4px 12px var(--preview-shadow-light, rgba(0, 0, 0, 0.1));
        }

        .icon-preview {
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--preview-background-light, #f9fafb);
          border-radius: 6px;
        }

        .icon-details {
          margin-bottom: 12px;
        }

        .icon-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--preview-text-inverse, #1f2937);
          margin-bottom: 4px;
        }

        .icon-description {
          font-size: 14px;
          color: var(--preview-text-secondary, #6b7280);
          margin-bottom: 8px;
        }

        .icon-meta {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .icon-usage {
          font-size: 12px;
          color: var(--preview-text-secondary, #6b7280);
          margin-top: 4px;
        }

        .icon-actions {
          display: flex;
          gap: 8px;
        }

        .view-button, .delete-button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .view-button {
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
        }

        .view-button:hover {
          background: var(--preview-primary-hover, #4b5563);
        }

        .delete-button {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .delete-button:hover {
          background: #fee2e2;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          background: var(--preview-background-light, #f9fafb);
          border: 2px dashed var(--preview-border-light, #e5e7eb);
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0 0 16px;
          color: var(--preview-text-secondary, #6b7280);
        }

        .upload-first-button {
          padding: 12px 24px;
          background: var(--preview-primary, #374151);
          color: var(--preview-text, white);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .loading-spinner {
          text-align: center;
          padding: 40px;
          color: var(--preview-text-secondary, #6b7280);
        }
      `}</style>
    </div>
  );
};

// Helper Components
const IconPreview: React.FC<{ iconId: string }> = ({ iconId }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { iconRegistry } = await import('../lib/iconRegistry');
        const svg = await iconRegistry.getIconSVG(iconId);
        setSvgContent(svg);
      } catch (error) {
        console.error('Error loading icon preview:', error);
      }
    };
    loadIcon();
  }, [iconId]);

  if (svgContent) {
    return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
  }

  return <div className="icon-placeholder">?</div>;
};

const UploadForm: React.FC<{
  onUpload: (file: File, metadata: any) => void;
  onCancel: () => void;
}> = ({ onUpload, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'content',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile, {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
    }
  };

  return (
    <div className="upload-form">
      <h3>Upload Custom Icon</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>SVG File</label>
          <input
            type="file"
            accept=".svg,image/svg+xml"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="content">Content</option>
            <option value="actions">Actions</option>
            <option value="navigation">Navigation</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="e.g., edit, modify, change"
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Upload Icon</button>
        </div>
      </form>
    </div>
  );
};

const IconDetailModal: React.FC<{
  icon: IconMetadata;
  usageStats: IconUsageStats | null;
  onClose: () => void;
  onDelete: () => void;
}> = ({ icon, usageStats, onClose, onDelete }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{icon.name}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="icon-large-preview">
            <IconPreview iconId={icon.id} />
          </div>
          <div className="icon-info">
            <p><strong>Description:</strong> {icon.description}</p>
            <p><strong>Category:</strong> {icon.category}</p>
            <p><strong>Tags:</strong> {icon.tags.join(', ')}</p>
            {usageStats && (
              <p><strong>Usage:</strong> Used {usageStats.usageCount} times</p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onDelete} className="delete-button">Delete Icon</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default IconManager;
