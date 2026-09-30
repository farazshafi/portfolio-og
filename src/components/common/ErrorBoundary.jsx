import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-fallback-container" style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#ff4d4d',
                    background: 'rgba(15, 10, 30, 0.8)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 77, 77, 0.3)',
                    margin: '2rem 0'
                }}>
                    <h3>Something went wrong rendering this component</h3>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        {this.state.error?.message || "An unexpected error occurred."}
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{
                            marginTop: '1rem',
                            padding: '8px 16px',
                            background: '#7000ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
