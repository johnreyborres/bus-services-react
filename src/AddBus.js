import React, { Component } from 'react';
import axios from "axios";
import qs from 'qs';

export default class AddBus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            busStopId: '',
            busNumber: '',
            hasError: false,
            errMsg: ''
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('auth')) {
            this.props.handleRedirect('/login');
        }

        var params = qs.parse(this.props.handleGetRequestParams(), { ignoreQueryPrefix: true });

        this.setState({busStopId: params.id, busStopName: params.name});
    }

    handleSubmit = () => {
        this.setState({ isSubmitting: true, hasError: false });
        var url = 'http://localhost/api/buses';
        var data = {
            bus_stop_id: this.state.busStopId,
            bus_number: this.state.busNumber
        };
        var headers = {
            'headers' : {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        };

        axios.post(url, data, headers).then(res => {
            this.setState({ isSubmitting: false });
            this.props.handleRedirect('/home');
        }).catch(err => {
            this.setState({ isSubmitting: false, hasError: true, errMsg: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0] });
        });
    }

    handleBusNumberChange = (e) => {
        this.setState({busNumber: e.target.value});
    }

    render () {
        var { isSubmitting, hasError, busStopName, errMsg } = this.state;

        return (
            <div className="page-wrapper add-page">
                <div className="add-wrapper">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <span>Add New Bus</span>
                        </div>
                        <div className="form-fields">
                            <div className="location-name">
                                <span>{ this.state.busStopName }</span>
                            </div>
                            <div className="location-number">
                                <input
                                    type="text"
                                    name="busNumber"
                                    value={this.state.busNumber}
                                    onChange={this.handleBusNumberChange}
                                />
                            </div>
                            <div className="submit-btn" onClick={this.handleSubmit}>
                                <span>Add New Bus</span>
                            </div>
                        </div>
                        {
                            hasError && <div className="form-error">
                                <span>{ errMsg && errMsg || 'There was an error adding the bus to the specified bus stop.' }</span>
                            </div> || ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}