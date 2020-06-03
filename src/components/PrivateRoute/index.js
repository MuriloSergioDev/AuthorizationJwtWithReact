import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { Container } from './styles';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest}) {

    const auth = useSelector(state => state.auth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />);
}

export default PrivateRoute;