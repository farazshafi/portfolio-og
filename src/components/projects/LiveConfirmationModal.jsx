import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, AlertTriangle, Radio } from 'lucide-react';

export function LiveConfirmationModal({ project, onClose, onConfirm }) {
    if (!project) return null;

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content live-modal-content"
                initial={{ scale: 0.85, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 30, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose} aria-label="Close modal">
                    <X size={20} />
                </button>

                <div className="live-modal-header">
                    <div className="live-modal-icon">
                        <Clock size={36} color="#00ff88" />
                    </div>
                    <h2>Launching Live Demo</h2>
                    <span className="project-name-badge">{project.title}</span>
                </div>

                <div className="live-modal-body">
                    <div className="alert-box">
                        <AlertTriangle size={22} color="#ffb703" className="alert-icon" />
                        <p>
                            <strong>Notice: Server Spin-Up Time</strong><br />
                            This web application's backend server is hosted on a free/dormant tier. If the server is currently sleeping, it may take <strong>30 to 50 seconds</strong> to wake up and respond on your first load.
                        </p>
                    </div>
                    <p className="warmup-info">
                        ⚡ I already sent a wake-up ping in the background to speed up your load!
                    </p>
                </div>

                <div className="live-modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-go-live" onClick={onConfirm}>
                        <Radio size={18} /> Go Live
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default React.memo(LiveConfirmationModal);
