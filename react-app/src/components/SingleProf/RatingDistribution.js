import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

const RatingDistribution = () => {
    const { profId } = useParams()
    const profsObj = useSelector(state => state.profs.allProfs)
    const profQualityArray = profsObj[profId]?.qualities

    // labels for bar chart
    const labels = ['Awesome (16-20)', 'Great (12-16)', 'Good (8-12)', 'OK (4-8)', 'Awful (0-4)']
    // object to keep track of rating distribution
    const dataObj = { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0 }
    // iterate through quality array
    // increment the appropriate value in the data object for each element of the array
    profQualityArray?.forEach(quality => {
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

    const data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: dataValues,
                backgroundColor: 'rgba(75, 192, 192, 0)',
                borderColor: 'rgba(0,200,5, 1)',
                borderWidth: 1,
            }
        ]
    }

    const options = {
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
        },
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            },
            x: {
                grid: {
                    drawBorder: false,
                    display: false
                }
            }
        }
      };

return (
    <>
    <div>
        <Bar data={data} options={options} />
    </div>
        {/* <ul>
            {profQualityArray.map((quality) => (
                <li>Quality: {quality.toFixed(1)}</li>
            ))}
            <li>{dataValues}</li>
        </ul> */}
    </>
)

}

export default RatingDistribution
