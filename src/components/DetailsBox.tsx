import React from "react";
import { Box, Heading, Input, HStack, Button, Text } from "@chakra-ui/react";

interface DetailsBoxProps {
  title: string;
  context: "teamMembers" | "projectDetails";
  showSearchBar?: boolean;
  searchTerm?: string;
  onSearchTermChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const DetailsBox: React.FC<DetailsBoxProps> = ({
  title,
  context,
  showSearchBar = false,
  searchTerm,
  onSearchTermChange,
  children,
}) => {
  return (
    <Box
      padding="20px"
      maxWidth="800px"
      margin="auto"
      bg="lavendar"
      borderWidth="1px"
      borderColor="blue.700"
      borderRadius="8px"
      mt={10}
      width="100%"
    >
      <Heading as="h2" size="lg" mb="10">
        {title} -{" "}
        {context === "teamMembers" ? "Team Members" : "Project Details"}
      </Heading>

      <Box
        width="100%"
        padding="20px"
        borderWidth="1px"
        borderRadius="8px"
        borderColor="blue.700"
      >
        {showSearchBar && (
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchTermChange}
            mb="4"
            width="80"
          />
        )}
        {children}
      </Box>
    </Box>
  );
};

export default DetailsBox;
