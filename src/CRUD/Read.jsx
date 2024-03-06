import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Delete, Edit as EditIcon } from "@mui/icons-material";

const Read = () => {
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.price,
    0
  );

  const handleEditExpense = (index) => {
    setEditIndex(index);
    setEditName(expenses[index].name);
    setEditPrice(expenses[index].price);
    setEditDate(expenses[index].date);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && editName.trim() && String(editPrice).trim()) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = {
        name: editName,
        price: parseFloat(editPrice),
        date: editDate,
      };
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
      setEditIndex(null);
      setEditName("");
      setEditPrice("");
    }
  };

  return (
    <Container height="90vh" width="100%">
      <Box display="flex" justifyContent="center" marginBottom="2px">
        <Typography variant="h4">Expense List</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableRow>
            <TableHead>
              <TableRow>
                <TableCell>Expense Name</TableCell>
                <TableCell> Expense Price</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          </TableRow>
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Table>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index}>
                    {console.log(expense.date)}
                    <TableCell textAlign="right">
                      {editIndex === index ? (
                        <TextField
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        expense.name + "      "
                      )}
                    </TableCell>
                    <TableCell textAlign="right">
                      {editIndex === index ? (
                        <TextField
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                        />
                      ) : (
                        expense.price
                      )}
                    </TableCell>
                    <TableCell textAlign="right">
                      {editIndex === index ? (
                        <TextField
                          type="string"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                        />
                      ) : (
                        expense.date
                      )}
                      {/* Display the date */}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <Button onClick={handleSaveEdit}>Save</Button>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => handleDeleteExpense(index)}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton onClick={() => handleEditExpense(index)}>
                            <EditIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Table>
      </TableContainer>
      <Box display="flex" gap="80px">
        <Typography variant="h5">Total</Typography>
        <Typography variant="h5">
          ₹
          {totalExpenses.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </Container>
  );
};

export default Read;
