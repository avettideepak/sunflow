/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import "./styles/Modal.css";

const ModalOverlay = props => {
  const content = (
    <div
      className={
        props.noClass ? `${props.className}` : `modal ${props.className}`
      }
      style={props.style}
    >
      {props.noHeader ? null : (
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
      )}

      {props.children}

      {props.noFooter ? null : (
        <footer
          className={
            props.noFooterClass
              ? `${props.footerClass}`
              : `modal__footer ${props.footerClass}`
          }
        >
          {props.footer}
        </footer>
      )}
    </div>
  );
  return content;
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop onClick={props.onCancel} dropDownList={props.dropDownList} />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
