import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  path: string;
  label: string;
}

const SidebarItem = ({ path, label }: SidebarItemProps) => {
  return (
    <Link to={path}>
      <HStack
        padding="5px"
        marginTop={2}
        borderRadius="md"
        _hover={{ bg: "blue.900" }}
        // alignItems="center"
      >
        <Text fontSize="md">{label}</Text>
      </HStack>
    </Link>
  );
};

export default SidebarItem;
