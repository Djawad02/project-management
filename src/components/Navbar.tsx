import React from "react";
import { HStack, Text, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" objectFit="cover" />
      <Text>Project Management System</Text>
    </HStack>
  );
};

export default Navbar;
