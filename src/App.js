import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";

import Home from "./views/Home";
import Dancers from "./views/Dancers/Dancers";
import AddDancer from "./views/Dancers/AddDancer";
import Dancer from "./views/Dancers/Dancer";
import Groups from "./views/Groups/Groups";
import AddGroup from "./views/Groups/AddGroup";
import Payments from "./views/Payments/Payments";
import AddPayment from "./views/Payments/AddPayment";
import Payment from "./views/Payments/Payment";


function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/dancers/:id" component={Dancer}/>
                <Route path="/dancers" component={Dancers}/>
                <Route path="/addDancer" component={AddDancer}/>
                <Route path="/groups" component={Groups}/>
                <Route path="/addGroup" component={AddGroup}/>
                <Route path="/payments/:id" component={Payment}/>
                <Route path="/payments" component={Payments}/>
                <Route path="/addPayment" component={AddPayment}/>
            </Switch>
        </Router>
    );
}

export default App;
