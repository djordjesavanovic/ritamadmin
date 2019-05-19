import React, {Component} from 'react';
import {Col, Container, Row, Card, CardBody, CardTitle, Table, Button} from "reactstrap";
import paymentService from "../../services/paymentService";
import moment from 'moment';

class Payments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payments: [],
        };

        this.deletePayment = this.deletePayment.bind(this);
    }

    componentDidMount() {
        paymentService.getPayments()
            .then((payments) => {
                console.log(payments);
                this.setState({
                    payments: payments.data.payments
                })
            })
            .catch((err) => {
                console.log(err);
            });

        document.title="Uplate | PK Ritam Admin"
    }

    deletePayment(id) {

        paymentService.deletePayment(id)
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col md={{size: 12}} className="pb-3">
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4"><h3>Uplate</h3></CardTitle>
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Payments;
