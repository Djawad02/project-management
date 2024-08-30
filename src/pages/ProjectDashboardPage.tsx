import React, { useContext, useState } from "react";
import PieChart from "../components/PieChart";
import employees from "../data/employee";
import { aggregateDesignations } from "../chartsFunctions/DesignationRatioFunction";
import { Button } from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import ProjectSearchView from "../components/ProjectSearchView";
import { AuthContext } from "../context/AuthContext";

const ProjectDashboardPage = () => {
  const designationData = aggregateDesignations(employees);
  const [view, setView] = useState<"dashboard" | "projectSearch">("dashboard"); // State to manage the current view
  const { user } = useContext(AuthContext); // Get the current user from context
  const userRole = user?.role || ""; // Get user role
  // Function to handle button click
  const handleViewProjectResources = () => {
    setView("projectSearch"); // Update state to show project search view
  };
  return (
    <>
      {view === "dashboard" ? (
        <DetailsBox
          showSearchBar={false}
          title="Organization Employee Designation Ratio"
        >
          <PieChart data={designationData} />
          {(userRole == "Admin" || userRole == "TeamLead") && (
            <Button colorScheme="blue" onClick={handleViewProjectResources}>
              View Project Resources
            </Button>
          )}
        </DetailsBox>
      ) : (
        <ProjectSearchView setView={setView} /> // Render ProjectSearchView component when the state is "projectSearch"
      )}
    </>
  );
};

export default ProjectDashboardPage;
