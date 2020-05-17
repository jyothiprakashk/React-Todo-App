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
    };
    
  }
  
  
  addTodo=()=> {
    
    const items={
      id:uuid.v4(),
      value:this.input.current.value,
      description:this.description.current.value,
      date:new Date().toUTCString()
      
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
  
  render() {
    const {todos} = this.state
    return (

      <div className="heading">
      <h2>React Todo</h2>
      <form >
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
          
          <button className="button" onClick={this.addTodo}>Add Todo</button>
          </div>
          </form>
          <ol type="1">
          {todos.length>0 ? (
            
              todos.map((item,index)=>{
               return ( <li key={item.id}>
                <div>{index}</div>
                <div>{item.value}</div>
                <div>{item.description}</div>
                <div>{item.date.slice(0,-3)}</div>
                <button type="button"  className="delete" value="delete" data-key={index} onClick={this.delTodo}><i class="fas fa-trash-alt"></i></button>
                
                </li>
               
               )}
              )
            
          ):(<p className="error">OOPS!!! There is no toDOs in your list</p>)}
            
          </ol>
        
      </div>
    );
  }
}

export default App;


