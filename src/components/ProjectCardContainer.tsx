import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const ProjectCardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      overflow="hidden"
      padding="20px"
      bg="blue.900" // Dark background color
      color="whiteAlpha.900" // White text color
      boxShadow="lg" // Adds a shadow for depth
      _hover={{
        bg: "blue.700",
        transform: "scale(1.06)",
        transition: "transform .15s ease-in",
      }} // Slightly lighter on hover
    >
      {children}
    </Box>
  );
};

export default ProjectCardContainer;
