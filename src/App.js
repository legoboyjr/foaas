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
      openModal: false,
      chainsaw: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    axios.get(FOAAS)
      .then(response => {
        const { message } = response.data;
        this.setState({
          openModal: true,
          chainsaw: message
        })
      })
  }

  closeModal() {
    this.setState({ openModal: false });
    console.log("jkghfgjhf")
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
          isOpen={this.state.openModal}>
          <div className="modal-content bg-dark">
            <header className="d-flex justify-content-end modal-header">
              <button className="btn btn-default" onClick={this.closeModal}>X</button>
            </header>
            <div className="d-flex justify-content-center h-100 modal-body">
              <main className="d-flex justify-content-center align-items-center vh-100 flex-grow-1 text-white ">
                <h2 className=""> {this.state.chainsaw}</h2>
              </main>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

export default App;
