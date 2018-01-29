import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessageData } from '../../actions';
import { Card } from '../common';

class MessageReport extends Component {

    componentDidMount() {
        this.props.fetchMessageData();
    }

    render() {
        const loadingBar = (this.props.loading) ? (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        ) : (<div />);

        const { reportContainer } = styles;
        return (
            <div style={reportContainer}>
                {loadingBar}
                <Card label="GPS message total" data={this.props.gpsCount} />

                <Card label="CAN message total" data={this.props.canCount} />

                <Card label="Unique CAN message count" data={this.props.uniqueCanCount} />

                <Card label="Total runtime" data={this.props.totalRuntime} />

                <Card label="CAN average per second" data={this.props.canAvgPerSecond} />

                <Card label="CAN average per GPS message" data={this.props.canAvgPerGps} />

                <Card label="First timestamp with the most CAN messages" data={this.props.firstTsMostCans} />

                <Card label="First timestamp with the least CAN messages" data={this.props.firstTsLeastCans} />
            </div>
        );
    }
}

const styles = {
    reportContainer: {
        marginRight: 100,
        marginLeft: 100
    },
}

const mapStatetoProps = state => {
    const { gpsCount, canCount, uniqueCanCount, totalRuntime, canAvgPerSecond, canAvgPerGps, firstTsMostCans, firstTsLeastCans, loading } = state.message;
    return { gpsCount, canCount, uniqueCanCount, totalRuntime, canAvgPerSecond, canAvgPerGps, firstTsMostCans, firstTsLeastCans, loading };
}

export default connect(mapStatetoProps, { fetchMessageData })(MessageReport);
