import React from "react";
import './App.css';
import uuid from 'uuid';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.input=React.createRef();
    this.description=React.createRef();
    this.state = {
      todos:[],
      error:false,
      completed:false
    };
    
  }
  
  
  addTodo=(e)=> {
    e.preventDefault()
    
    const items={
      id:uuid.v4(),
      value:this.input.current.value,
      description:this.description.current.value,
      date:new Date().toUTCString(),
      completed:false
      
    }
    if (!items.value && !items.description) return <p>Please fill the requored fields</p>;
    if (localStorage.getItem("todo_add")==null) {
      const todos=[]
      todos.push(items);
      localStorage.setItem("todo_add",JSON.stringify(todos))
    }
    
    else {
      const todos=JSON.parse(localStorage.getItem("todo_add"))
      todos.push(items)
      localStorage.setItem("todo_add",JSON.stringify(todos))
    }
    this.setState({
      todos:JSON.parse(localStorage.getItem('todo_add')),value:''
  });
  }
  componentDidMount() {
    const data=JSON.parse(localStorage.getItem("todo_add"))
    if (data==null) {
      return false

    }else {
      this.setState({
        todos:data,
        value:''
      })
    }

  }
  delTodo=(event)=> {
    let index=event.target.getAttribute("data-key")
    console.log(event.target)
    console.log(index)
    var listdata=JSON.parse(localStorage.getItem("todo_add"))
    listdata.splice(index,1)
    this.setState({todos:listdata})
    localStorage.setItem("todo_add",JSON.stringify(listdata))
  
  }
  // Click=(event)=> {
  //   console.log(event)
  //   const complete=this.state.todos
  //   console.log(complete)
  //   for (let i=0;i<complete.length;i++) {
  //     const data=complete[i].completed=
  //     this.setState({completed:data})
  //   }
    

  // }
  toggleChange=(id)=> {
    this.setState({ todos:this.state.todos.map(todo=> {
      if (todo.id===id) {
        todo.completed=!todo.completed
      }
      return todo;
    })})
  }
  render() {
    const {todos} = this.state
    console.log(this.state.todos)
    return (

      <div className="heading">
      <h2>React Todo</h2>
      <form onSubmit={this.addTodo}>
      <div className="container">
        <label >Title</label>
          <input
            placeholder="Title"
            type="text"
            name="title"
            ref={this.input}
          />
          <label>Description</label>
          <input
            placeholder="Description"
            type="text"
            name="description"
            ref={this.description}
          />
          
          <button className="button">Add Todo</button>
          </div>
          </form>
          <hr />
          {todos.length>0 ? (
            
              todos.map((item,index)=>{
               return ( <li key={item.id}>
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.toggleChange.bind(this,item.id)}
            />
                <div className="title-desc" style={{textDecoration:item.completed ? 'line-through' : ''}}>
                  <div className="title">{item.value}</div>
                  <div>{item.description}</div>
                </div>
                <div className="date-del">
                <div className="title-desc" style={{textDecoration:item.completed ? 'line-through' : ''}}>{item.date.slice(4,-15)}</div>
                <button type="button"  className="delete" value="delete" data-key={index} onClick={this.delTodo}>Delete</button>
                </div>
                </li>
               
               )}
              )
            
          ):(<p className="error">OOPS!!! There is no toDOs in your list</p>)}
            
        
      </div>
    );
  }
}

export default App;


