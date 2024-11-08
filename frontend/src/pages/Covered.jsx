// Covered.jsx
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
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const Covered = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [procedure, setProcedure] = useState("");
  const [cost, setCost] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/loadUsers");
        const data = response.data.userList;
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = patients.filter(
      (patient) => patient.Name && patient.Name.toLowerCase() === query
    );
    setFilteredPatients(filtered);
  };

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    onOpen();
  };

  const handleLog = async () => {
    if (selectedPatient && procedure && cost) {
      try {
        const response = await axios.post("http://localhost:8000/calculateCoverage", {
          member_id: selectedPatient.MemberID,
          procedure: procedure,
          procedure_cost: parseFloat(cost),
        });
        console.log("Coverage Result:", response.data.coverage);
      } catch (error) {
        console.error("Error calculating coverage:", error);
      }
      onClose();
      setProcedure("");
      setCost("");
    }
  };

  return (
    <VStack spacing={8} p={4} align="center">
      <Heading as="h1" size="xl" textAlign="center">
        Covered Procedures
      </Heading>
      <Input
        placeholder="Enter name..."
        value={searchQuery}
        onChange={handleSearch}
        maxW="80%"
        mb={4}
      />
      {filteredPatients.length > 0 ? (
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
      ) : (
        <p>No patients found with that name.</p>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Procedure Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPatient && (
              <>
                <p>
                  <strong>Selected Patient:</strong> {selectedPatient.Name}
                </p>
                <Input
                  placeholder="Procedure"
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  mt={4}
                />
                <Input
                  placeholder="Cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  mt={4}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleLog}>
              Log Procedure
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Covered;