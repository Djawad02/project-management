import { list, List, ListItem } from "@chakra-ui/react";
import React from "react";
import sidebarItems from "../data/sidebar";

const Sidebar = () => {
  return (
    <List>
      {sidebarItems.map((item) => (
        <ListItem paddingY="5px" fontSize="lg" key={item}>
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
