import React from "react";
import { Router } from "@reach/router";

import Layout from "../layout";
import SEO from "../functions/seo";

import Search from "../components/AC-Search/Search";

const searchPage = () => {
  return (
    <Layout>
      <SEO title="Search" />
      <Search />
    </Layout>
  );
};

export default searchPage;
