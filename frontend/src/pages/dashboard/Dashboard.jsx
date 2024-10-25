import React from "react";
import CustomHeader from "./components/CustomHeader";
import NewClients from "./components/NewClients";
import StatusSection from "./components/StatusSection";
import "rsuite/dist/rsuite.min.css";

export default function Dashboard() {
  const userName = "John Doe"; // Replace this with dynamic user data if available
  const logoSrc = "/path/to/healthcare-logo.png"; // Replace with the actual path to your logo
  const verifiedCount = 24; // Example count for verified items
  const needAttentionCount = 5; // Example count for items needing attention
  const newClients = ["Alice Smith", "Bob Johnson", "Catherine Lee"]; // Example list of new clients

  return (
    <div className="dashboard" style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CustomHeader userName={userName} logoSrc={logoSrc} />

        <div style={styles.content}>
          <div style={styles.infoSection}>
            <NewClients clients={newClients} />
            <StatusSection
              verifiedCount={verifiedCount}
              needAttentionCount={needAttentionCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Basic inline styles for simplicity
const styles = {
  content: {
    padding: "20px",
    backgroundColor: "#f4f6f8",
    flex: 1,
  },
  infoSection: {
    display: "flex",
    gap: "20px",
  },
};
