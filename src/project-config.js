/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
export const VID = process.env.GATSBY_VID;
const PREVIEW_PROJECT_LINK = process.env.GATSBY_PREVIEW_PROJECT_LINK;
const PUBLISH_PROJECT_LINK = process.env.GATSBY_PUBLISH_PROJECT_LINK;
export const IS_PUBLISHED =
  process.env.GATSBY_IS_PUBLISHED == "true" ? true : false;
export const PREVIEW = IS_PUBLISHED ? "" : "/preview";
const STORE_LINK_ROOT = process.env.GATSBY_MAIN_LINK;

export const PROJECT_LINK = IS_PUBLISHED
  ? PUBLISH_PROJECT_LINK
  : PREVIEW_PROJECT_LINK;
export const SOLE_PROJECT_LINK = PUBLISH_PROJECT_LINK;
export const STORE_LINK = STORE_LINK_ROOT + PREVIEW + "/store";

const locationFunc = () => {
  let location;
  let link;
  let preview;
  if (IS_PUBLISHED) {
    preview = "";
    link = PUBLISH_PROJECT_LINK;
  } else {
    preview = "/preview";
    link = PREVIEW_PROJECT_LINK;
  }

  if (
    typeof window !== "undefined" &&
    window.location.host.includes("localhost")
  ) {
    location = link;
  } else {
    location = preview;
  }

  return location;
};

export const LINK_DISTRIBUTION = locationFunc();
