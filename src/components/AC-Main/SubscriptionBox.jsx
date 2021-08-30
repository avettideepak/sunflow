import React, { Component } from "react";
import Mailchimp from "react-mailchimp-form";

import { I18nContext } from "@/i18n/index";

function SubscriptionBox() {
  const { translate } = React.useContext(I18nContext);

  const messages = {
    sending: translate(`mailchimp.sending`),
    success: translate(`mailchimp.thanksForSub`),
    error: translate(`mailchimp.error`),
    empty: translate(`mailchimp.email`),
    duplicate: translate(`mailchimp.tooManySub`),
    button: translate(`mailchimp.SubButtonText`)
  };

  return (
    <div className="newsletter-wrapper">
      <div className="newsletter-content">
        <h3>{translate("Newsletter")}</h3>
        <p>{translate("Subcribemessage1")}</p>
      </div>

      <div className="mailchimp-wrapper">
        <Mailchimp
          action="https://avetti.us3.list-manage.com/subscribe/post?u=da8315439c80632c2724f5038&amp;id=5082b0351b"
          fields={[
            {
              name: "EMAIL",
              placeholder: translate("Email"),
              type: "email",
              required: true
            }
          ]}
          className="mailchimp-subscribe"
          messages={messages}
        />
      </div>
    </div>
  );
}

export default SubscriptionBox;
