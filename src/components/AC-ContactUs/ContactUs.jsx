/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ContactUs() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [openError, setOpenError] = React.useState(false);
  const [snackstate, setSnackState] = React.useState({
    vertical: 'bottom',
    horizontal: 'left',
  });
  const { vertical, horizontal } = snackstate;

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const loginNameState = useSelector(
    (state) => state.loginReducer.loginName,
    shallowEqual
  )

  const handleLogin = () => {
    document.getElementById("login-icon-btn").click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const str = $("#requestQuote").serialize();
    // Get the form
    let form = document.querySelector('#contactForm');

    // Get all field data from the form
    let data = new FormData(form);

    // Convert to a query string
    let queryString = new URLSearchParams(data).toString();
    setIsLoading(true);
    fetch("https://script.google.com/macros/s/AKfycbx7ro_fdCZcQR_lWeHu11OYKqJnJsY723TbPliN3Ofw6HM75UspAEV28LViVyEPsUDmxQ/exec", {
      method: 'POST',
      mode: 'no-cors',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString
    }).then(response => {
      setIsLoading(false);
      setOpen(true);
      // $(".rfq-form").trigger("reset");
      document.getElementById("contactForm").reset();
      return response;
    }).catch(err => {
      console.log(err);
      setOpenError(true);
    });

  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleClose} severity="success">
          Contact form has been submitted successfully!!!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError} anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleCloseError} severity="error">
          Failed to send your message!!!
        </Alert>
      </Snackbar>
      <div className="bgimage">
        <div className="cat-name">Contact Us</div>
      </div>
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="">
          <div className="col-md-4">
            <div className="ab_text-title fl-wrap">
              <h3>Get in Touch</h3>
              <span className="section-separator fl-sec-sep"></span>
            </div>
            <div className="box-widget-item fl-wrap block_box">
              <div className="box-widget">
                <div className="box-widget-content bwc-nopad">
                  <div className="list-author-widget-contacts list-item-widget-contacts bwc-padside">
                    <ul className="no-list-style">
                      <li><span><i className="im im-icon-Map-Marker2 mr-c"></i> Address :</span> <a href="#singleMap" className="custom-scroll-link">Yesilkoy Mah. Ataturk Cad. IDTM, A2 Blok No: 10 K: 12 Office 376 Yesilkoy - Istanbul</a></li>
                      <li><span><i className="im im-icon-Telephone mr-c"></i> Phone :</span> <a href="tel:+90 212 465 03 00">+90 212 465 03 00</a></li>
                      <li><span><i className="im im-icon-Fax mr-c"></i> Fax :</span> <a href="#">+90 212 465 03 01</a></li>
                      <li><span><i className="im im-icon-Email mr-c"></i> Mail :</span> <a href="#">bilgi@starter.com</a></li>
                    </ul>
                  </div>
                  <div className="list-widget-social bottom-bcw-box  fl-wrap">
                    <ul className="no-list-style">
                      <li><a href="https://www.facebook.com/starter/" target="_blank">
                        <i className="im im-icon-Facebook mr-c"></i>
                      </a>
                      </li>

                      <li><a href="https://twitter.com/starter" target="_blank">
                        <i className="im im-icon-Twitter mr-c"></i>
                      </a></li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="col-md-8">

            <div className="ab_text">

              <div className="ab_text-title fl-wrap">
                <h3>Contact Form</h3>
                <span className="section-separator fl-sec-sep"></span>
              </div>

              <div id="contact-form">
                <div id="message"></div>
                <form className="custom-form" noValidate onSubmit={handleSubmit} method="post" id="contactForm" name="contactForm">
                  <fieldset>
                    <label><i className="im im-icon-Checked-User"></i></label>
                    <input type="text" name="name" placeholder="Your Name *" required="" />
                    <label><i className="im im-icon-Email"></i>  </label>
                    <input type="email" name="email" placeholder="Email Address*" required="" />
                    <textarea name="message" cols="40" rows="3" placeholder="Your Message:" required=""></textarea>
                  </fieldset>
                  <button type="submit" disabled={isLoading} id="contactFormButton" className="btn  color2-bg  float-btn" >
                    <span> Send Message
                      {/* <i className="fal fa-paper-plane"></i> */}
                    </span>
                    {
                      isLoading && <CircularProgress className="rfq-btn-c" color="secondary" style={{ width: "30px", height: "30px" }} />
                    }
                    {/* <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div> */}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="ab_text-title fl-wrap">
              <h3>Google Map</h3>
              <span className="section-separator fl-sec-sep"></span>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6023.551868598472!2d28.83045!3d40.986387!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa36ed7fb21e5%3A0xfbb4e107f2408737!2zWWXFn2lsa8O2eSwgRMO8bnlhIFRpY2FyZXQgTXJrLiwgMzQxNDkgQmFrxLFya8O2eS_EsHN0YW5idWw!5e0!3m2!1sen!2str!4v1617186393515!5m2!1sen!2str" width="100%" height="450" frameborder="0" style={{ border: "0" }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
