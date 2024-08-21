import React from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";

interface TableColumn {
  header: string;
  accessor: string;
}

interface TableComponentProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  borderColor: string;
  colorScheme: string;
  width: string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  borderColor,
  colorScheme,
  width,
}) => {
  return (
    <TableContainer>
      <Table
        variant="striped"
        colorScheme={colorScheme}
        size="md"
        borderRadius={6}
        borderColor={borderColor}
        borderWidth="2px"
      >
        <Thead bg={borderColor}>
          <Tr>
            {columns.map((column) => (
              <Th
                key={column.accessor}
                borderColor={borderColor}
                textColor="white"
                whiteSpace="normal"
              >
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              {columns.map((column) => (
                <Td
                  key={column.accessor}
                  borderColor={borderColor}
                  whiteSpace={
                    column.accessor === "description" ? "normal" : "nowrap"
                  } // Wrap text only in the Description column
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {row[column.accessor]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
