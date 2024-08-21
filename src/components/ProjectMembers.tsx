import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

export interface Employee {
  id: number;
  name: string;
  designation: string;
  contact: string;
}

export interface EmployeeDetailsProps {
  employees: Employee[];
}
const ProjectMembers = ({ employees }: EmployeeDetailsProps) => {
  return <div>HI</div>;
};

export default ProjectMembers;
