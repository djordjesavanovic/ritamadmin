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
import Select from 'react-select';
import paymentService from "../../services/paymentService";
import dancerService from "../../services/dancerService";

class AddPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: {
                amount: '',
                date: new Date(),
                note: '',
            },
            dancer_id: null,
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.addPayment = this.addPayment.bind(this);
        this.selectDancer = this.selectDancer.bind(this);
    }


    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        let payment = this.state.payment;
        payment[name] = value;

        this.setState({
            payment: payment,
        })
    }

    selectDancer = (dancer_id) => {
        this.setState({ dancer_id });
    };

    addPayment() {
        let date = new Date(this.state.payment.date);
        let toIso = date.toISOString()

        let payment = {
            ...this.state.payment,
            date: toIso,
            dancer_id: this.state.dancer_id.value
        };

        paymentService.addPayment(payment)
            .then(() => {
                this.setState({
                    redirect: true
                });
            })
            .catch((err) => {
                this.setState({
                    redirect: false
                });
                console.log(err);
            });
    }

    componentDidMount() {

        document.title="Dodaj uplatu | PK Ritam Admin"

        dancerService.getDancers()
            .then((dancers) => {
                this.setState({
                    options: dancers.data.dancers.map((dancer) => {
                        return {value: dancer.id, label: dancer.first_name + " " + dancer.last_name }
                    })
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={"/payments"}/>
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
                                            <h3>Uplata</h3>
                                        </Col>
                                        <Col xs={8}>
                                            <Button className="btn-success float-right mr-2"
                                                    onClick={this.addPayment}>Sačuvaj</Button>
                                        </Col>
                                    </Row>
                                </CardTitle>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Količina</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" type="number" name="amount" value={this.state.payment.amount} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Datum</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" type="date" name="date" value={this.state.payment.date} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Član</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Select
                                            name="dancer_id"
                                            value={this.state.dancer_id}
                                            options={this.state.options}
                                            onChange={this.selectDancer}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Napomena</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="note" value={this.state.payment.note} onChange={this.handleChange}/>
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

export default AddPayment;
