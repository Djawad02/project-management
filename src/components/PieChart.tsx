// PieChartComponent.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DetailsBox from "./DetailsBox";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { Center, Text } from "@chakra-ui/react";
import useProjectStore from "../store/useProjectStore";
ChartJS.register(ArcElement, Tooltip, Legend);

interface EmployeeData {
  [key: string]: number;
}

interface PieChartComponentProps {
  data: EmployeeData;
}

const PieChartComponent = ({ data }: PieChartComponentProps) => {
  console.log("Data passed to PieChartComponent: ", data);
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        hoverBackgroundColor: ["#005a9e", "#008f5e", "#c48f00", "#c46730"],
      },
    ],
  };

  const { title } = useParams();
  const { projectList } = useProjectStore();

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );
  if (!project) {
    return <Text>Project not found</Text>;
  }
  return (
    <Center width="100%" height="400px">
      {" "}
      <Pie data={chartData} />
    </Center>
  );
};

export default PieChartComponent;
