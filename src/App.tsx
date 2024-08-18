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
    >
      <GridItem area="nav" bg="gray.600" color="whiteAlpha.900">
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
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
