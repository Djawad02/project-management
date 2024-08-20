import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

export interface Member {
  name: string;
  role: string;
}

interface ProjectMembersProps {
  members: Member[];
}

const ProjectMembers = ({ members }: ProjectMembersProps) => {
  return (
    <VStack align="start" spacing={3}>
      {members.map((member, index) => (
        <Box key={index}>
          <Text fontWeight="bold">{member.name}</Text>
          <Text fontSize="sm">{member.role}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ProjectMembers;
