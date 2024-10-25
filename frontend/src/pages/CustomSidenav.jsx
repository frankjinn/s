import React, { useState } from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import "rsuite/dist/rsuite.min.css";
import { NavLink, Link } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import PatientTable from "./patientTable/PatientTable";
import Todos from "./Todos";

export default function CustomSidenav() {
  const [activeKey, setActiveKey] = useState("1");
  const [openKeys, setOpenKeys] = useState([]);
  const [expanded, setExpanded] = useState(true);

  const handleToggle = (expanded) => {
    setExpanded(expanded);
  };

  const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  ));

  return (
    <div style={{ width: expanded ? 240 : 56 }}>
      <Sidenav
        appearance="default"
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      >
        <Sidenav.Toggle onToggle={handleToggle} />

        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              eventKey="1"
              as={NavLink}
              children={<Dashboard />}
              href="/"
              icon={<DashboardIcon />}
            >
              Dashboard
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              as={NavLink}
              children={<PatientTable />}
              href="/patients"
            >
              Schedule
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              as={NavLink}
              children={<Todos />}
              href="/todos"
            >
              Todos
            </Nav.Item>
            {/* <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}
