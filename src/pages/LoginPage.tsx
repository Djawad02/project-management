import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, Spinner } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { users } from "../data/userCredentials";
import DetailsBox from "../components/DetailsBox";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user);
      navigate("/"); // Redirect to projects page after login
      console.log(user);
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
    setError("");
  };

  return (
    <DetailsBox showSearchBar={false} title="Login">
      <Box w="300px" mx="auto">
        <Input
          aria-label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => handleInputChange(e, setUsername)}
          mb={2}
        />
        <Input
          type="password"
          aria-label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          mb={2}
        />
        {error && (
          <Text color="red.500" mb={2}>
            {error}
          </Text>
        )}
      </Box>
      <Button
        ml={330}
        colorScheme="blue"
        onClick={handleLogin}
        isDisabled={isLoading}
      >
        {isLoading ? <Spinner size="sm" /> : "Login"}
      </Button>
    </DetailsBox>
  );
};

export default LoginPage;
