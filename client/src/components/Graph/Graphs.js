import React from 'react';
import Dropdown from 'react-dropdown';
import { Line } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import 'chartjs-plugin-annotation';



class DataScatter extends React.Component {

    state = {
        fitnessArray: this.props.fitness,
        fitnessValues: [],
        fatigueArray: this.props.fatigue,
        fatigueValues: [],
        freshnessArray: this.props.freshness,
        freshnessValues: [],
        labels: [],
        options: [
            { value: 8, label: 'Past 7 Days' },
            { value: 15, label: 'Past 14 Days' },
            { value: 31, label: 'Past Month' },
            { value: 91, label: 'Past 3 Months' },
            { value: 365, label: 'Past Year' },
            { value: this.props.fitness.length, label: 'All Time' }
        ],
        selected: 'Pick a range',
        selected_value: 400
    }


    dropdownChange = (event) => {
        if (event.value !== this.state.selected_value) {
            let start = this.props.fitness.length - (event.value)
            for (let i = 0; i < this.state.options.length; i++) {
                if (this.state.options[i].value === event.value) {
                    this.setState({ selected: this.state.options[i].label, selected_value: event.value }, () => {
                        this.setState({ fitnessArray: this.props.fitness.slice(start), fatigueArray: this.props.fatigue.slice(start), freshnessArray: this.props.freshness.slice(start) }, () => {
                            this.getFitnessValues()
                        })
                    })

                }
            }
        }
    }

    getFitnessValues = () => {
        let placeholderFitnessScores = [];
        let placeholderFatigueScores = [];
        let placeholderFreshnessScores = [];
        let placeholderLabels = [];


        this.state.fitnessArray.forEach(element => {
            placeholderFitnessScores.push(element.y)
            if (this.state.selected_value < 365) {
                placeholderLabels.push(element.x.format('MMM DD'))
            }
            else {
                placeholderLabels.push(element.x.format('MMM DD Y'))

            }
        })

        this.state.fatigueArray.forEach(element => {
            placeholderFatigueScores.push(element.y)
        })

        this.state.freshnessArray.forEach(element => {
            placeholderFreshnessScores.push(element.y)
        })



        this.setState({ freshnessValues: placeholderFreshnessScores, fatigueValues: placeholderFatigueScores, fitnessValues: placeholderFitnessScores, labels: placeholderLabels })
    }

    componentWillMount() {
        this.getFitnessValues()
    }

    render() {
        let options = {
            response:true,

            scales: {
                xAxes: [{
                    ticks: {
               
                        maxTicksLimit: this.state.selected_value > 300 ? 12 : 14
                    }
                }],
                yAxes: [{
                    ticks: {
                    max: Math.round(Math.max.apply(null,this.state.freshnessValues))+5,
                    min: Math.round(Math.min.apply(null,this.state.freshnessValues))-5
                    }
                }]
            },
            annotation: {

                annotations: [{
                    type: 'box',
                    xScaleID: 'x-axis-0',
                    yScaleID: 'y-axis-0',
                    xMin: this.state.labels[0],
                    xMax: this.state.labels[this.state.labels.length - 1],
                    yMin: -10,
                    yMax: 1000,
                    borderColor: 'rgba(255,159,64,1)',
                    backgroundColor: 'rgba(255,159,64,0.2)',
                    borderWidth: 1
                },
                {
                    type: 'box',
                    xScaleID: 'x-axis-0',
                    yScaleID: 'y-axis-0',
                    xMin: this.state.labels[0],
                    xMax: this.state.labels[this.state.labels.length - 1],
                    yMin: -30,
                    yMax: -10,
                    borderColor: 'rgba(0,255,0,1)',
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    borderWidth: 1
                },
                {
                    type: 'box',
                    xScaleID: 'x-axis-0',
                    yScaleID: 'y-axis-0',
                    xMin: this.state.labels[0],
                    xMax: this.state.labels[this.state.labels.length - 1],
                    yMin: -300,
                    yMax: -30,
                    borderColor: 'rgba(255,0,0,1)',
                    backgroundColor: 'rgba(255,0,0,0.2)',
                    borderWidth: 1
                },
                {
                    type: 'box',
                    xScaleID: 'x-axis-0',
                    yScaleID: 'y-axis-0',
                    xMin: this.state.labels[0],
                    xMax: this.state.labels[this.state.labels.length - 1],
                    yMin: -10,
                    yMax: 10,
                    borderColor: 'rgba(255,100,0,1)',
                    backgroundColor: 'rgba(255,100,0,0.2)',
                    borderWidth: 1
                }
                ]
            }
        }



        let data = {
            labels: this.state.labels,
            datasets: [/*{
                label: 'Fitness dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,.8)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.fitnessValues
            },
            {
                label: 'Fatigue dataset',
                fill: false,
                lineTension: 0.1,
                index: 10,
                backgroundColor: 'rgba(255,0,0,0.2)',
                borderColor: 'rgba(255,0,0,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,0,0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255,0,0,1)',
                pointHoverBorderColor: 'rgba(255,0,0,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.fatigueValues
            },*/
            {
                label: 'Freshness dataset',
                fill: false,
                lineTension: 0.1,
                index: 10,
                backgroundColor: 'rgba(255,0,0,0.2)',
                borderColor: 'rgba(255,0,0,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,0,0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255,0,0,1)',
                pointHoverBorderColor: 'rgba(255,0,0,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.freshnessValues
            }]
        }

        console.log(options)

        return (
            <div>
                <Dropdown onChange={this.dropdownChange} options={this.state.options} value={this.state.selected} />
                <Line data={data} options={options} />
            </div>

        )
    }
}

export default DataScatter