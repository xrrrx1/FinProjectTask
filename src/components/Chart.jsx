import React from 'react';
import { LineChart } from 'react-d3';
import Axios from 'axios';

import PeriodBar from './PeriodBar';
import TypeSelector from './TypeSelector';

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            periods: [],
            types: [
                {id: 0, name: 'Price', key: 'price', selected: true},
                {id: 1, name: 'Yeld', key: 'yeld', selected: false},
                {id: 2, name: 'Spread', key: 'spread', selected: false}
            ],
            chartData:[],
            selectedPeriod: 'week',
            selectedType: 'price'
        };

        this.state.periods.push({id: 0, name: 'Week', key: 'week', selected: true});
        if (props.initialSettings.period > 30) {
            this.state.periods.push({id: 1, name: 'Month', key: 'month', selected: false});
        }
        if (props.initialSettings.period > 90) {
            this.state.periods.push({id: 2, name: 'Quarter', key: 'quarter', selected: false});
        }
        if (props.initialSettings.period > 300) {
            this.state.periods.push({id: 3, name: 'Year', key: 'year', selected: false});
        }
        this.state.periods.push({id: 4, name: 'Max', key: 'max', selected: false});

        this.onPeriodChange = this.onPeriodChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);

        this.getChartData(this.state.selectedType, this.state.selectedPeriod);
    }

    onPeriodChange(key) {
        let newPeriod = '';
        let periods = this.state.periods.map(period => {
            period.selected = false;
            if (period.key === key) {
                period.selected = true;
                newPeriod = period.key;
            }
            return period;
        });

        this.getChartData(this.state.selectedType, newPeriod);
    }

    onTypeChange(event) {
        let newType = '';
        let types = this.state.types.map(type => {
            type.selected = false;
            if (type.key === event.target.value) {
                type.selected = true;
                newType = type.key
            }
            return type;
        });

        this.getChartData(newType, this.state.selectedPeriod);
    }

    getChartData(type, period) {
        Axios.get('/api/' + period + '.json')
            .then(chartData => chartData.data)
            .then(data => {
                let chartData = data.map(item => {
                    let dateParts = item.date.split('.');
                    return {
                        x: new Date(dateParts[2], dateParts[1], dateParts[0]),
                        y: item[type]
                    }
                });

                return chartData;
            })
            .then(chartData => this.setState({chartData, selectedType: type, selectedPeriod: period}))
            .catch(this.errorHandler);
    }

    render() {
        return (
            <div className="container">
                <PeriodBar periods={this.state.periods} onClick={this.onPeriodChange} />
                {
                    this.state.chartData.length > 0 ?
                        <LineChart
                            legend={false}
                            data={[{name:'', values: this.state.chartData}]}
                            width={600}
                            height={350}
                        />
                    :
                        <span className="empty-chart">Нет данных для вывода графика</span>
                }
                <TypeSelector types={this.state.types} onSelect={this.onTypeChange} />
            </div>
        );
    }

    errorHandler(error) {
        console.error(error);
    }
}

Chart.propTypes = {
    initialSettings: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        period: React.PropTypes.number.isRequired,
        periodStart: React.PropTypes.string.isRequired,
        periodEnd: React.PropTypes.string.isRequired,
        currency: React.PropTypes.string.isRequired,
        lastPrice: React.PropTypes.string.isRequired,
        code: React.PropTypes.string.isRequired,
        fullName: React.PropTypes.string.isRequired
    })
};

export default Chart;