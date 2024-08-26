import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deadlines } from "../data/deadline"; // Ensure correct path
import projects from "../data/projects"; // Ensure correct path
import { sprints } from "../data/sprint"; // Ensure correct path
import { Deadline } from "../interfaces/Deadline";
import { Sprint } from "../interfaces/Sprint";
import { Text } from "@chakra-ui/react";

const SprintDetailsPage: React.FC = () => {
  const { title } = useParams<{ title: string }>(); // Extracting title from URL
  const [projectSprints, setProjectSprints] = useState<Sprint[]>([]);
  const [projectDeadlines, setProjectDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    if (title) {
      // Decode the title from the URL
      const decodedTitle = decodeURIComponent(title);

      // Find the project based on the title from the URL
      const matchedProject = projects.find(
        (project) => project.title === decodedTitle
      );

      if (matchedProject) {
        // Filter sprints and deadlines for the current project
        const filteredSprints = sprints.filter(
          (sprint) => sprint.projectId === matchedProject.id
        );
        const filteredDeadlines = deadlines.filter(
          (deadline) => deadline.projectId === matchedProject.id
        );

        setProjectSprints(filteredSprints);
        setProjectDeadlines(filteredDeadlines);
      }
    }
  }, [title]); // Use 'title' in the dependency array

  if (!title) {
    return <Text>No project found</Text>;
  }

  return (
    <div>
      <h1>Sprint Details for Project: {decodeURIComponent(title)}</h1>

      <section>
        <h2>Sprints</h2>
        {projectSprints.length > 0 ? (
          <ul>
            {projectSprints.map((sprint) => (
              <li key={sprint.id}>
                <h3>{sprint.sprintTitle}</h3>
                <p>
                  Start Date: {new Date(sprint.startDate).toLocaleDateString()}
                </p>
                <p>End Date: {new Date(sprint.endDate).toLocaleDateString()}</p>
                <p>Description: {sprint.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sprints available for this project.</p>
        )}
      </section>
    </div>
  );
};

export default SprintDetailsPage;
