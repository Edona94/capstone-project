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
import {Gender} from "../model/Gender";

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

        const femaleCounts = departments.map(department => {
            const employeesInDepartment = props.employees.filter(employee => employee.department === department);
            const femaleEmployees = employeesInDepartment.filter(employee => employee.gender === Gender.FEMALE);
            const femaleCount = femaleEmployees.length;
            const totalCount = employeesInDepartment.length;
            const percentage = ((femaleCount / totalCount) * 100).toFixed(2);
            return {
                department,
                percentage
            };
        });


femaleCounts.sort((a, b) =>
    a.department.localeCompare(b.department));
        const labels = femaleCounts.map(d => d.department);
        const counts = femaleCounts.map(d => parseFloat(d.percentage));
        setChartData({
            labels,
            datasets: [
                {
                    label: "Women percentage by role",
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
                    borderWidth: 1
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
                text: "Women percentage by role",
                font: {size: 10},
                padding:{bottom:15,top:12}
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
                formatter: (value) => value+ '%',
                font: { size: 9, weight: "bold"}
            },
        },
        scales: {
            x: {
                offset: true,
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    maxTicksLimit: 10,
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
                    stepSize: 5,
                    maxTicksLimit: 5,
                    callback: (value) => `${value}%`,
                    font: {
                        size: 9
                    }
                },
                title: {
                    display: true,
                    text: 'Women percentage',
                    color: 'black',
                    font: {
                        size: 7,
                        weight: 'bold'
                    },
                    align: 'center',
                    padding:7
                },

            }
        }
    };

    return (
        <div className="chart-container1">
            {chartData && <Bar data={chartData} options={options}/>}
        </div>
    );
};

export default DepartmentChart;