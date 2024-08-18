import { list, List, ListItem } from "@chakra-ui/react";
import React from "react";

const Sidebar = () => {
  const items = [
    "View Projects",
    "User Management",
    "Sprint Details",
    "Project Dashboard",
  ];
  return (
    <List>
      {items.map((item) => (
        <ListItem paddingY="5px" fontSize="lg" key={item}>
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
