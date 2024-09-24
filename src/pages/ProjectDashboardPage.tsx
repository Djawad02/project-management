// ProjectDashboardPage.tsx
import React, { useContext, useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import { aggregateDesignations } from "../chartsFunctions/DesignationRatioFunction";
import { Button, Spinner, Box } from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import ProjectSearchView from "../components/ProjectSearchView";
import { AuthContext } from "../context/AuthContext";
import useProjectStore from "../store/useProjectStore";

const ProjectDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role;
  const [view, setView] = useState<"dashboard" | "projectSearch">("dashboard");
  const { projectList, employeeList } = useProjectStore();

  const designationData = aggregateDesignations(employeeList);

  const handleViewProjectResources = () => {
    setView("projectSearch");
  };

  return (
    <>
      {view === "dashboard" ? (
        <DetailsBox
          showSearchBar={false}
          title="Organization Employee Designation Ratio"
        >
          <PieChart data={designationData} />
          {(userRole === "Admin" || userRole === "TeamLead") && (
            <Button colorScheme="blue" onClick={handleViewProjectResources}>
              View Project Resources
            </Button>
          )}
        </DetailsBox>
      ) : (
        <ProjectSearchView setView={setView} employeeList={employeeList} />
      )}
    </>
  );
};

export default ProjectDashboardPage;
