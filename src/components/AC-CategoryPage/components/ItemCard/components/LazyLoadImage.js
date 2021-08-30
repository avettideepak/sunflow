import React, { Component } from "react";
import VisibilitySensor from "./VisibilitySensor";

class LazyloadImage extends Component {
  render() {
    let srcSetAttributeValue = "";
    let sanitiseImageSrc = this.props.src.replace(" ", "%20");

    // Iterate through the array of values from the "srcsetSizes" array property.
    if (
      this.props.srcsetSizes !== undefined &&
      this.props.srcsetSizes.length > 0
    ) {
      for (let i = 0; i < this.props.srcsetSizes.length; i++) {
        srcSetAttributeValue += `${sanitiseImageSrc}?tr=${
          this.props.product ? "" : "ar-1-1"
        },dpr-2,f-auto,w-${this.props.srcsetSizes[i].imageWidth} ${
          this.props.srcsetSizes[i].viewPortWidth
        }w`;

        if (this.props.srcsetSizes.length - 1 !== i) {
          srcSetAttributeValue += ", ";
        }
      }
    }

    return (
      <VisibilitySensor
        key={sanitiseImageSrc}
        delayedCall={true}
        partialVisibility={true}
        once
      >
        {({ isVisible }) => (
          <>
            {isVisible ? (
              <img
                src={`${sanitiseImageSrc}?tr=${
                  this.props.product ? "" : "ar-1-1"
                },dpr-2,f-auto,w-${this.props.widthPx}`}
                className={this.props.classFun}
                alt={this.props.alt}
                sizes={this.props.sizes}
                srcSet={srcSetAttributeValue}
                onClick={this.props.onClickFun ? this.props.onClickFun : null}
              />
            ) : (
              <img
                src={`${sanitiseImageSrc}?tr=${
                  this.props.product ? "" : "ar-1-1"
                },dpr-2,f-auto,w-${this.props.widthPx}`}
                className={this.props.classFun}
                alt={this.props.alt}
                sizes={this.props.sizes}
                srcSet={srcSetAttributeValue}
                onClick={this.props.onClickFun ? this.props.onClickFun : null}
              />
            )}
          </>
        )}
      </VisibilitySensor>
    );
  }
}

export default LazyloadImage;
