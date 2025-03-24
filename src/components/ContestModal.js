import React, { useState, useEffect } from 'react';
import { useIssues } from '../context/IssueContext';

function ContestModal({ isOpen, onClose, jobNumber, onSubmit }) {
  const { departments } = useIssues();
  const [contestReason, setContestReason] = useState('');
  const [targetDepartment, setTargetDepartment] = useState('');
  const [errors, setErrors] = useState({});
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setContestReason('');
      setTargetDepartment('');
      setErrors({});
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!targetDepartment) {
      newErrors.targetDepartment = 'Please select a department';
    }
    
    if (!contestReason.trim()) {
      newErrors.contestReason = 'Please provide a reason for the contest';
    } else if (contestReason.trim().length < 10) {
      newErrors.contestReason = 'Reason should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'targetDepartment') {
      setTargetDepartment(value);
    } else if (name === 'contestReason') {
      setContestReason(value);
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      jobNumber,
      reason: contestReason,
      targetDepartment
    });
    
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Contest Department Assignment</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Job Number</label>
            <input type="text" value={jobNumber} disabled />
          </div>
          
          <div className="form-group">
            <label className="required" htmlFor="targetDepartment">Target Department</label>
            <select 
              id="targetDepartment"
              name="targetDepartment"
              value={targetDepartment}
              onChange={handleInputChange}
              required
              aria-invalid={errors.targetDepartment ? 'true' : 'false'}
            >
              <option value="">Select correct department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.targetDepartment && <div className="form-error">{errors.targetDepartment}</div>}
          </div>
          
          <div className="form-group">
            <label className="required" htmlFor="contestReason">Reason for Contest</label>
            <textarea
              id="contestReason"
              name="contestReason"
              rows="4"
              placeholder="Explain why this issue belongs to a different department..."
              value={contestReason}
              onChange={handleInputChange}
              required
              aria-invalid={errors.contestReason ? 'true' : 'false'}
            ></textarea>
            {errors.contestReason && <div className="form-error">{errors.contestReason}</div>}
          </div>
          
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary">Submit Contest</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContestModal; 