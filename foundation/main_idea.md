# this is the main idea for the app 

App: PRISM.beta (Production Root Issue Sorting Mechanism)
Purpose: PRISM is a simple tool that helps teams track production issues and figure out which department is responsible. It lets you submit problems with details like what went wrong, where it was found, and how much time it delayed things. The app then uses AI to sort the issues into the correct department and shows everything in organized tables and graphs. You can contest the AI’s decision if you think it’s wrong, export the data to a spreadsheet, or clear everything to start fresh. It’s lightweight, has some helpful guidance for first-time users, and is designed to run cost-efficiently on AWS. Basically, it’s a smart, no-fuss way to manage and resolve production problems!
________________


Features:
1. Issue Submission Form:

   * Fields:
   * Job Number and/or Part Number (required).
   * Date: Auto-set to today’s date.
   * Department Discovered: Dropdown with options:
   * Supply Chain, Engineering, Metal Shop, Pre-Assembly, Bodywork, Paint, Sign-Shop, Final Assembly.
   * Checkbox for "QC Checkpoint" (if applicable).
   * Description: Free-text description of the issue (required).
   * Total Delay Time: Decimal format (e.g., 0.1 hours). Not required for QC Checkpoints.
   * Submissions are processed and stored in a session-based system (no user login/authentication).
   2. Department Origin Section:

      * Submissions are automatically grouped by Department Origin.
      * An LLM (Large Language Model) analyzes the issue description to determine the responsible department (may differ from the department where the issue was discovered). The system improves over time through self-learning (e.g., using contested logs for training).
      * Table Format (within each department group):
      * Columns: Date, Job Number, Part Number, Description, Delay Time.
      * Header includes the Total Delay Time for all issues in that department.
      * Contest Button:
      * Allows users to challenge the assigned "Department Origin."
      * Requires a description for the contest.
      * Updates the department grouping and logs contest data.
      * A Bar Graph below the table visualizes issue statistics, grouped by department.
      3. Export and Data Management:

         * Export Button: Exports the "Department Origin" section as a CSV file.
         * Clear Data Button: Clears all session-based data.
         4. Self-Learning Mechanism:

            * Utilizes LLM to identify the root department based on descriptions - using a MISTRAL_API_KEY that I will provide
            5. User Guidance:

               * A brief description of the app’s purpose and functionality appears the first time it is used.
               * Displayed as a speech bubble on the right-hand side, with an "X" to close.
               6. Footer:

                  * Displays "Built by BreezBlox" with barcodes on both sides.
                  7. Deployment:

                     * AWS Free Tier (S3 + Lambda + API Gateway)
                     * Frontend: Amazon S3 Static Website Hosting
                     * Backend: AWS Lambda + API Gateway