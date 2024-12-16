import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "./ChartComponent.css"; // Import the CSS file

Chart.register(...registerables);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [chartData, setChartData] = useState({ labels: [], values: [] });

    useEffect(() => {
        // Fetch Excel data from backend
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/excel-data");
                const result = await response.json();

                // Convert JSON data to labels and values
                const labels = result.map((item) => item.Month);
                const values = result.map((item) => item.Sales);

                setChartData({ labels, values });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const canvas = chartRef.current;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartData.labels.length > 0) {
            chartInstance.current = new Chart(canvas, {
                type: "bar",
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Sales Data",
                            data: chartData.values,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                            labels: {
                                color: "#000",
                                font: {
                                    size: 14,
                                    weight: "bold",
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: "#555" },
                            grid: { color: "#ddd" },
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: "#555" },
                            grid: { color: "#ddd" },
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div className="chart-container">
            <h2 className="chart-title">Real-Time Sales Data</h2>
            <div className="chart-wrapper">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
};

export default ChartComponent;
