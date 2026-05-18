export type EmployeeDashboard = {
  totalGoalSheets: number;
  approved: number;
  submitted: number;
  rework: number;
  draft: number;
  quarterlyUpdates: number;
};

export type ManagerDashboard = {
  pendingApprovals: number;
  approvedGoals: number;
  employees: number;
  quarterlyUpdates: number;
};

export type AdminDashboard = {
  employees: number;
  managers: number;
  admins: number;
  goalSheets: number;
  auditLogs: number;
};