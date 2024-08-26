import React from "react";
import PieChart from "../components/PieChart";
import employees from "../data/employee";
import { aggregateDesignations } from "../chartsFunctions/DesignationRatioFunction";

const ProjectDashboardPage = () => {
  const designationData = aggregateDesignations(employees);

  return (
    <div>
      <h1>Employee Designation Ratio</h1>
      <PieChart data={designationData} />
    </div>
  );
};

export default ProjectDashboardPage;
