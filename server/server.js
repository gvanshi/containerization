const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const path = require("path");

const app = express();
app.use(cors());

// Endpoint to fetch Excel data
app.get("/api/excel-data", (req, res) => {
    try {
        // Path to your Excel file
        const filePath = path.join(__dirname, "data.xlsx");

        // Read the Excel file
        const workbook = xlsx.readFile(filePath);

        // Assuming the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert Excel sheet to JSON
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Send the JSON data as a response
        res.json(jsonData);
    } catch (error) {
        console.error("Error reading Excel file:", error);
        res.status(500).send("Error processing Excel file");
    }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
