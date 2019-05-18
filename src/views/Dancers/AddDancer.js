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
import {Redirect} from 'react-router-dom';
import dancerService from "../../services/dancerService";

class Dancer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dancer: {
                first_name: '',
                last_name: '',
                phone_number: '',
                parent: '',
                GroupId: ''
            },
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.addDancer = this.addDancer.bind(this)
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

    addDancer() {
        let dancer = this.state.dancer;

        dancerService.addDancer(dancer)
            .then(() => {
                this.setState({
                    redirect: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        
        if (this.state.redirect) {
            return <Redirect to={"/dancers"}/>
        }
        
        return (
            <Container>
                <Row>
                    <Col md={{size: 12}} className="pb-3">
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4 align-items-center">
                                    <Row className="align-items-center">
                                        <Col xs={4}>
                                            <h3>Član</h3>
                                        </Col>
                                        <Col xs={8}>
                                            <Button className="btn-success float-right mr-2"
                                                    onClick={this.addDancer}>Sačuvaj</Button>
                                        </Col>
                                    </Row>
                                </CardTitle>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Ime</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="first_name" value={this.state.dancer.first_name} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Prezime</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="last_name" value={this.state.dancer.last_name} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Telefon</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="phone_number" value={this.state.dancer.phone_number} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Roditelj</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="parent" value={this.state.dancer.parent} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Grupa</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="GroupId" value={this.state.dancer.GroupId} onChange={this.handleChange}/>
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
