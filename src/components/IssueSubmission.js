import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';

function IssueSubmission() {
  const { addIssue, departments, isAnalyzing } = useIssues();
  
  const [jobNumber, setJobNumber] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [isQcCheckpoint, setIsQcCheckpoint] = useState(false);
  const [description, setDescription] = useState('');
  const [delayTime, setDelayTime] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Validate a single field
  const validateField = (name, value) => {
    switch (name) {
      case 'jobNumber':
        return value.trim() ? '' : 'Job number is required';
      case 'department':
        return value ? '' : 'Please select a department';
      case 'description':
        return value.trim().length >= 10 
          ? '' 
          : 'Description should be at least 10 characters';
      case 'delayTime':
        if (isQcCheckpoint) return '';
        
        if (!value) return 'Delay time is required for non-QC issues';
        // Safely parse the value to number
        const numValue = value && !isNaN(parseFloat(value)) ? parseFloat(value) : -1;
        if (numValue < 0) {
          return 'Please enter a valid positive number';
        }
        return '';
      default:
        return '';
    }
  };
  
  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      jobNumber: validateField('jobNumber', jobNumber),
      department: validateField('department', department),
      description: validateField('description', description),
      delayTime: validateField('delayTime', delayTime)
    };
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error);
  };
  
  // Handle input change and validate
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'jobNumber':
        setJobNumber(value);
        break;
      case 'partNumber':
        setPartNumber(value);
        break;
      case 'department':
        setDepartment(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'delayTime':
        setDelayTime(value);
        break;
      default:
        break;
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) element.focus();
      }
      return;
    }
    
    try {
      // Add the issue to context
      await addIssue({
        jobNumber,
        partNumber,
        department,
        isQcCheckpoint,
        description,
        delayTime: isQcCheckpoint ? '0' : delayTime
      });
      
      // Reset form
      setJobNumber('');
      setPartNumber('');
      setDepartment('');
      setIsQcCheckpoint(false);
      setDescription('');
      setDelayTime('');
      setErrors({});
      
      // Show success message
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      
      // Show toast notification
      if (window.showToast) {
        window.showToast('Issue successfully submitted!', 'success');
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      if (window.showToast) {
        window.showToast(`Error: ${error.message || 'Failed to submit issue'}`, 'error');
      }
    }
  };
  
  // Format current date as YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];
  
  return (
    <section>
      <div className="card">
        <h2 className="card-title">
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Issue Submission
        </h2>
        
        {submitSuccess && (
          <div className="success-message">
            Issue successfully submitted! The AI has analyzed and assigned it to a department.
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="required" htmlFor="jobNumber">Job Number</label>
              <input 
                type="text" 
                id="jobNumber"
                name="jobNumber"
                placeholder="Enter job number"
                value={jobNumber}
                onChange={handleInputChange}
                required
                disabled={isAnalyzing}
                aria-invalid={errors.jobNumber ? 'true' : 'false'}
              />
              {errors.jobNumber && <div className="form-error">{errors.jobNumber}</div>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="partNumber">Part Number</label>
              <input 
                type="text" 
                id="partNumber"
                name="partNumber"
                placeholder="Enter part number"
                value={partNumber}
                onChange={handleInputChange}
                disabled={isAnalyzing}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={currentDate} disabled />
          </div>

          <div className="form-group">
            <label className="required" htmlFor="department">Department Discovered</label>
            <select 
              id="department"
              name="department"
              value={department}
              onChange={handleInputChange}
              required
              disabled={isAnalyzing}
              aria-invalid={errors.department ? 'true' : 'false'}
            >
              <option value="">Select department</option>
              <option value="Supply Chain">Supply Chain</option>
              <option value="Engineering">Engineering</option>
              <option value="Metal Shop">Metal Shop</option>
              <option value="Pre-Assembly">Pre-Assembly</option>
              <option value="Bodywork">Bodywork</option>
              <option value="Paint">Paint</option>
              <option value="Sign-Shop">Sign-Shop</option>
              <option value="Final Assembly">Final Assembly</option>
            </select>
            {errors.department && <div className="form-error">{errors.department}</div>}
          </div>

          <div className="form-group checkbox-group" style={{ flexDirection: 'row' }}>
            <input 
              type="checkbox" 
              id="qc-checkpoint" 
              checked={isQcCheckpoint}
              onChange={(e) => {
                setIsQcCheckpoint(e.target.checked);
                // Clear delay time error if QC checkpoint is checked
                if (e.target.checked && errors.delayTime) {
                  setErrors({
                    ...errors,
                    delayTime: ''
                  });
                }
              }}
              style={{ marginRight: '10px' }}
              disabled={isAnalyzing}
            />
            <label htmlFor="qc-checkpoint">QC Checkpoint</label>
          </div>

          <div className="form-group">
            <label className="required" htmlFor="description">Description</label>
            <textarea 
              id="description"
              name="description"
              rows="4" 
              placeholder="Describe the issue..."
              value={description}
              onChange={handleInputChange}
              required
              disabled={isAnalyzing}
              aria-invalid={errors.description ? 'true' : 'false'}
            ></textarea>
            {errors.description && <div className="form-error">{errors.description}</div>}
            <small className="helper-text">Provide a detailed description for better AI analysis</small>
          </div>

          <div className="form-group">
            <label htmlFor="delayTime" className={isQcCheckpoint ? '' : 'required'}>
              Total Delay Time (hours)
            </label>
            <input 
              type="number" 
              id="delayTime"
              name="delayTime"
              step="0.1" 
              min="0"
              placeholder="e.g., 0.5"
              value={delayTime}
              onChange={handleInputChange}
              required={!isQcCheckpoint}
              disabled={isQcCheckpoint || isAnalyzing}
              aria-invalid={errors.delayTime ? 'true' : 'false'}
            />
            {errors.delayTime && <div className="form-error">{errors.delayTime}</div>}
            {isQcCheckpoint && 
              <small className="helper-text">Not required for QC Checkpoints</small>
            }
          </div>

          <button 
            type="submit" 
            className="primary" 
            style={{ alignSelf: 'flex-start' }}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="loader"></div>
                Analyzing...
              </>
            ) : "Submit Issue"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default IssueSubmission; 