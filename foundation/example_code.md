# this is the example code for how the frontend should look like

<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>PRISM.beta Wireframe</title> <style> :root { --bg-primary: #121212; --bg-secondary: #1e1e1e; --bg-tertiary: #2d2d2d; --text-primary: #e0e0e0; --text-secondary: #a0a0a0; --accent: #7b68ee; --accent-light: rgba(123, 104, 238, 0.2); --success: #4caf50; --danger: #f44336; --warning: #ff9800; }
   body {
        font-family: 'Segoe UI', 'Roboto', sans-serif;
        background-color: var(--bg-primary);
        color: var(--text-primary);
        margin: 0;
        padding: 0;
        line-height: 1.6;
    }


    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }


    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid var(--bg-tertiary);
        margin-bottom: 25px;
    }


    .logo {
        display: flex;
        align-items: center;
    }


    .logo-container {
        display: flex;
        flex-direction: column;
    }


    .logo h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: 1px;
        display: flex;
        align-items: center;
    }


    .logo span {
        color: var(--accent);
    }


    .logo-tagline {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 4px;
        letter-spacing: 0.5px;
    }


    .prism-icons {
        margin-right: 16px;
        position: relative;
        width: 50px;
        height: 40px;
    }


    .prism-icon {
        position: absolute;
        width: 28px;
        height: 28px;
    }


    .prism-icon::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }


    .prism-icon:nth-child(1) {
        top: 0;
        left: 20px;
        z-index: 3;
    }


    .prism-icon:nth-child(1)::before {
        background: linear-gradient(45deg, var(--accent), #9370DB, #8a2be2);
    }


    .prism-icon:nth-child(2) {
        top: 15px;
        left: 0;
        z-index: 1;
        transform: scale(0.85);
    }


    .prism-icon:nth-child(2)::before {
        background: linear-gradient(45deg, #6a5acd, #4b0082, #483d8b);
    }


    .prism-icon:nth-child(3) {
        top: 12px;
        left: 35px;
        z-index: 2;
        transform: scale(0.75);
    }


    .prism-icon:nth-child(3)::before {
        background: linear-gradient(45deg, #9370DB, #8a2be2, #9932cc);
    }


    .user-controls {
        display: flex;
        align-items: center;
        gap: 15px;
    }


    button {
        background-color: var(--bg-tertiary);
        color: var(--text-primary);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 500;
    }


    button:hover {
        background-color: var(--bg-secondary);
    }


    button.primary {
        background-color: var(--accent);
    }


    button.primary:hover {
        background-color: #6a5acd;
    }


    button.danger {
        background-color: var(--danger);
    }


    .main-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }


    @media (min-width: 992px) {
        .main-content {
            grid-template-columns: 1fr 1fr;
        }
    }


    .card {
        background-color: var(--bg-secondary);
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }


    .card-title {
        font-size: 18px;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 8px;
    }


    .card-title .icon {
        color: var(--accent);
    }


    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }


    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }


    label {
        font-size: 14px;
        color: var(--text-secondary);
    }


    input, select, textarea {
        background-color: var(--bg-tertiary);
        border: 1px solid #3a3a3a;
        border-radius: 4px;
        padding: 10px;
        color: var(--text-primary);
        font-size: 14px;
    }


    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: var(--accent);
    }


    .required::after {
        content: "*";
        color: var(--danger);
        margin-left: 3px;
    }


    .checkbox-group {
        display: flex;
        align-items: center;
        gap: 10px;
        align-self: flex-start;
    }


    .checkbox-group input[type="checkbox"] {
        width: 16px;
        height: 16px;
        accent-color: var(--accent);
    }


    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
        font-size: 14px;
    }


    th {
        background-color: var(--bg-tertiary);
        text-align: left;
        padding: 10px;
        color: var(--text-secondary);
        font-weight: 500;
    }


    td {
        padding: 10px;
        border-bottom: 1px solid var(--bg-tertiary);
    }


    tr:hover {
        background-color: var(--bg-tertiary);
    }


    .department-section {
        margin-bottom: 20px;
    }


    .department-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--accent-light);
        padding: 10px 15px;
        border-radius: 4px;
        margin-bottom: 10px;
    }


    .department-name {
        font-weight: 600;
        color: var(--accent);
    }


    .delay-time {
        background-color: var(--bg-tertiary);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
    }


    .contest-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: transparent;
        color: var(--warning);
        padding: 5px;
        font-size: 12px;
    }


    .chart-container {
        height: 250px;
        position: relative;
        margin-bottom: 30px;
        display: flex;
        align-items: flex-end;
        gap: 15px;
        padding-bottom: 20px;
    }


    .chart-bar {
        flex-grow: 1;
        background-color: var(--accent-light);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        border-radius: 4px 4px 0 0;
    }


    .bar-label {
        position: absolute;
        bottom: -25px;
        font-size: 12px;
        color: var(--text-secondary);
        text-align: center;
        width: 100%;
    }


    .bar-value {
        padding: 5px 0;
        font-size: 12px;
        font-weight: 600;
    }


    .x-axis {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: var(--bg-tertiary);
    }


    .tooltip {
        position: absolute;
        right: 20px;
        top: 100px;
        max-width: 250px;
        background-color: var(--bg-tertiary);
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-left: 3px solid var(--accent);
    }


    .tooltip-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 16px;
        padding: 0;
    }


    .tooltip h4 {
        margin-top: 0;
        margin-bottom: 8px;
        color: var(--accent);
    }


    .tooltip p {
        margin: 0;
        font-size: 14px;
    }


    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-top: 1px solid var(--bg-tertiary);
        margin-top: 30px;
        font-size: 12px;
        color: var(--text-secondary);
    }


    .barcode {
        font-family: monospace;
        letter-spacing: 2px;
    }


    /* Responsive adjustments */
    @media (max-width: 768px) {
        .main-content {
            grid-template-columns: 1fr;
        }


        .chart-container {
            height: 200px;
        }


        header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }


        .user-controls {
            width: 100%;
            justify-content: space-between;
        }
    }
