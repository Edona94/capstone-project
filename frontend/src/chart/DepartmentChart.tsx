import React, {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import {Bar} from "react-chartjs-2";
import './Chart.css';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    ChartOptions,
    Title,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    BarElement
} from "chart.js";

ChartJS.register(
    Tooltip, LinearScale, CategoryScale, BarElement, Legend, Title,  ChartDataLabels )

type Props = {
    employees: Employee[];
};

const DepartmentChart = (props: Props) => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            barThickness: number,
            data: number[];
            backgroundColor: string[];
            borderWidth: number;
        }[];
    }>();

    useEffect(() => {
        const departments = ['Engineering', 'Software Development', 'IT', 'Finance', 'Human Resources', 'Sales'];
        const data = departments.map(department => {
            const employeesInDepartment = props.employees.filter(employee => employee.department === department);
            const count = employeesInDepartment.length;
            return {
                department,
                count
            }
        });

        data.sort((a, b) => a.department.localeCompare(b.department));
        const labels = data.map(d => d.department);
        const counts = data.map(d => d.count);

        setChartData({
            labels,
            datasets: [
                {
                    label: "Employees by Department",
                    barThickness: 30,
                    data: counts,
                    backgroundColor: [
                        "rgba(24,100,250,0.8)",
                        "rgba(220,88,120,0.8)",
                        "rgba(255, 206, 86, 0.8)",
                        "rgba(75, 192, 192, 0.8)",
                        "rgba(153, 102, 255, 0.8)",
                        "rgba(255, 159, 78, 0.8)",
                    ],
                    borderWidth: 1,
                },
            ],
        });
    }, [props.employees]);

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Employees by Department",
                font: {size: 10}
            },
            legend: {
               display:false
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.dataset.label || '';
                        const value = context.formattedValue;
                        return `${label}: ${value}`;
                    }
                }
            },
            datalabels: {
                display: true,
                anchor: "end",
                align: "top",
                offset: -3,
                formatter: (value) => value,
                font: { size: 9, weight: "bold"}
            },
        },
        scales: {
            x: {
                offset: true,
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    maxTicksLimit: 100,
                    font: {
                        size: 10
                    }
                },
                grid : {
                    display : false
                },
                title: {
                    display: true,
                    text: 'Departments',
                    color: 'black',
                    font: {
                        size: 7,
                        weight: 'bold'
                    },
                    align: 'center'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    maxTicksLimit: 100
                },
                title: {
                    display: true,
                    text: 'Employee Count',
                    color: 'black',
                    font: {
                        size: 7,
                        weight: 'bold'
                    },
                    align: 'center',
                    padding:6
                }
            }
        }
    };

    return (
        <div className="chart-container1" >
            {chartData && <Bar data={chartData} options={options}/>}
        </div>
    );
};

export default DepartmentChart;
