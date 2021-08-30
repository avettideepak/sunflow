/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  const { pathname } = location;
  // list of routes for the scroll-to-top-hook
  const scrollToTopRoutes = [`/privacy-policy`, `/page-2`,`/interactive-mall-map`, `/solar`, `/roofing`, `/windows-doors`, `/insulation`];
  // if the new route is part of the list above, scroll to top (0, 0)
  if (scrollToTopRoutes.indexOf(pathname) !== -1) {
    window.scrollTo(0, 0);
  }

  return false;
};

exports.onServiceWorkerUpdateReady = () => {
  window.location.reload(true);
};
