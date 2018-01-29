import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './common';
import MessageReport from './messages/MessageReport';




const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={MessageReport} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;