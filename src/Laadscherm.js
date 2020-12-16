import React, { Component } from 'react';
import './style.css'
class Laadscherm extends Component {
    state = {  }
    render() { 
        return ( <p>  <h1> Scans worden momenteel uitgevoerd </h1> 
                <img src="/img/laadicoon.png"></img>
                <h2>  Een ogenblik geduld alstublieft </h2>
                <h3>  'Dynamische tekst, scans die worden uitgevoerd' </h3>
                </p> );
    }
}
 
export default Laadscherm;


