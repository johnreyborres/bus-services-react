import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            locationList: [],
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('auth')) {
            this.props.handleRedirect('/login');
        }
    }

    handleRedirectToAddBus = (location) => {
        this.props.handleRedirect(`/add-bus?id=${location.id}&name=${location.name}`);
    }

    handleSearch = () => {
        this.setState({ isFetching: true });
        var url = 'http://localhost/api/bus_stops?latitude=1.33288313&longitude=103.88363603';
        var headers = {
            'headers' : {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        };

        axios.get(url, headers).then(res => {
            this.setState({ isFetching: false });
            this.setState({
                locationList: res.data.data
            });
        }).catch(err => {
            this.setState({ isFetching: false });
        });
    }

    render () {
        var { locationList, isFetching } = this.state;
        var { handleLogout } = this.props;

        return (
            <div className="page-wrapper home-page">
                <div className="home-wrapper">
                    <div className="search-wrapper">
                        <div className="search-header">
                            <span>Search Nearby Bus Stops</span>
                        </div>
                        <div className="search-form">
                            <div className="search-btn" onClick={this.handleSearch}>
                                <span>Search</span>
                            </div>
                            <div className="logout-btn" onClick={handleLogout}>
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                    <div className="results-wrapper">
                        <div className="result-list">
                            {
                                (locationList.length > 0 && !isFetching ) && locationList.map(location => (
                                    <div className="result-item">
                                        <div className="item-info">
                                            <div className="add-bus-btn" onClick={() => this.handleRedirectToAddBus(location)}>
                                                <span>Add New Bus</span>
                                            </div>
                                            <div className="item-name">
                                                <span>{ location.name }</span>
                                            </div>
                                            <div className="address">
                                                <span>{ location.address }</span>
                                            </div>
                                            <div className="item-distance">
                                                <span><FontAwesomeIcon icon={faLocationArrow} /> { location.distance_in_km } km</span>
                                            </div>
                                        </div>
                                        {
                                            location.nearby_buses.length > 0 && <div className="bus-list">
                                                <div className="bus-list-header">
                                                    <span>Incoming Buses:</span>
                                                </div>
                                                { location.nearby_buses.map(bus => (
                                                    <div className="bus-info">
                                                        <div className="bus-number">
                                                            <span>Bus { bus.bus_number } { (bus.arriving_in_mins == 0) ? 'Arrived' : 'Arriving in ' + bus.arriving_in_mins + ' min(s)' }</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                )) || <div><span>No locations found.</span></div>
                            }
                            {
                                isFetching && <div><span>Fetching...</span></div> || ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}