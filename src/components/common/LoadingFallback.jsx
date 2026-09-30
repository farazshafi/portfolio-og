import React from 'react';

export function LoadingFallback({ height = '100%', message = 'Loading 3D Experience...' }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: height,
                minHeight: '200px',
                background: 'rgba(5, 5, 5, 0.5)',
                color: 'var(--accent-color, #7000ff)',
                borderRadius: '12px'
            }}
        >
            <div
                className="spinner"
                style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(112, 0, 255, 0.2)',
                    borderTop: '3px solid #00ffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                }}
            />
            <span style={{ fontSize: '0.9rem', letterSpacing: '0.1em', opacity: 0.8 }}>
                {message}
            </span>
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export function CanvasFallback() {
    return (
        <div className="canvas-container" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#050505' }}>
            {/* Silent background fallback while 3D Canvas loads */}
        </div>
    );
}
