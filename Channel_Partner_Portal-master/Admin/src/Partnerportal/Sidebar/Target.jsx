import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Target() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [targets, setTargets] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchTargets(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const fetchTargets = async (year) => {
    try {
      const response = await axios.get(`/api/targets/${year}`);
      setTargets(response.data || []);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  const generateQuarterlyData = () => {
    const quarters = [];

    for (let quarter = 1; quarter <= 4; quarter++) {
      const quarterStartMonth = (quarter - 1) * 3 + 1;
      const quarterEndMonth = quarter * 3;
      const months = [];
      for (let month = quarterStartMonth; month <= quarterEndMonth; month++) {
        const monthStartDate = new Date(selectedYear, month - 1, 1);
        const monthEndDate = new Date(selectedYear, month, 0);
        const targetData = Array.isArray(targets)
          ? targets.find(
              (target) => target.month === month && target.year === selectedYear
            )
          : null;
        months.push({
          month: monthStartDate.toLocaleDateString("en-US", { month: "long" }),
          from: monthStartDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          to: monthEndDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          target: targetData ? targetData.target_amount : "", // Display target amount if available
          sales: "", // Add your logic to retrieve sales data for each month
          targetAchieved: "", // Add your logic to calculate % target achieved for each month
        });
      }
      quarters.push({
        quarter: "Q" + quarter,
        months: months,
      });
    }

    return quarters;
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "auto",
    backgroundColor: "#f5f5f5",
  };

  const thStyle = {
    backgroundColor: "#191b30",
    color: "white",
    textAlign: "left",
    padding: "10px",
    border: "1px solid #dddddd",
  };

  const tdStyle = {
    textAlign: "left",
    padding: "10px",
    border: "1px solid #dddddd",
  };

  return (
    <div className="main-container">
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>Targets</h3>
            </th>
            <th style={thStyle}>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                style={{
                  padding: "8px 12px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {Array.from({ length: currentYear - 2010 }, (_, index) => (
                  <option
                    key={index}
                    value={currentYear - index}
                    style={{
                      backgroundColor: "#fff",
                    }}
                  >
                    {currentYear - index}
                  </option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
      </table>
      {/* <h1 style={{ color: '#191b30' }}>Sales</h1> */}
      {/* <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({ length: currentYear - 2010 }, (_, index) => (
          <option key={index} value={currentYear - index}>
            {currentYear - index}
          </option>
        ))}
      </select> */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Quarter</th>
            <th style={thStyle}>Month</th>
            <th style={thStyle}>From</th>
            <th style={thStyle}>To</th>
            <th style={thStyle}>Target</th>
            <th style={thStyle}>Sales</th>
            <th style={thStyle}>% Target Achieved</th>
          </tr>
        </thead>
        <tbody>
          {generateQuarterlyData().map((quarterData, quarterIndex) =>
            quarterData.months.map((monthData, monthIndex) => (
              <tr key={`${quarterIndex}-${monthIndex}`}>
                <td style={tdStyle}>{selectedYear}</td>
                <td style={tdStyle}>{quarterData.quarter}</td>
                <td style={tdStyle}>{monthData.month}</td>
                <td style={tdStyle}>{monthData.from}</td>
                <td style={tdStyle}>{monthData.to}</td>
                <td style={tdStyle}>
                  10000
                  {/* {monthData.target_amount} */}
                </td>
                <td style={tdStyle}>
                  4000
                  {/* {monthData.sales} */}
                </td>
                <td style={tdStyle}>
                  {" "}
                  40%
                  {/* {monthData.targetAchieved} */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Target;
