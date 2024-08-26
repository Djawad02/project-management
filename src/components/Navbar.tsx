import React, { useContext } from "react";
import { HStack, Text, Image, Button } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Current user:", user); // Debugging log

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate("/login");
    }
  };
  return (
    <HStack
      justifyContent="space-between"
      padding="10px"
      bg="blue.900"
      color="whiteAlpha.900"
    >
      <Image src={logo} boxSize="60px" objectFit="cover" />
      <Text>Project Management System</Text>
      <HStack spacing={4}>
        {user ? (
          <>
            <Text fontSize="lg">Welcome, {user.username}</Text>
            <Button colorScheme="blue" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <Text>No user logged in</Text> // Temporary text to debug
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
