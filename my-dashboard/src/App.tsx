import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

interface ZohoRecord {
  [key: string]: any;
}

const App = () => {
  const [data, setData] = useState<ZohoRecord[]>([]);
  const [salesAgentFilter, setSalesAgentFilter] = useState("");
  const [financialStatus, setFinancialStatus] = useState("");
  const [installedDateFilter, setInstalledDateFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://analytics-tau-nine.vercel.app/fetch-zoho/")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = data
    .filter(
      (row) =>
        (salesAgentFilter ? row["Sales Agent"] === salesAgentFilter : true) &&
        (financialStatus
          ? row["Financial Status."] === financialStatus
          : true) &&
        (installedDateFilter
          ? row["Installed Date"] === installedDateFilter
          : true)
    )
    .sort((a, b) => {
      if (!a["Installed Date"] && b["Installed Date"]) return -1;
      if (a["Installed Date"] && !b["Installed Date"]) return 1;
      return 0;
    });

  const salesAgents = Array.from(
    new Set(data.map((row) => row["Sales Agent"]))
  ).filter(Boolean);
  const jobFinancialStatus = Array.from(
    new Set(data.map((row) => row["Financial Status."]))
  ).filter(Boolean);

  return (
    <Container maxWidth={false}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Refresh Data
          </Button>
          <Button variant="contained" color="primary">
            Export Data
          </Button>
        </Box>
        <Box display="flex" gap={2}>
          <Select
            value={salesAgentFilter}
            onChange={(e) => setSalesAgentFilter(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Sales Agents</MenuItem>
            {salesAgents.map((agent) => (
              <MenuItem key={agent} value={agent}>
                {agent}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={financialStatus}
            onChange={(e) => setFinancialStatus(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Financial Status</MenuItem>
            {jobFinancialStatus.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Installed Date"
            type="date"
            value={installedDateFilter}
            onChange={(e) => setInstalledDateFilter(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", maxHeight: "calc(100vh - 100px)" }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ height: "40px" }}>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      minWidth: "120px",
                      padding: "6px 16px",
                      background: "white",
                    }}
                  >
                    {key}
                  </TableCell>
                ))}
              <TableCell>Payment to Agent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  background: !row["Installed Date"] ? "#ffcccc" : "inherit",
                }}
              >
                {Object.values(row).map((value, i) => (
                  <TableCell
                    key={i}
                    sx={{ minWidth: "120px", background: "white" }}
                  >
                    {String(value)}
                  </TableCell>
                ))}
                <TableCell>
                  <Select defaultValue=" " size="small">
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Not Paid">Not Paid</MenuItem>
                    <MenuItem value="Carry Forward">Carry Forward</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default App;
