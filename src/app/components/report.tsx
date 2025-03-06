"use client";
import React, { useState } from "react";
import { Chart } from "primereact/chart";

const Report: React.FC = () => {
  const [reportType, setReportType] = useState<string>("monthly");

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Data",
        backgroundColor: "#42A5F5",
        borderColor: "#1E88E5",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Analytics Report</h2>
      <div className="mb-4">
        <button
          className={`p-button ${
            reportType === "monthly" ? "p-button-primary" : "p-button-secondary"
          }`}
          onClick={() => setReportType("monthly")}
        >
          Monthly
        </button>
        <button
          className={`p-button ml-2 ${
            reportType === "weekly" ? "p-button-primary" : "p-button-secondary"
          }`}
          onClick={() => setReportType("weekly")}
        >
          Weekly
        </button>
      </div>
      <div className="w-full h-full">
        <Chart type="bar" className="h-full" data={data} options={options} />
      </div>
    </div>
  );
};

export default Report;
