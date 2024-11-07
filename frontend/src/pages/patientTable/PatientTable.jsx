import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/loadUsers");
        console.log(response);
        const data = response.data.userList;
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = patients.filter((patient) =>
      Object.values(patient).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredPatients(filtered);
  };

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    onOpen();
  };

  return (
    <VStack spacing={8} p={4} align="center">
      <Heading as="h1" size="xl" textAlign="center">
        Patient Table
      </Heading>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        maxW="80%"
        mb={4}
        zIndex={-1}
      />
      <Box
        maxW="80%"
        overflowY="auto"
        maxHeight="500px"
        border="1px solid #e2e8f0"
        borderRadius="md"
        boxShadow="md"
        p={4}
      >
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Company Name</Th>
              <Th>Member ID</Th>
              <Th>Group Number</Th>
              <Th>Name</Th>
              <Th>Policy Number</Th>
              <Th>User ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPatients.map((patient, index) => (
              <Tr
                key={index}
                onClick={() => handleRowClick(patient)}
                style={{ cursor: "pointer" }}
              >
                <Td>{patient.CompanyName}</Td>
                <Td>{patient.MemberID}</Td>
                <Td>{patient.GroupNum}</Td>
                <Td>{patient.Name}</Td>
                <Td>{patient.PolicyNum}</Td>
                <Td>{patient.UserID}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPatient && (
              <>
                <p>
                  <strong>Company Name:</strong> {selectedPatient.CompanyName}
                </p>
                <p>
                  <strong>Member ID:</strong> {selectedPatient.MemberID}
                </p>
                <p>
                  <strong>Group Number:</strong> {selectedPatient.GroupNum}
                </p>
                <p>
                  <strong>Name:</strong> {selectedPatient.name}
                </p>
                <p>
                  <strong>Policy Number:</strong> {selectedPatient.PolicyNum}
                </p>
                <p>
                  <strong>User ID:</strong> {selectedPatient.UserID}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PatientTable;
