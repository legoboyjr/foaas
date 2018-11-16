import React, { Component } from 'react';
import './App.css';
import Cartoon from './Cartoon.jpg';
import Modal from "react-modal";
import axios from 'axios';

const appElement = document.getElementById('root');
Modal.setAppElement(appElement);

const isDev = process.env.NODE_ENV !== 'production';
//FOAAS
const FOAAS = isDev ? '/chainsaw/john/:Alexander' : 'http://foaas.com/chainsaw/:name/:from';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalIsOpen: false,
      chainsaw: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    axios.get(FOAAS)
    .then(response => {
      console.log(response.data)
      const { message } = response.data;
      this.setState({
        modalOpen: true,
        chainsaw: message
      })
    })
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
        <button className="d-flex w-25 " onClick={this.openModal}>
              <img src={Cartoon} className="img-thumbnail" alt="..." />
        </button>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.modalOpen}
          onRequestClose={this.handleModalCloseRequest}>
           <div className="d-flex justify-content-center h-100">
          <main className="d-flex justify-content-center align-items-center vh-100 flex-grow-1">
            <h2 className="bg-dark text-white">{this.state.chainsaw}</h2>
          </main>
         </div>
        </Modal>
      </div>
          );
        }
      }
      
      export default App;
