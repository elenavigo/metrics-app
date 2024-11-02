import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Update from './pages/update';
import './styles/index.scss';

const App: React.FC = () => {
    return (
        <Router>
            
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/update">CTR</Link>
                    </li>
                    <li>
                        <Link to="/update">Traffic (Number of unique users visiting the site in a day)</Link>
                    </li>
                    <li>
                        <Link to="/update">Conversion metrics (Percentage of users who submitted the form.)</Link>
                    </li>
                    <li>
                        <Link to="/update">Bounce rate</Link>
                    </li>
                </ul>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/update" element={<Update />} />
                {/* Add more routes here */}
            </Routes>
        </Router>
    );
};

export default App;
