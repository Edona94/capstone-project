import React, { useEffect, useState } from "react";
import { Employee } from "../model/Employee";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement, ChartOptions, Title,SubTitle } from "chart.js";
import './Chart.css';

ChartJS.register(
    Tooltip, Legend, Title,SubTitle, ArcElement
);

type Props = {
    employees: Employee[];
};

type GenderSalaryData = {
    male: string;
    female: string;
};

const SalaryChart = (props: Props) => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
        }[];
    }>();
    const [percentageDifference, setPercentageDifference] = useState<string>("");


    useEffect(() => {
        const calculateTotalSalaryByGender = (): GenderSalaryData => {
            let totalSalaryMale = 0;
            let totalSalaryFemale = 0;

            for (const employee of props.employees) {
                if (employee.gender === 'MALE') {
                    totalSalaryMale += Number(employee.salary); // Convert to number before adding
                } else if (employee.gender === 'FEMALE') {
                    totalSalaryFemale += Number(employee.salary); // Convert to number before adding
                }
            }
            const totalSalary = totalSalaryMale + totalSalaryFemale
            const malePercentage = (totalSalaryMale / totalSalary * 100).toFixed(2);
            const femalePercentage = (totalSalaryFemale / totalSalary * 100).toFixed(2);
            const percentageDifference = (Math.abs( Number(femalePercentage)-Number(malePercentage))).toFixed(2);

            setPercentageDifference(percentageDifference);
            return { male: totalSalaryMale.toString(), female: totalSalaryFemale.toString()};
        };

        const { male, female} = calculateTotalSalaryByGender();
        setChartData({
            labels: ['Male', 'Female'],
            datasets: [
                {
                    data: [Number(male), Number(female)], // Convert to number before assigning
                    backgroundColor: ['rgba(4,90,220,0.7)', 'rgba(200,66,120,0.7)'],
                },
            ],
        });
    }, [props.employees]);


    const options : ChartOptions<"doughnut"> = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Salary distribution by gender"
                },
                subtitle: {
                    display: true,
                    text: 'Percentage Difference: ' + percentageDifference + '%',
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || "";
                            const value = context.formattedValue || "";
                            return `${label}: ${value} €`;
                        },
                    },
                },
                datalabels: {
                    display: true,
                    anchor: "start",
                    align: "start",
                    offset: -2,
                    formatter: (value) => value + '€',
                    font: {size: 8, weight: "bold"}
                },
                legend: {
                    display: true,
                    position: "right",
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
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            elements: {
                arc: {
                    borderWidth: 1
                }
            },
            cutout: '65%'
        };


    return (
        <div className={"chart-container"}>
            {chartData && <Doughnut data={chartData} options={options} />}
        </div>
    );
};

export default SalaryChart;