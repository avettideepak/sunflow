import { PREVIEW, PROJECT_LINK } from "../../project-config";

export default function footerContent(langState, isLoggedIn) {
  let langCode = langState == "en" || langState == "tr" ? "" : `/${langState}`;

  const hideIfLoggedIn = () => {
    if (isLoggedIn) return { style: { display: isLoggedIn ? "none" : "" } };
    return {};
  };

  return {
    about: [
      {
        parent: { attributes: {} },
        children: [
          {
            attributes: {
              to: `/`
            },
            text: "Services"
          },
          {
            attributes: {
              to: `/interactive-mall-map`
            },
            text: "Mall Map"
          },
          {
            attributes: {
              to: `/`
            },
            text: "Gift Card"
          },
          {
            attributes: {
              to: `/`
            },
            text: "The Lounge"
          }
        ]
      }
    ],

    shop: [
      {
        parent: { attributes: {} },
        children: [
          {
            attributes: {
              to: `/`
            },
            text: "About The Mall"
          },
          {
            attributes: {
              to: `/`
            },
            text: "How to get there"
          },
          {
            attributes: {
              to: `/`
            },
            text: "Media center"
          },
          {
            attributes: {
              to: `/`
            },
            text: "Careers"
          }
        ]
      }
    ],
    info: [
      {
        parent: { attributes: {} },
        children: [
          {
            attributes: {
              to: `/`
            },
            text: "Trending"
          },
          {
            attributes: {
              to: `/`
            },
            text: "What's New"
          },
          {
            attributes: {
              to: `/`
            },
            text: "Newsletters"
          },
          {
            attributes: {
              to: `/`
            },
            text: "Customer Support"
          }
        ]
      }
    ],
    socialMedia: [
      {
        parent: { attributes: { className: "socialMedia" } },
        children: [
          {
            attributes: {
              target: "_blank",
              href: "https://www.facebook.com/",
              rel : "noopener noreferrer"
            },
            image: `Facebook`
          },
          {
            attributes: {
              target: "_blank",
              href: "https://www.linkedin.com/",
              rel : "noopener noreferrer"
            },
            image: `Instagram`
          },

          // {
          //   attributes: {
          //     target: "_blank",
          //     href: "https://www.twitter.com/avetticom",
          //     rel : "noopener noreferrer"
          //   },
          //   image: `Twitter`
          // }
        ]
      }
    ]
  };
}
