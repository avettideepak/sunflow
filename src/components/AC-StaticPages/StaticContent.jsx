import React, { useEffect, useState } from "react";

import Async from "react-code-splitting";

import * as Content from "./Content.js";
import { staticContents } from "./StaticRoutes.js";

import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";

const Footer = () => <Async load={import("../AC-Footer/Footer.jsx")} />;

let interval = "";

function StaticContent(props) {
  const [form, setForm] = useState(null);
  const location = useLocation();
  let link = location.pathname.split("/");
  if (link[link.length - 1] == "") {
    link = link[link.length - 2];
  } else {
    link = link[link.length - 1];
  }

  let indexLocation;

  let content = staticContents.filter((fil, index) => {
    if (fil[1] == link) {
      indexLocation = index;
      return true;
    } else {
      return false;
    }
  })[0][0];

  const includeScripts = () => {
    let scripts = Content.scripts[content] || [];
    if (typeof window !== undefined)
      return scripts.map((script, index) => (
        <script defer key={index}>
          {script}
        </script>
      ));
    else return null;
  };

  useEffect(() => {
    if (
      window !== undefined &&
      window.location.pathname.includes("seller-registration")
    ) {
      window.scrollTo(0, 0);
      interval = setInterval(checkFunc, 500);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== undefined) {
      const contentWrapper = document.getElementById("static-content--content");
      if (form && contentWrapper) {
        //document.head.removeChild(form);
        contentWrapper.append(form);
        window.clearInterval(interval);
      }
      console.log("borop hbspt", contentWrapper, form);
    }
  }, [form]);

  console.log("borop hbspt interval --", interval);

  const checkFunc = () => {
    console.log("borop hbspt interval1", form);

    if (document !== undefined && form === null) {
      let form = document.querySelector(".hbspt-form");
      console.log("borop hbspt interval", form);

      if (form) {
        setForm(form);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>{staticContents[indexLocation][2]}</title>
        <meta name="description" content={staticContents[indexLocation][2]} />
        {includeScripts()}
      </Helmet>
      <div
        id="static-content--content"
        dangerouslySetInnerHTML={{ __html: Content[content] }}
      />
    </div>
  );
}

export default StaticContent;
