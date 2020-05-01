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
          
          <button onClick={this.addTodo}>Add Todo</button>
          </div>
          </form>
          <ol type="1">
            {
              this.state.todos.map((item,index)=>{
               return ( <li key={item.id}>
                <div>{item.value}</div>
                <div>{item.description}</div>
                <div>{item.date}</div>
                <button type="button"  value="delete" data-key={index} onClick={this.delTodo}>X</button>
                
                </li>
               
               )}
              )
            }
          </ol>
        
      </div>
      // </div>
    );
  }
}

export default App;


