// ** React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { Avatar, CardHeader, Pagination, CircularProgress } from "@mui/material";
import { API_BASE_URL } from "../../../config/api";

const Customers = () => {
  const navigate = useNavigate();

  // State
  const [customers, setCustomers] = useState([]);
  console.log(customers , 'checking ustomers in admin');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch customers
const fetchCustomers = async (pageNum = 1) => {
  setLoading(true);
  try {
    // If backend supports pagination
    const res = await fetch(`${API_BASE_URL}/api/users?page=${pageNum}&limit=10`);
    if (!res.ok) throw new Error("Failed to fetch customers");

    const data = await res.json();
    console.log("Fetched customers:", data);

    setCustomers(data.users || data || []); // Adjust depending on actual response
    setTotalPages(data.totalPages || 1);
  } catch (error) {
    console.error("Error fetching customers:", error);
  } finally {
    setLoading(false);
  }
};

  // Handle pagination change
  const handlePaginationChange = (event, value) => {
    setPage(value);
    fetchCustomers(value);
  };

  // Initial fetch
useEffect(() => {
  fetchCustomers(page);
}, [page]);

  return (
    <Box>
      <Card>
        <CardHeader
          title="All Customers"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.length > 0 ? (
                  customers.map((item, index) => (
                    <TableRow
                      hover
                      key={item.id || item.name}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                      onClick={() => navigate(`/customers/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                      <TableCell>
                        <Avatar alt={item.name} src={item.image} />
                      </TableCell>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography align="center" color="textSecondary">
                        No customers found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Card>

      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={totalPages}
          color="primary"
          page={page}
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default Customers;
