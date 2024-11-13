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
  const {
    isOpen: isResultOpen,
    onOpen: onResultOpen,
    onClose: onResultClose,
  } = useDisclosure();
  const [coverageResult, setCoverageResult] = useState("");

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
        setCoverageResult(response.data.coverage);
        onResultOpen();
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

      {/* Procedure Input Modal */}
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

      {/* Coverage Result Modal */}
      <Modal isOpen={isResultOpen} onClose={onResultClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coverage Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {coverageResult ? (
              <Box>
                <p><strong>User:</strong> {coverageResult.User}</p>
                <p><strong>Original Cost:</strong> {coverageResult["Original Cost"]}</p>
                <p><strong>Out-of-Network Coverage:</strong></p>
                <Box pl={4}>
                  {Object.entries(coverageResult.OutNetworkCoverage).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </Box>
                <p><strong>In-Network Coverage:</strong></p>
                <Box pl={4}>
                  {Object.entries(coverageResult.InNetworkCoverage).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </Box>
              </Box>
            ) : (
              <p>No coverage result available.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onResultClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>    
    </VStack>
  );
};

export default Covered;