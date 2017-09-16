import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';

import Header from './components/Header';
import Chart from './components/Chart'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialSettings: {},
            isLoaded: false
        };

        Axios.get('/api/init.json')
            .then(initData => initData.data)
            .then(initialSettings => this.setState({ initialSettings, isLoaded: true }))
            .catch(this.errorHandler);
    }

    renderContent() {
        return (
            <section>
                <Header
                    name={this.state.initialSettings.name}
                    code={this.state.initialSettings.code}
                    fullName={this.state.initialSettings.fullName}
                    lastPrice={this.state.initialSettings.lastPrice}
                    currency={this.state.initialSettings.currency}
                />
                <Chart initialSettings={this.state.initialSettings} />
            </section>
        );
    }

    renderLoader() {
        return (
            <div className="loader">
                <img src="spinner.svg" />
            </div>
        );
    }

    render() {
        return (this.state.isLoaded ? this.renderContent() : this.renderLoader());
    }

    errorHandler(error) {
        console.error(error);
    }
}

App.propTypes = {
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

ReactDom.render(<App />, document.getElementById('root'));