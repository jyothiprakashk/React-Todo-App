// import './App.css';
// import React from 'react'

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state={
//       todos:[],
//       text:''
//     }
//     this.handleChange=this.handleChange.bind(this)
//     this.handleSubmit=this.handleSubmit.bind(this)
//   }
//   handleChange(e) {
//     this.setState({
//       text:e.target.value
//     })
//   }
//   handleSubmit(event) {
//     event.preventDefault()
//     let todos=this.state.todos
//     let text=this.state.text
//     todos.push(text)
//     this.setState({
//       todos:todos,
//       text:''
//     })
//   }
//  render() {
//    return (
//      <div>
//         <form onSubmit={this.handleSubmit}>
//           <input placeholder="add Todo" value={this.state.text} onChange={this.handleChange} />
//           <button type="submit">add todo</button>
//         </form>
//         <h1>{this.state.todos.map((todo)=> {
//           return <li key={todo}>{todo}</li>
//         })}</h1>
//      </div>
//    );
//  }
// }

// export default App