import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="mb-3">
                <Navbar color="primary" light expand="md">
                    <NavbarBrand href="/">PK Ritam Admin</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Uplate
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Spisak
                                    </DropdownItem>
                                    <DropdownItem>
                                        Dodaj novu
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Članovi
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Spisak
                                    </DropdownItem>
                                    <DropdownItem>
                                        Dodaj novog
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Grupe
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Spisak
                                    </DropdownItem>
                                    <DropdownItem>
                                        Dodaj novu
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}