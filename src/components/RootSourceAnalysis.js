import React, { useState, useEffect, useRef } from 'react';
import ContestModal from './ContestModal';
import { useIssues } from '../context/IssueContext';

function RootSourceAnalysis() {
  const { 
    issues, 
    contestIssue, 
    deleteIssue,
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
  const chartRef = useRef(null);
  
  // Update data when issues change
  useEffect(() => {
    try {
      const issuesByDept = getIssuesByDepartment();
      setDepartmentIssues(issuesByDept);
      
      const delaysByDept = getDelaysByDepartment();
      setDepartmentDelays(delaysByDept);
      
      // Count QC checkpoints per department
      const qcCountByDept = {};
      issues.forEach(issue => {
        if (issue.isQcCheckpoint) {
          const dept = issue.rootDepartment;
          qcCountByDept[dept] = (qcCountByDept[dept] || 0) + 1;
        }
      });
      
      // Format data for chart - include departments with delay > 0 OR with QC checkpoints
      const data = Object.entries(delaysByDept)
        .filter(([dept, delay]) => 
          (delay > 0 || (qcCountByDept[dept] && qcCountByDept[dept] > 0)) && 
          dept !== 'Unassigned'
        )
        .map(([dept, delay]) => ({
          name: dept.split(' ')[0], // Use first word for short name
          value: parseFloat(delay.toFixed(1)),
          qcCount: qcCountByDept[dept] || 0,
          fullName: dept
        }))
        .sort((a, b) => b.value - a.value) // Sort by highest delay
        .slice(0, 6); // Only show top 6 departments
      
      // Ensure data is properly formatted for rendering
      console.log('Chart data:', data);
      setChartData(data);
    } catch (error) {
      console.error('Error updating analysis data:', error);
      setChartData([]);
      if (window.showToast) {
        window.showToast('Error updating analysis data', 'error');
      }
    }
  }, [issues, getIssuesByDepartment, getDelaysByDepartment]);
  
  // Direct DOM manipulation to set bar heights
  useEffect(() => {
    if (chartRef.current && chartData.length > 0) {
      const maxValue = Math.max(...chartData.map(d => d.value || 0));
      
      // Get all bar elements
      const barElements = chartRef.current.querySelectorAll('.custom-chart-bar');
      
      // Force set the heights based on values
      barElements.forEach((barElement, index) => {
        if (index < chartData.length) {
          const value = chartData[index].value || 0;
          // Calculate height percentage (min 5%)
          const heightPercent = maxValue > 0 
            ? Math.max(Math.floor((value / maxValue) * 100), 5) 
            : 5;
          
          // Force override the height with !important
          barElement.style.setProperty('height', `${heightPercent}%`, 'important');
          
          // Make sure the bar label shows the correct value
          const valueLabel = barElement.querySelector('.value-label');
          if (valueLabel) {
            valueLabel.textContent = value;
          }
        }
      });
    }
  }, [chartData]);
  
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

  const handleDelete = (jobNumber) => {
    deleteIssue(jobNumber);
  };
  
  // Chart visualization with fixed heights
  const renderChart = () => {
    if (!chartData || chartData.length === 0) return null;
    
    // Define colors for each bar
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8E24AA', '#16A2D7'];
    
    // Calculate max value for scaling
    const maxValue = Math.max(...chartData.map(d => d.value || 0));
    
    // Use table for completely different layout
    return (
      <div 
        style={{ 
          margin: '20px 0 30px 0', 
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#1e1e2d'
        }}
      >
        <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#fff' }}>
          Department Delays
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {chartData.map((dept, index) => (
                <td 
                  key={index} 
                  style={{ 
                    padding: '0 5px', 
                    textAlign: 'center', 
                    verticalAlign: 'bottom',
                    width: `${100 / chartData.length}%`
                  }}
                >
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '5px',
                    color: colors[index % colors.length]
                  }}>
                    {dept.value}
                  </div>
                  
                  <div 
                    className="custom-chart-bar"
                    style={{ 
                      height: maxValue > 0 ? `${Math.max((dept.value / maxValue) * 150, 10)}px` : '10px',
                      backgroundColor: colors[index % colors.length],
                      margin: '0 auto',
                      width: '80%',
                      borderRadius: '4px 4px 0 0'
                    }}
                  />
                  
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#ccc' }}>
                    {dept.name}
                    {dept.qcCount > 0 && (
                      <span style={{ 
                        backgroundColor: '#ff9800',
                        color: 'white',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        fontSize: '10px',
                        marginLeft: '5px'
                      }}>
                        QC: {dept.qcCount}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
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
        {renderChart()}
        
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
                    <th>Actions</th>
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
                        {issue.isQcCheckpoint && (
                          <div className="qc-tag">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            QC
                          </div>
                        )}
                        {issue.contested && (
                          <div className="contest-info">
                            <small>Contested from: {issue.previousDepartment}</small>
                          </div>
                        )}
                      </td>
                      <td>{issue.delayTime || '0'} hrs</td>
                      <td className="actions-cell">
                        <button 
                          className="contest-btn"
                          title="Contest this issue"
                          onClick={() => handleContest(issue.jobNumber)}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </button>
                        <button 
                          className="delete-btn"
                          title="Delete this issue"
                          onClick={() => handleDelete(issue.jobNumber)}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
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