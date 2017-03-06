import React from 'react';

//Component : Title 
//Prop : todoCount
const Title = React.createClass({	
	render: function() {
		  return (
			<div>
			   <div>
				  <h1>to-do ({this.props.todoCount})</h1>
			   </div>
			</div>
		 );
	}
});

//Component: TodoForm
//Prop : addTodo
const TodoForm = React.createClass({
	render: function() {
		let input;
		return (
			    <form onSubmit={(e) => {
					e.preventDefault();
					this.props.addTodo(input.value);
					input.value = '';
				}}>
					<input  ref={node => {input = node;}}/>
					<br />
				</form>
		);
	}
});

const Todo =  React.createClass({
	render: function() {
		 return (
			<li>
				<a href="#" className="list-group-item" onClick={() => {this.props.remove(this.props.todo.id)}}>{this.props.todo.text}</a>
			</li>
		);
	}
});

const TodoList = React.createClass({
	render: function() {
		// Map through the todos
		const todoNode = this.props.todos.map((todo) => {
			return (<Todo todo={todo} key={todo.id} remove={this.props.remove}/>);
		});
		
		return (
			<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>
		);
  }
}); 

// Container Component
// Todo Id
window.id = 0;

class TodoApp extends React.Component{
	constructor(props){
		// Pass props to parent class
		super(props);
		// Set initial state
		this.state = {
			data: []
		}
		this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
	}
	
	// Lifecycle method
	// When the component is mounted, this method will be called automatically
	// Please have a look at the site as below
	// https://facebook.github.io/react/docs/react-component.html#componentdidmount
	componentDidMount(){
		// Make HTTP reques with Axios
		axios.get(this.apiUrl).then((res) => {
			// Set state with result
			this.setState({data:res.data});
		});
	}
	
	// Add todo handler
	addTodo(val){
		// Assemble data
		const todo = {text: val}
		// Update data
		axios.post(this.apiUrl, todo).then((res) => {
			this.state.data.push(res.data);
			this.setState({data: this.state.data});
       });
	}
  
	// Handle remove
	handleRemove(id){
		// Filter all todos except the one to be removed
		const remainder = this.state.data.filter((todo) => {
			if(todo.id !== id) return todo;
		});
    
		// Update state with filter
		axios.delete(this.apiUrl+'/'+id).then((res) => {
			this.setState({data: remainder});
		})
	}
 
	render(){
		// Render JSX
		return (
		<div>
			<Title
				//passing state date to a child as props
				todoCount={this.state.data.length}
			/>
			<TodoForm
				//passing state date to a child as props
				addTodo={this.addTodo.bind(this)}
			/>
			<TodoList 
				//passing state date to a child as props
				todos={this.state.data} 
				remove={this.handleRemove.bind(this)}
			/>
		</div>
    );
  }
}

export default TodoApp;