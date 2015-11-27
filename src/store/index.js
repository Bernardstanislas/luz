import {createStore, compose, applyMiddleware} from 'redux';
import createNodeLogger from 'redux-node-logger';
import app from '../reducers';

const loggerMiddleware = createNodeLogger({});

const createStoreWithMiddleware = compose(
    applyMiddleware(
        loggerMiddleware
    )
)(createStore);

const store = createStoreWithMiddleware(app);

const unsubscribe = store.subscribe(() => {});

export default store;
