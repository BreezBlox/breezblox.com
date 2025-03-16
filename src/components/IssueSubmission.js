import React, { useState } from 'react';

function IssueSubmission() {
  const [jobNumber, setJobNumber] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [isQcCheckpoint, setIsQcCheckpoint] = useState(false);
  const [description, setDescription] = useState('');
  const [delayTime, setDelayTime] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ jobNumber, partNumber, department, isQcCheckpoint, description, delayTime });
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
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="required" htmlFor="job-number">Job Number</label>
              <input 
                type="text" 
                id="job-number" 
                placeholder="Enter job number"
                value={jobNumber}
                onChange={(e) => setJobNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="part-number">Part Number</label>
              <input 
                type="text" 
                id="part-number" 
                placeholder="Enter part number"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
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
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select department</option>
              <option value="supply-chain">Supply Chain</option>
              <option value="engineering">Engineering</option>
              <option value="metal-shop">Metal Shop</option>
              <option value="pre-assembly">Pre-Assembly</option>
              <option value="bodywork">Bodywork</option>
              <option value="paint">Paint</option>
              <option value="sign-shop">Sign-Shop</option>
              <option value="final-assembly">Final Assembly</option>
            </select>
          </div>

          <div className="form-group checkbox-group" style={{ flexDirection: 'row' }}>
            <input 
              type="checkbox" 
              id="qc-checkpoint" 
              checked={isQcCheckpoint}
              onChange={(e) => setIsQcCheckpoint(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="qc-checkpoint">QC Checkpoint</label>
          </div>

          <div className="form-group">
            <label className="required" htmlFor="description">Description</label>
            <textarea 
              id="description" 
              rows="4" 
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="delay-time">Total Delay Time (hours)</label>
            <input 
              type="number" 
              id="delay-time" 
              step="0.1" 
              placeholder="e.g., 0.5"
              value={delayTime}
              onChange={(e) => setDelayTime(e.target.value)}
            />
          </div>

          <button type="submit" className="primary" style={{ alignSelf: 'flex-start' }}>Submit Issue</button>
        </form>
      </div>
    </section>
  );
}

export default IssueSubmission; 