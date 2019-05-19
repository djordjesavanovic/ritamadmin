import React, {Component} from 'react';
import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    CardTitle,
    Input,
    Button, Table
} from "reactstrap";
import dancerService from "../../services/dancerService";
import {Redirect} from "react-router-dom";
import moment from "moment/moment";
import paymentService from "../../services/paymentService";

class Dancer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dancer: {},
            payments: {},
            disabled: true,
            redirect: false,
            loading: true,
        };

        this.toggleDisabled = this.toggleDisabled.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateDancer = this.updateDancer.bind(this);
        this.deleteDancer = this.deleteDancer.bind(this);
        this.getPaymentsByDancer = this.getPaymentsByDancer.bind(this);
        this.deletePayment = this.deletePayment.bind(this);

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
                    dancer: dancer.data.dancer,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getPaymentsByDancer() {
        const {match: {params}} = this.props;
        paymentService.getDancerPayments(params.id)
            .then((payments) => {
                this.setState({
                    payments: payments.data.payment,
                    loading: false
                })
                console.log(this.state.payments)
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

    deleteDancer() {
        let id = this.state.dancer.id;

        dancerService.deleteDancer(id)
            .then(() => {
                this.setState({
                    redirect: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deletePayment(id) {

        paymentService.deletePayment(id)
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.fetchDancer()
        this.getPaymentsByDancer()
        document.title = "Član | PK Ritam Admin"
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

                                            {
                                                this.state.disabled ?
                                                    <>
                                                        <Button className="btn-danger float-right"
                                                                onClick={this.deleteDancer}>Obriši</Button>
                                                        <Button className="btn-warning float-right mr-2"
                                                                onClick={this.toggleDisabled}>Uredi</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button className="btn-warning float-right"
                                                                onClick={() => (this.toggleDisabled(), this.fetchDancer())}>Otkaži</Button>
                                                        <Button className="btn-success float-right mr-2"
                                                                onClick={this.updateDancer}>Sačuvaj</Button>
                                                    </>
                                            }
                                        </Col>
                                    </Row>
                                </CardTitle>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Ime</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="first_name"
                                               value={!this.state.dancer.first_name ? '' : this.state.dancer.first_name}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Prezime</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="last_name"
                                               value={!this.state.dancer.last_name ? '' : this.state.dancer.last_name}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Telefon</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="phone_number"
                                               value={!this.state.dancer.phone_number ? '' : this.state.dancer.phone_number}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Roditelj</h6>
                                    </Col>
                                    <Col xs={8}>
                                        <Input bsSize="lg" name="parent"
                                               value={!this.state.dancer.parent ? '' : this.state.dancer.parent}
                                               disabled={this.state.disabled} onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={4}>
                                        <h6>Grupa</h6>
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
                <Row>
                    <Col md={{size: 12}} className="pb-3">
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4"><h3>Uplate</h3></CardTitle>
                                {
                                    this.state.loading ? <h4>Ucitava se...</h4> :
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Količina</th>
                                            <th>Datum</th>
                                            <th>Napomena</th>
                                            <th className="text-right">Akcija</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.payments.map((payment) => {
                                                return (
                                                    <tr key={payment.id}>
                                                        <th scope="row">{payment.id}</th>
                                                        <td>{!payment.amount ? "-" : payment.amount} KM</td>
                                                        <td>{!payment.date ? "-" : moment(payment.date).format('DD.MM.YYYY')}</td>
                                                        <td>{!payment.note ? "-" : payment.note}</td>
                                                        <td>
                                                            <Button className="btn-danger float-right"
                                                                    onClick={() => this.deletePayment(payment.id)}>Obriši</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Dancer;
