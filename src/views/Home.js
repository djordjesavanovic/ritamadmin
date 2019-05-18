import React from 'react';
import {Col, Container, Row, Card, CardBody, CardTitle, CardSubtitle,} from "reactstrap";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faUsers,
    faUserPlus,
    faMoneyCheckAlt,
    faHandHoldingUsd,
    faIdCard,
    faUserFriends,
} from '@fortawesome/free-solid-svg-icons'

function Home() {
    return (
        <Container className="text-center">
            <Row>
                <Col md={{size: 4, offset: 2}} className="pb-3">
                    <Link to={"/payments"}>
                        <Card className="menuCard">
                            <CardBody>
                                <FontAwesomeIcon icon={faMoneyCheckAlt} size={"lg"}/>
                                <CardTitle className="mb-4"><h3>Uplate</h3></CardTitle>
                                <CardSubtitle><h6>Lista svih uplata</h6></CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col md={{size: 4}} className="pb-3">
                    <Link to={"/addPayment"}>
                        <Card className="menuCard">
                            <CardBody>
                                <FontAwesomeIcon icon={faHandHoldingUsd} size={"lg"}/>
                                <CardTitle className="mb-4"><h3>Dodaj uplatu</h3></CardTitle>
                                <CardSubtitle><h6>Evidentiraj uplatu članarine</h6></CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 4, offset: 2}} className="pb-3">
                    <Link to={"/dancers"}>
                        <Card className="menuCard">
                            <CardBody>
                                <FontAwesomeIcon icon={faUserFriends} size={"lg"}/>
                                <CardTitle className="mb-4"><h3>Članovi</h3></CardTitle>
                                <CardSubtitle><h6>Lista svih članova</h6></CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col md={{size: 4}} className="pb-3">
                    <Link to={"/addDancer"}>
                        <Card className="menuCard">
                            <CardBody>
                                <FontAwesomeIcon icon={faIdCard} size={"lg"}/>
                                <CardTitle className="mb-4"><h3>Dodaj člana</h3></CardTitle>
                                <CardSubtitle><h6>Dodaj novog člana</h6></CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 4, offset: 2}} className="pb-3">
                    <Link to={"/groups"}>
                        <Card className="menuCard">
                            <CardBody>
                                <FontAwesomeIcon icon={faUsers} size={"lg"}/>
                                <CardTitle className="mb-4"><h3>Grupe</h3></CardTitle>
                                <CardSubtitle><h6>Lista svih plesnih grupa</h6></CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col md={{size: 4}} className="pb-3">
                    <Link to={"/addGroup"}>
                        <Card className="menuCard">
                            <CardBody>
                                <FontAwesomeIcon icon={faUserPlus} size={"lg"}/>
                                <CardTitle className="mb-4"><h3>Dodaj grupu</h3></CardTitle>
                                <CardSubtitle><h6>Dodaj novu plesnu grupu</h6></CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
