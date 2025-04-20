import React, { useState, useEffect } from "react";
import { Notifications, Message } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "../Dashboard/Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";

const Main = ({ title, apiUrl, showStatusFilter, tableHeaders }) => {
  const [positionFilter, setPositionFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const handlePromote = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/candidates/promote/${id}`, {
        method: "POST",
      });
      const result = await res.json();
      console.log("Promoted:", result);
      fetchData(); // Refresh after promotion
    } catch (err) {
      console.error("Error promoting candidate:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      fetchData(); // Refresh after deletion
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesPosition =
      positionFilter === "" || item.position?.toLowerCase() === positionFilter.toLowerCase();
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <AppBar position="static" color="transparent" elevation={0} className="navbar">
          <Toolbar className="navbar-toolbar">
            <div className="candidate-title">{title}</div>
            <div className="right-icons">
              <IconButton>
                <Message className="icon" />
              </IconButton>
              <IconButton>
                <Notifications className="icon" />
              </IconButton>
              <img
                src={`${process.env.PUBLIC_URL}/image.png`}
                alt="Profile"
                className="profile-pic"
              />
            </div>
          </Toolbar>
          <Toolbar className="navbar-toolbar">
            <div className="filters">
              <FormControl variant="outlined" size="small" className="dropdown">
                <InputLabel>Position</InputLabel>
                <Select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  label="Position"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="right-icons">
              <TextField
                fullWidth
                placeholder="Search by Name"
                variant="outlined"
                size="small"
                className="search-candidate"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#4B0082", "&:hover": { backgroundColor: "#3A0066" } }}
              >
                Add {title}
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                {tableHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={item._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  {tableHeaders.map((header) => (
                    <TableCell key={header}>
                      {header.toLowerCase() === "status" ? (
                        <span
                          style={{
                            color: item.status === "selected" ? "green" : "gray",
                            fontWeight: "bold",
                          }}
                        >
                          {item.status}
                        </span>
                      ) : (
                        item[header.toLowerCase()]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {title === "Candidates" && item.status === "selected" && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handlePromote(item._id)}
                        style={{ marginRight: "8px" }}
                      >
                        Promote
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Main;
