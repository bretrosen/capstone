import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RatingDistribution = () => {
    const { courseId } = useParams()
    const coursesObj = useSelector(state => state.courses.allCourses)
    const courseQualityArray = coursesObj[courseId]?.qualities

    // object to keep track of rating distribution
    const dataObj = { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0 }
    // iterate through quality array
    // increment the appropriate value in the data object for each element of the array
    courseQualityArray?.forEach(quality => {
        if (quality > 0 && quality <= 4) {
            dataObj["0-4"]++
        } else if (quality > 4 && quality <= 8) {
            dataObj["4-8"]++
        } else if (quality > 8 && quality <= 12) {
            dataObj["8-12"]++
        } else if (quality > 12 && quality <= 16) {
            dataObj["12-16"]++
        } else {
            dataObj["16-20"]++
        }
    })

    // grab the values from the object and put them in an array for chartjs
    const dataValues = Object.values(dataObj)
    // labels for bar chart
    const labels = ['Awesome (16-20)', 'Great (12-16)', 'Good (8-12)', 'OK (4-8)', 'Awful (0-4)']

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: dataValues.reverse(),
                backgroundColor: 'rgba(0,40,210,1)',
                borderColor: 'rgba(0,40,210,1)',
                borderWidth: 1,
            }
        ]
    }

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 6,
            },
        },
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Rating Distribution'
            },
        },
        scales: {
            y: {
                ticks: {
                    display: true,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            },
            y2: {
                labels: dataValues,
                position: 'right',
                ticks: {
                    display: true,
                    font: {
                        size: 15,
                        weight: 700
                    }
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            }
        }
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default RatingDistribution
