import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import Layout from './shared/layout';
import { routes } from './routes';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {routes.map(({ path, element: Element }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))}
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
