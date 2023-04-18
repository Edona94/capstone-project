import React from "react";
import {Employee} from "../model/Employee";
import {Bar} from "react-chartjs-2";
import './Chart.css';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Chart as ChartJS, ChartOptions, Title, Tooltip, Legend, LinearScale, CategoryScale, BarElement} from "chart.js";
import {Gender} from "../model/Gender";

ChartJS.register(
    Tooltip, LinearScale, CategoryScale, BarElement, Legend, Title, ChartDataLabels)

type Props = {
    employees: Employee[];
};
const countEmployeesByDepartmentAndGender = (employees: Employee[]) => {

    const counts: { [key: string]: { [key: string]: number } } = {};

    employees.forEach((employee) => {
        const {department, gender} = employee;
        if (!counts[department]) {
            counts[department] = {
                [Gender.MALE]: 0,
                [Gender.FEMALE]: 0,
                [Gender.OTHER]: 0,
            };
        }
        counts[department][gender] += 1;
    });

    return counts;
};

const EmployeeBarChart: React.FC<Props> = ({employees}) => {
    const counts = countEmployeesByDepartmentAndGender(employees);
    const departments = Object.keys(counts);

    departments.sort();

    const maleCounts = departments.map((d) => counts[d][Gender.MALE]);
    const femaleCounts = departments.map((d) => counts[d][Gender.FEMALE]);
    const otherCounts = departments.map((d) => counts[d][Gender.OTHER]);

    const chartData = {
        labels: departments,
        datasets: [
            {
                barThickness: 30,
                label: 'Male',
                data: maleCounts,
                backgroundColor: 'rgba(4,90,220,0.7)',
                borderWidth: 0
            },
            {
                barThickness: 30,
                label: 'Female',
                data: femaleCounts,
                backgroundColor: 'rgba(200,66,120,0.7)',
                borderWidth: 0
            },
            {
                barThickness: 30,
                label: 'Other',
                data: otherCounts,
                backgroundColor: 'rgba(20,124,120,0.7)',
                borderWidth: 0
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive:true,
        maintainAspectRatio:false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 11,
                    boxHeight: 11,
                    boxPadding: 5,
                    color: "black",
                    font: {
                        size: 12
                    },
                    borderRadius: 5
                }
            },
            title: {
                display: true,
                text: "Employees by department and gender",
                font: {size: 10}
            },
            datalabels: {
                display: true,
                anchor: 'center',
                align: "center",
                offset: -3,
                color: '#333',
                font: {
                    size: 9,
                    weight: 'bold',
                },
                formatter: (value: number) => (value === 0 ? '' : value.toString())
            },
        },
        scales: {
            x: {
                offset: true,
                stacked: true,
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
                stacked: true,
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
        <div className={"chart-container1"}>
        <Bar data={chartData} options={options}/>
        </div>
    );
};
export default EmployeeBarChart;