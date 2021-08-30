import React, { useState, useEffect } from "react";
import Footer from "../AC-Footer/Footer";
//import { useQuery } from "@apollo/react-hooks";
import { GET_NODE_PAGE_BY_URL } from "../../graphql-queries";

export default function AboutComponent() {
  /* const aboutUsStyle = {
    margin: "50px 150px 80px 150px",
    fontSize: "1.25rem",
    lineHeight: "1.8",
    fontWeight: "300"
  };

  const [dataFromDrupal, setDataFromDrupal] = useState("");

  const { loading, error, data } = useQuery(GET_NODE_PAGE_BY_URL, {
    variables: { path: "/about" }
  });
  useEffect(() => {
    if (!error && !loading) {
      setDataFromDrupal(
        data.route.entity.body.value
          .replace(
            /\/sites\/default\/files.*?/g,
            process.env.REACT_APP_AMAZON_IMAGES_BUCKET
          )
          .replace(/.png/g, ".webp")
          .replace(
            /img /g,
            "embed fill='#FF0000' onerror=\"this.onerror=null; this.color='rgb(75, 125, 222)'; this.src='https://s3.ca-central-1.amazonaws.com/demob2b2cs3.avetti.ca/inline-images/three-dots.svg'\""
          )
      );
    }
  }, [data, error, loading]);

  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log(dataFromDrupal); */
  return (
    <React.Fragment>
      {/* <div style={aboutUsStyle}>
        <h1>
          <div
            dangerouslySetInnerHTML={{ __html: data.route.entity.entityLabel }}
          />
        </h1>
        <div className="about-block" id="about">
          <div dangerouslySetInnerHTML={{ __html: dataFromDrupal }} />
        </div>
      </div>
      <Footer /> */}
    </React.Fragment>
  );
}