</style>




</head> <body> <div class="container"> <header> <div class="logo"> <div class="prism-icons"> <div class="prism-icon"></div> <div class="prism-icon"></div> <div class="prism-icon"></div> </div> <div class="logo-container"> <h1>PRISM<span>.beta</span></h1> <div class="logo-tagline">Production Root Issue Sorting Mechanism</div> </div> </div> <div class="user-controls"> <button class="primary">Export Data</button> <button class="danger">Clear Data</button> </div> </header>
   <div class="main-content">
        <section>
            <div class="card">
                <h2 class="card-title">
                    <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Issue Submission
                </h2>
                <form>
                    <div class="form-row" style="display: flex; gap: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label class="required" for="job-number">Job Number</label>
                            <input type="text" id="job-number" placeholder="Enter job number">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="part-number">Part Number</label>
                            <input type="text" id="part-number" placeholder="Enter part number">
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" id="date" value="2025-03-15" disabled>
                    </div>


                    <div class="form-group">
                        <label class="required" for="department">Department Discovered</label>
                        <select id="department">
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


                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="qc-checkpoint">
                        <label for="qc-checkpoint">QC Checkpoint</label>
                    </div>


                    <div class="form-group">
                        <label class="required" for="description">Description</label>
                        <textarea id="description" rows="4" placeholder="Describe the issue..."></textarea>
                    </div>


                    <div class="form-group">
                        <label for="delay-time">Total Delay Time (hours)</label>
                        <input type="number" id="delay-time" step="0.1" placeholder="e.g., 0.5">
                    </div>


                    <button type="submit" class="primary" style="align-self: flex-start;">Submit Issue</button>
                </form>
            </div>
        </section>


        <section>
            <div class="card">
                <h2 class="card-title">
                    <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                    </svg>
                    Root Source Analysis
                </h2>


                <!-- Chart visualization - MOVED ABOVE THE LIST -->
                <div class="chart-container">
                    <div class="x-axis"></div>


                    <div class="chart-bar" style="height: 70%;">
                        <div class="bar-value">3.6</div>
                        <div class="bar-label">Supply</div>
                    </div>


                    <div class="chart-bar" style="height: 60%;">
                        <div class="bar-value">2.8</div>
                        <div class="bar-label">Eng</div>
                    </div>


                    <div class="chart-bar" style="height: 40%;">
                        <div class="bar-value">1.7</div>
                        <div class="bar-label">Metal</div>
                    </div>


                    <div class="chart-bar" style="height: 30%;">
                        <div class="bar-value">1.2</div>
                        <div class="bar-label">Paint</div>
                    </div>


                    <div class="chart-bar" style="height: 20%;">
                        <div class="bar-value">0.8</div>
                        <div class="bar-label">Final</div>
                    </div>
                </div>


                <div class="department-section">
                    <div class="department-header">
                        <div class="department-name">Engineering</div>
                        <div class="delay-time">Total: 2.8 hrs</div>
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
                            <tr>
                                <td>03/15</td>
                                <td>J-1023</td>
                                <td>Missing dimensions on drawing</td>
                                <td>1.5 hrs</td>
                                <td>
                                    <button class="contest-btn">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        Contest
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>03/14</td>
                                <td>J-1020</td>
                                <td>Incorrect material spec provided</td>
                                <td>1.3 hrs</td>
                                <td>
                                    <button class="contest-btn">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        Contest
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div class="department-section">
                    <div class="department-header">
                        <div class="department-name">Supply Chain</div>
                        <div class="delay-time">Total: 3.6 hrs</div>
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
                            <tr>
                                <td>03/15</td>
                                <td>J-1024</td>
                                <td>Late material delivery</td>
                                <td>2.0 hrs</td>
                                <td>
                                    <button class="contest-btn">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        Contest
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>03/13</td>
                                <td>J-1018</td>
                                <td>Incorrect parts ordered</td>
                                <td>1.6 hrs</td>
                                <td>
                                    <button class="contest-btn">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        Contest
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>


    <!-- Tooltip / User guidance -->
    <div class="tooltip">
        <button class="tooltip-close">×</button>
        <h4>Welcome to PRISM.beta</h4>
        <p>This app helps identify and track production issues by department. Submit issues using the form, and our AI will automatically determine the root cause department. You can contest this classification if needed.</p>
    </div>


    <footer>
        <div class="barcode">|||||||||||</div>
        <div>Built by BreezBlox</div>
        <div class="barcode">|||||||||||</div>
    </footer>
</div>




</body> </html>