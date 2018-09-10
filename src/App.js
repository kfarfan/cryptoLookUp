import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'Ethereum'
class App extends Component {

constructor(props){
  super(props);
  this.state = {
    result: null,
    searchTerm: DEFAULT_QUERY,
  }
  this.check = this.check.bind(this);
  this.searched = this.searched.bind(this);
}


setSearch (result) {
  this.setState({ result });
}

componentDidMount () {

  fetch(`https://www.worldcoinindex.com/apiservice/getmarkets?key=EQG0HJ9aCV8A7igInbBnaeSaJy0FBz&fiat=btc`)
  .then(response => response.json())
  .then(result => this.setSearch(result))
  .catch(error => error);
}



searched (e) {
  this.setState({searchTerm: e.target.value});
}


check () {
  console.log(this.state.result);
}

searchedFor = (searchTerm) => {
  return  (item) => {
    return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


  render() {
    const { result, searchTerm} = this.state;
    return (
      
      <div className="App">

      <input 
      type="text"
      value={searchTerm}
      onChange={this.searched}
      />
      { result ?
      <div>
        {result.Markets[0].filter(this.searchedFor(searchTerm)).map(item => {
          return (
            <div className='table' key={item.Name+1}>
              <div className='table-row'>
                <span>Name: {item.Name}</span>
                <span style={{width: `40%`}}>Price: {item.Price}</span>
              </div>
            </div>
          )
        })}

      </div> : null}
      </div>
    );
  }
}





export default App;

