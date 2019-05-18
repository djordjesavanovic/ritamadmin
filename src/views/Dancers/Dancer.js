import React, {Component} from 'react';
import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    CardTitle,
    Input,
    Button
} from "reactstrap";
import dancerService from "../../services/dancerService";

class Dancer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dancer: {},
            disabled: true,
        };

        this.toggleDisabled = this.toggleDisabled.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateDancer = this.updateDancer.bind(this)
    }

    toggleDisabled() {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        let dancer = this.state.dancer;
        dancer[name] = value;

        this.setState({
            dancer: dancer,
        })
    }

    fetchDancer() {
        const {match: {params}} = this.props;
        dancerService.getDancer(params.id)
            .then((dancer) => {
                this.setState({
                    dancer: dancer.data.dancer
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateDancer() {
        let dancer = this.state.dancer;

        dancerService.editDancer(dancer)
            .then((dancer) => {
                this.setState({
                    dancer: dancer.data.dancer
                });
                this.toggleDisabled()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.fetchDancer();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{size: 12}} className="pb-3">
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">
                                    <Row className="align-items-center">
                                        <Col xs={6}>
                                            <h3>Član</h3>
                                        </Col>
                                        <Col xs={6}>

                                            {
                                                this.state.disabled ?
                                                    <Button className="btn-warning float-right"
                                                            onClick={this.toggleDisabled}>Uredi</Button>
                                                    :
                                                    <>
                                                    <Button className="btn-danger float-right"
                                                            onClick={() => (this.toggleDisabled(), this.fetchDancer())}>Otkaži</Button>
                                                    <Button className="btn-success float-right"
                                                            onClick={this.updateDancer}>Sačuvaj</Button>
                                                    </>
                                            }
                                        </Col>
                                    </Row>
                                </CardTitle>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h5>Ime</h5>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="first_name" value={!this.state.dancer.first_name ? '' : this.state.dancer.first_name}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h5>Prezime</h5>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="last_name" value={!this.state.dancer.last_name ? '' : this.state.dancer.last_name}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h5>Telefon</h5>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="phone_number" value={!this.state.dancer.phone_number ? '' : this.state.dancer.phone_number}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h5>Roditelj</h5>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="parent" value={!this.state.dancer.parent ? '' : this.state.dancer.parent}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h5>Grupa</h5>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg"
                                               name="GroupId"
                                               value={!this.state.dancer.GroupId ? '' : this.state.dancer.GroupId}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Dancer;
