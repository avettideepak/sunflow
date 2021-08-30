import React from "react";
import CookiePageComponent from "../components/AC-Cookie/CookiePage";

import Layout from "../layout";
import SEO from "../functions/seo";

const CookiePage = () => {
  return (
    <Layout>
      <SEO title="Cookie Page" />
      <CookiePageComponent />
    </Layout>
  );
};

export default CookiePage;
