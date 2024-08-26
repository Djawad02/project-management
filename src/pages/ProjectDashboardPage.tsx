import React, { useState } from "react";
import PieChart from "../components/PieChart";
import employees from "../data/employee";
import { aggregateDesignations } from "../chartsFunctions/DesignationRatioFunction";
import { Button } from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import ProjectSearchView from "../components/ProjectSearchView";

const ProjectDashboardPage = () => {
  const designationData = aggregateDesignations(employees);
  const [view, setView] = useState<"dashboard" | "projectSearch">("dashboard"); // State to manage the current view

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
          {/* <h1>Employee Designation Ratio</h1> */}
          <PieChart data={designationData} />
          <Button colorScheme="blue" onClick={handleViewProjectResources}>
            View Project Resources
          </Button>
        </DetailsBox>
      ) : (
        <ProjectSearchView setView={setView} /> // Render ProjectSearchView component when the state is "projectSearch"
      )}
    </>
  );
};

export default ProjectDashboardPage;
