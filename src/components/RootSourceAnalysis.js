import React, { useState, useEffect } from 'react';
import ContestModal from './ContestModal';
import { useIssues } from '../context/IssueContext';

function RootSourceAnalysis() {
  const { 
    issues, 
    contestIssue, 
    clearIssues, 
    exportIssues, 
    getIssuesByDepartment, 
    getDelaysByDepartment,
    isExporting
  } = useIssues();
  
  const [showContestModal, setShowContestModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [departmentIssues, setDepartmentIssues] = useState({});
  const [departmentDelays, setDepartmentDelays] = useState({});
  const [chartData, setChartData] = useState([]);
  
  // Update data when issues change
  useEffect(() => {
    try {
      const issuesByDept = getIssuesByDepartment();
      setDepartmentIssues(issuesByDept);
      
      const delaysByDept = getDelaysByDepartment();
      setDepartmentDelays(delaysByDept);
      
      // Format data for chart
      const data = Object.entries(delaysByDept)
        .filter(([dept, delay]) => delay > 0 && dept !== 'Unassigned')
        .map(([dept, delay]) => ({
          name: dept.split(' ')[0], // Use first word for short name
          value: parseFloat(delay.toFixed(1)),
          fullName: dept
        }))
        .sort((a, b) => b.value - a.value) // Sort by highest delay
        .slice(0, 6); // Only show top 6 departments
        
      setChartData(data);
    } catch (error) {
      console.error('Error updating analysis data:', error);
      if (window.showToast) {
        window.showToast('Error updating analysis data', 'error');
      }
    }
  }, [issues, getIssuesByDepartment, getDelaysByDepartment]);
  
  const handleContest = (jobNumber) => {
    setSelectedJob(jobNumber);
    setShowContestModal(true);
  };
  
  const handleContestSubmit = (contestData) => {
    try {
      contestIssue(contestData.jobNumber, contestData);
      if (window.showToast) {
        window.showToast('Department assignment contested successfully', 'success');
      }
    } catch (error) {
      console.error('Error contesting issue:', error);
      if (window.showToast) {
        window.showToast('Error contesting issue', 'error');
      }
    }
  };
  
  const handleExport = async () => {
    try {
      await exportIssues();
      if (window.showToast) {
        window.showToast('Data exported successfully', 'success');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      if (window.showToast) {
        window.showToast('Error exporting data', 'error');
      }
    }
  };
  
  const handleClearData = () => {
    try {
      clearIssues();
    } catch (error) {
      console.error('Error clearing data:', error);
      if (window.showToast) {
        window.showToast('Error clearing data', 'error');
      }
    }
  };

  // If there are no issues, show a placeholder
  if (issues.length === 0) {
    return (
      <section>
        <div className="card">
          <h2 className="card-title">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
            </svg>
            Root Source Analysis
          </h2>
          <div className="empty-state">
            <p>No issues submitted yet. Submit an issue to see analysis.</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section>
      <div className="card">
        <h2 className="card-title">
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
          </svg>
          Root Source Analysis
        </h2>
        
        <div className="action-buttons">
          <button 
            className="export-btn" 
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <div className="loader"></div>
                Exporting...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export CSV
              </>
            )}
          </button>
          
          <button className="clear-btn" onClick={handleClearData}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Clear Data
          </button>
        </div>
        
        {/* Chart visualization */}
        {chartData.length > 0 && (
          <div className="chart-container">
            <div className="x-axis"></div>
            
            {chartData.map((dept, index) => (
              <div 
                key={index}
                className="chart-bar" 
                style={{ height: `${(dept.value / Math.max(...chartData.map(d => d.value))) * 80}%` }}
              >
                <div className="bar-value">{dept.value}</div>
                <div className="bar-label">{dept.name}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Department sections */}
        {Object.entries(departmentIssues)
          .filter(([dept, issues]) => issues.length > 0)
          .sort(([deptA, issuesA], [deptB, issuesB]) => {
            // Sort by total delay time (descending)
            const delayA = departmentDelays[deptA] || 0;
            const delayB = departmentDelays[deptB] || 0;
            return delayB - delayA;
          })
          .map(([department, deptIssues]) => (
            <div className="department-section" key={department}>
              <div className="department-header">
                <div className="department-name">{department}</div>
                <div className="delay-time">
                  Total: {(departmentDelays[department] || 0).toFixed(1)} hrs
                </div>
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Job #</th>
                    <th>Part #</th>
                    <th>Discovered In</th>
                    <th>Description</th>
                    <th>Delay</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {deptIssues.map((issue, index) => (
                    <tr key={index} className={issue.contested ? 'contested-row' : ''}>
                      <td>{issue.date}</td>
                      <td>{issue.jobNumber}</td>
                      <td>{issue.partNumber || '-'}</td>
                      <td>{issue.department}</td>
                      <td>
                        {issue.description}
                        {issue.contested && (
                          <div className="contest-info">
                            <small>Contested from: {issue.previousDepartment}</small>
                          </div>
                        )}
                      </td>
                      <td>{issue.delayTime || '0'} hrs</td>
                      <td>
                        <button 
                          className="contest-btn"
                          onClick={() => handleContest(issue.jobNumber)}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                          Contest
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        
        {/* Contest Modal */}
        <ContestModal 
          isOpen={showContestModal}
          onClose={() => setShowContestModal(false)}
          jobNumber={selectedJob}
          onSubmit={handleContestSubmit}
        />
      </div>
    </section>
  );
}

export default RootSourceAnalysis; 