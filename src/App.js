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
  this.deleteItem = this.deleteItem.bind(this);
}


setSearch (result) {
  this.setState({ result });
}

componentDidMount () {

  fetch(`https://www.worldcoinindex.com/apiservice/getmarkets?key=EQG0HJ9aCV8A7igInbBnaeSaJy0FBz&fiat=btc`)
  .then(response => response.json())
  .then(result => this.setSearch(result.Markets[0]))
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

deleteItem (id) {
  const updated = this.state.result.filter(item => item.Name !== id);
  this.setState({result : {...this.state.result, Name: updated}});
}


  render() {
    const { result, searchTerm } = this.state;
    return (
      
      <div className="page">
      <input 
      type="text"
      value={searchTerm}
      onChange={this.searched}
      placeholder="Crypto search"
      />
      <div className="interactions">
      { result ?
      <div>
        {result.filter(this.searchedFor(searchTerm)).map(item => {
          return (
            <div className='table' key={item.Name}>
              <div className='table-row'>
                <span style={{width: `40%`}}>Name: {item.Name}</span>
                <span style={{width: `20%`}}>Price: {item.Price}</span>
                <span>
                  <button onClick={() => this.deleteItem(item.Name)}>
                    Delete
                  </button>
                </span>
              </div>
            </div>
          )
        })}

      </div> : null}
      </div>
      </div>
    );
  }
}





export default App;

