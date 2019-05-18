import React, {Component} from 'react';
import {Col, Container, Row, Card, CardBody, CardTitle, Table} from "reactstrap";
import {Link} from 'react-router-dom';
import dancerService from "../../services/dancerService";

class Dancers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dancers: []
        };
    }

    componentDidMount() {
        dancerService.getDancers()
            .then((dancers) => {
                this.setState({
                    dancers: dancers.data.dancers
                })
            })
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
                                <CardTitle className="mb-4"><h3>Članovi</h3></CardTitle>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ime</th>
                                        <th>Prezime</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.dancers.map((dancer) => {
                                            return (
                                                <tr key={dancer.id}>
                                                    <th scope="row">{dancer.id}</th>
                                                    <td><Link to={`/dancers/${dancer.id}`}>{dancer.first_name}</Link>
                                                    </td>
                                                    <td>{dancer.last_name}</td>
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

export default Dancers;
