import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Calender from "../CRUD/calender/calender";
import dayjs from "dayjs";

const Create = () => {
  const [expenseName, setExpenseName] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpensePriceChange = (e) => {
    setExpensePrice(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date).format("MMM-DD-YYYY")); // Format the date
  };

  const handleAddExpense = () => {
    if (expenseName.trim() && expensePrice.trim() && selectedDate) {
      const newExpense = {
        name: expenseName,
        price: parseFloat(expensePrice),
        date: selectedDate,
      };
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      setExpenseName("");
      setExpensePrice("");
      setSelectedDate("");
    }
  };

  return (
    <Container border="1px solid black" height="90vh" width="50%">
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">Create</Typography>
      </Box>
      <Box>
        <TextField
          label="Expense Name"
          value={expenseName}
          onChange={handleExpenseNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Expense Price"
          value={expensePrice}
          onChange={handleExpensePriceChange}
          type="number"
          fullWidth
          margin="normal"
        />

        <Calender onDateChange={handleDateChange} />
      </Box>
      <Button onClick={handleAddExpense} variant="contained" color="primary">
        Add Expense
      </Button>
    </Container>
  );
};

export default Create;
