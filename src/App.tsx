import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ProjectGrid from "./components/ProjectGrid";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav" bg="blackAlpha.900" color="whiteAlpha.900">
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          bg="gray.900"
          color="whiteAlpha.900"
          paddingX={5}
        >
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProjectGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
