import React from 'react';

function RootSourceAnalysis() {
  // Sample data for the chart and tables - this would come from your state or API in a real app
  const departmentData = [
    { name: 'Supply', value: 3.6, fullName: 'Supply Chain' },
    { name: 'Eng', value: 2.8, fullName: 'Engineering' },
    { name: 'Metal', value: 1.7, fullName: 'Metal Shop' },
    { name: 'Paint', value: 1.2, fullName: 'Paint' },
    { name: 'Final', value: 0.8, fullName: 'Final Assembly' }
  ];
  
  const engineeringIssues = [
    { date: '03/15', jobNumber: 'J-1023', description: 'Missing dimensions on drawing', delay: 1.5 },
    { date: '03/14', jobNumber: 'J-1020', description: 'Incorrect material spec provided', delay: 1.3 }
  ];
  
  const supplyChainIssues = [
    { date: '03/15', jobNumber: 'J-1024', description: 'Late material delivery', delay: 2.0 },
    { date: '03/13', jobNumber: 'J-1018', description: 'Incorrect parts ordered', delay: 1.6 }
  ];
  
  const handleContest = (jobNumber) => {
    console.log(`Contest requested for job ${jobNumber}`);
  };
  
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
        
        {/* Chart visualization */}
        <div className="chart-container">
          <div className="x-axis"></div>
          
          {departmentData.map((dept, index) => (
            <div 
              key={index}
              className="chart-bar" 
              style={{ height: `${(dept.value / Math.max(...departmentData.map(d => d.value))) * 80}%` }}
            >
              <div className="bar-value">{dept.value}</div>
              <div className="bar-label">{dept.name}</div>
            </div>
          ))}
        </div>
        
        {/* Engineering Section */}
        <div className="department-section">
          <div className="department-header">
            <div className="department-name">Engineering</div>
            <div className="delay-time">Total: 2.8 hrs</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Job #</th>
                <th>Description</th>
                <th>Delay</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {engineeringIssues.map((issue, index) => (
                <tr key={index}>
                  <td>{issue.date}</td>
                  <td>{issue.jobNumber}</td>
                  <td>{issue.description}</td>
                  <td>{issue.delay} hrs</td>
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
        
        {/* Supply Chain Section */}
        <div className="department-section">
          <div className="department-header">
            <div className="department-name">Supply Chain</div>
            <div className="delay-time">Total: 3.6 hrs</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Job #</th>
                <th>Description</th>
                <th>Delay</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {supplyChainIssues.map((issue, index) => (
                <tr key={index}>
                  <td>{issue.date}</td>
                  <td>{issue.jobNumber}</td>
                  <td>{issue.description}</td>
                  <td>{issue.delay} hrs</td>
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
      </div>
    </section>
  );
}

export default RootSourceAnalysis; 