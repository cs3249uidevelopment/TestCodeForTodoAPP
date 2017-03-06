import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TodoList from './components/TodoList';
 
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

const todoElement = document.getElementById('container');
ReactDOM.render(<TodoList />, todoElement);