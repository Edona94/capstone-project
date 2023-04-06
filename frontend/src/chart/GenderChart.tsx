import React, {useEffect,useState} from "react";
import {Employee} from "../model/Employee";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement, ChartOptions, Title,} from "chart.js";
import './Chart.css'

ChartJS.register(
    Tooltip, Legend, Title, ArcElement)

type Props = {
    employees: Employee[];
};

const GenderChart = (props: Props) => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
        }[];
    }>();

    useEffect(() => {
        const totalEmployees = props.employees.length;
        const totalMale = props.employees.filter(
            (employee) => employee.gender === "MALE"
        ).length;
        const totalFemale = props.employees.filter(
            (employee) => employee.gender === "FEMALE"
        ).length;

        const percentageMale = Math.round((totalMale / totalEmployees) * 100);
        const percentageFemale = Math.round((totalFemale / totalEmployees) * 100);

        setChartData({
            labels: ["Male", "Female"],
            datasets: [
                {
                    data: [percentageMale, percentageFemale],
                    backgroundColor: ["rgba(4,90,220,0.7)", "rgba(200,66,120,0.7)"],
                },
            ],
        });
    }, [props.employees]);

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.chart.data.labels[context.dataIndex] || '';
                        const value = context.chart.data.datasets[0].data[context.dataIndex];
                        const formattedValue = value + '%';
                        return `${label}: ${formattedValue}`;
                    }
                }
            },
            datalabels: {
                display: true,
                anchor: "end",
                align: "start",
                offset:20,
                formatter: (value) => value +'%',
                font: { size: 9, weight: "bold"},
            },
            title: {
                display: true,
                text: 'Percentage of Male and Female Employees',
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
                    borderRadius: 5,
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
                borderWidth: 1,
            }
        },
        cutout: '65%'
    };
    return (
        <div className="chart-container" style={{ height: "200px" ,width:"200px"}}>
            {chartData && <Doughnut data={chartData} options={options}/>}
        </div>
    );
};

export default GenderChart;
