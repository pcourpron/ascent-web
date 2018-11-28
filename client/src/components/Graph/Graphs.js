import React from 'react';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import 'chartjs-plugin-annotation';
import Navbar from '../ClientPickNavbar/ClientPickNavbar'


class DataScatter extends React.Component {

    state = {
        fitnessArray: this.props.fitness,
        fitnessValues: [],
        fatigueArray: this.props.fatigue,
        fatigueValues: [],
        freshnessArray: this.props.freshness,
        freshnessValues: [],
        weight: this.props.weight,
        weightValues : [],

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
        selected_value: 400,
        graphs: [{ value: 'freshness', }]
    }


    dropdownChange = (event) => {
        if (event.value !== this.state.selected_value) {
            let start = this.props.fitness.length - (event.value)
            for (let i = 0; i < this.state.options.length; i++) {
                if (this.state.options[i].value === event.value) {
                    this.setState({ selected: this.state.options[i].label, selected_value: event.value }, () => {
                        this.setState({ fitnessArray: this.props.fitness.slice(start), fatigueArray: this.props.fatigue.slice(start), freshnessArray: this.props.freshness.slice(start), weight: this.props.weight.slice(start) }, () => {
                            this.getFitnessValues()
                        })
                    })

                }
            }
        }
    }

    multiDropDownChange = (event) => {
        this.setState({ graphs: event })
    }

    getFitnessValues = () => {
        let placeholderFitnessScores = [];
        let placeholderFatigueScores = [];
        let placeholderFreshnessScores = [];
        let placeholderWeights = [];
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
        this.state.weight.forEach(element => {
            placeholderWeights.push(element.y)
        })
        



        this.setState({ freshnessValues: placeholderFreshnessScores, fatigueValues: placeholderFatigueScores, fitnessValues: placeholderFitnessScores, labels: placeholderLabels, weightValues:placeholderWeights })
    }

    componentWillMount() {
        this.getFitnessValues()
    }



    render() {
        let options = {
            response: true,
            maintainAspectRatio: false,
            legend: false,
            title: {
                display: true,
                text: 'Freshness Scores',
                fontSize: 18
            },
            scales: {
                xAxes: [{
                    ticks: {

                        maxTicksLimit: this.state.selected_value > 300 ? 12 : 14
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 20,
                        min: -35
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
                    borderColor: 'rgba(0,100,255,.5)',
                    backgroundColor: 'rgba(0,100,255,0.2)',
                    borderWidth: 1
                }
                ]
            }
        }

        let data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Freshness',
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
                    data:this.state.weightValues
                },

            ]
        }
        let selectOptions = [{ label: 'Freshness', value: "freshness" }, { label: 'Fatigue', value: "fatigue" }, { label: 'Fitness', value: "fitness" },{ label: 'Weight', value: "weight" }]


        return (
            <div className='container-fluid' style={{ minHeight: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixlib=rb-0.3.5&s=b62d34e46e0ddc9b507068c1aab921f9&auto=format&fit=crop&w=1496&q=80)', paddingTop: '100px' }}>
                <Navbar />

                <div style={{ height: '150px', backgroundColor: 'whitesmoke', borderRadius: '5px', marginBottom: '20px' }}>
                    <div className='row justify-content-center'>
                        <h3>Parameters</h3>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-sm-4'>
                            <div class='col-sm-6'>
                                <h6>Select Range:</h6>
                            </div>
                            <div class='col-sm-6'>
                                <Select
                                    onChange={this.dropdownChange}
                                    options={this.state.options}
                                />
                            </div>
                        </div>
                        <div className='col-sm-8'>
                            <div class='col-sm-6'>
                                <h6>Data to See:</h6>
                            </div>
                            <div class='col-sm-6'>
                                <Select
                                    options={selectOptions}
                                    isMulti
                                    defaultValue={selectOptions[0]}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={this.multiDropDownChange}
                                />
                            </div>
                        </div>

                    </div>



                </div>

                <div style={{ minHeight: '400px', backgroundColor: 'whitesmoke', borderRadius: '5px', paddingBottom: '50px' }}>

                    {
                        this.state.graphs.map((element => {
                            let newData = JSON.parse(JSON.stringify(data))
                            let newOptions = JSON.parse(JSON.stringify(options))
                            newData.datasets[0].data = this.state[`${element.value}Values`]

                            if (element.value !== 'freshness') {
                                var placeholderArray = this.state[`${element.value}Values`]

                                if (element.value === 'weight'){
                                    newOptions.scales.yAxes = [{
                                        ticks: {
                                            max: Math.max.apply(null, placeholderArray) + 2,
                                            min: 219
                                        }
                                    }]
    
                                }
                                else{

                                
                                newOptions.scales.yAxes = [{
                                    ticks: {
                                        max: Math.max.apply(null, placeholderArray) + 5,
                                        min: 0
                                    }
                                }]

                            }
                    
                                newOptions.title.text = `${element.value[0].toUpperCase()}${element.value.slice(1)} Values`
                            }

                            return (
                            <div class='row' style={{height:'400px',padding:'0 20px'}}>
                                <Line data={newData} options={newOptions} />
                            </div>)

                        })
                        )}


                </div>

            </div>

        )
    }
}

export default DataScatter