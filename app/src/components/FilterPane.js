import React, { Component } from 'react';
import { connect } from 'react-redux';

import './filterBody.css'

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import FilterBody from './FilterBody';
import * as actionTypes from '../store/actions';

class FilterPane extends Component {

  /*
    Make a boolean in store, whether results to be displayed are from searchQuery
    Store the search query itself

    Define an action to store search query
  */


  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        value: '',
        popoverOpen: false,
      };
    }

    toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }

    handleChange = (event) => {
       this.setState({value: event.target.value});
     }

   handleSubmit = (event) => {

     this.props.toggleDisplay();
     this.props.searchTermDisplayUpdate();
     this.props.searchTermQueryUpdate(this.state.value);

     this.setState({value: ''});
     event.preventDefault();

   }

    render() {

      let val = 'translateX(-1.2vw)';
      if(this.state.popoverOpen){
        val = 'translateX(-24vw)';

      }

      let temp = 'translate(-100px, 10px)'

      if(this.state.popoverOpen)
        temp = 'translate(-350px, 10px)'

      return (

          <div className={(this.props.move) ? ((!this.props.listView) ? ("filterTabMove") : ("filterTabExtra")) : ("filterTab")}>

          <div style={{transform: temp}}>
          <form onSubmit={this.handleSubmit} id="demo-2">
            <input type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
          </form>
          </div>
          <div style={{transform: "translate(0, 30vh)", padding: "0 0 0 0", zIndex: "999"}}>
              <div style={{transform: val}}>

               <Button className="rotate" style={{ zIndex: "900", width: "180px", height: "35px", color: "black", borderStyle: "solid", borderColor: "black", borderWidth: "5px"}} outline color="info" id={'PopoverFilter'}><div style={{ transform: "translateY(-10px)",  borderTopStyle: "solid", borderColor: "black", borderWidth: "2px"}}><b>_-_-_-_-_-_-_</b></div></Button>

               </div>

               <Popover hideArrow={true} style={{width: '275px', color: "black", transform: "translateX(-0.3vw)"}} placement="right" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                 <PopoverHeader style={{fontWeight: "bold"}}>Data Filter</PopoverHeader>
                 <PopoverBody style={{color: "black", fontWeight: "bold", backgroundColor: "#e0dede"}}><FilterBody showLoop={this.props.showLoop}/></PopoverBody>
               </Popover>
               </div>
          </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        searchTermDisplayUpdate: () => dispatch({type: actionTypes.SEARCH_TERM_DISPLAY}),
        searchTermQueryUpdate: (value) => dispatch({type: actionTypes.SEARCH_TERM_QUERY, val: value}),
        toggleDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
    }
};


const mapStateToProps = state => {
    return {
        listView: state.listView,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FilterPane);
