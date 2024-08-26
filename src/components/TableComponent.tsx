import React, { useState } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Button,
  HStack,
  Box,
  Select,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / entriesPerPage);

  const currentData = data.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <Box width={width}>
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
            {currentData.map((row, index) => (
              <Tr key={index}>
                {columns.map((column) => (
                  <Td
                    key={column.accessor}
                    borderColor={borderColor}
                    whiteSpace={
                      column.accessor === "projects" ||
                      column.accessor === "description"
                        ? "normal"
                        : "nowrap"
                    }
                    overflow="hidden"
                    textOverflow="ellipsis"
                    wordBreak={
                      column.accessor === "projects" ||
                      column.accessor === "description"
                        ? "break-word"
                        : "normal"
                    }
                  >
                    {row[column.accessor]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack mt={4} justify="space-between" alignItems="center">
        <Select
          width="fit-content"
          value={entriesPerPage}
          onChange={handleEntriesChange}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={15}>15 items per page</option>
          <option value={20}>20 items per page</option>
          <option value={data.length}>All items per page</option>
        </Select>

        <HStack spacing={4}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                variant={page === currentPage ? "solid" : "outline"}
              >
                {page}
              </Button>
            )
          )}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default TableComponent;
