import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import LazyLoad from "react-lazyload";
import "./Styles/ImageCarousel.css";
import { setProductImagecarouselInitialAction } from "../../../../redux/actions/productAction";
import { usePrevious } from "../../../../functions/Utilities";
import PinchToZoom from "react-pinch-and-zoom";
import LazyloadImage from "../../../AC-CategoryPage/components/ItemCard/components/LazyLoadImage";

import ShareButtons from "../ShareButtons/ShareButtons";
import ShareIcon from "@material-ui/icons/Share";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const areEqual = (prevProps, nextProps) => {
  console.info("borop rerender", nextProps);
  return nextProps.productImageSwitch == false;
};

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

const ImageCarousel = React.memo(function ImageCarousel(props) {
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState("");

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "share-popover" : undefined;

  const [mainImageUrl, setMainImageUrl] = useState(
    "https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/"
  );

  const [wholeImageUrl, setWholeImageUrl] = useState("");
  const [galleryImagesCount, setGalleryImagesCount] = useState([]);
  const [sysNumImages, setSysNumImages] = useState(0);
  const [mouseMoved, setMouseMoved] = useState(false);

  const productImageSwitchState = props.productImageSwitch;

  const productPageImageCarouselInitialState = useSelector(
    state => state.productReducer.productPageImageCarouselInitial,
    shallowEqual
  );

  console.log(
    "farop state",
    props,
    mainImageUrl,
    productImageSwitchState,
    productPageImageCarouselInitialState,
    wholeImageUrl
  );

  const productInitialState = useSelector(
    state => state.productReducer.product,
    shallowEqual
  );

  const productCode = useSelector(
    state => state.productReducer.itemDetail.code,
    shallowEqual
  );

  const loadingState = useSelector(
    state => state.productReducer.loading,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const hiddenPropertiesState = useSelector(
    state => state.productReducer.itemDetail.hiddenProperties,
    shallowEqual
  );

  const mainItemIdState = useSelector(
    state => state.productReducer.itemDetail.mainitemid,
    shallowEqual
  );

  const itemIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const itemTitleState = useSelector(
    state => state.productReducer.itemDetail.title,
    shallowEqual
  );

  const previousItemIdState = usePrevious(
    Object.assign({}, { itemIdState, itemTitleState })
  );

  const propertiesState = useSelector(
    state => state.productReducer.itemDetail.properties,
    shallowEqual
  );

  console.info("borop rerender2", productImageSwitchState);

  useEffect(() => {
    console.info("farop prev", previousItemIdState, itemIdState);
    if (
      previousItemIdState &&
      previousItemIdState.itemIdState != undefined &&
      previousItemIdState.itemIdState != itemIdState
    ) {
      if (previousItemIdState.itemTitleState == itemTitleState)
        dispatch(setProductImagecarouselInitialAction(false));
    }
  }, [previousItemIdState]);

  useEffect(() => {
    if (productImageSwitchState || productPageImageCarouselInitialState) {
      console.info("borop rerender3", productImageSwitchState);

      setMainImage(productCode);
    }
  }, [productCode]);

  const handleImageChange = (img, condition) => {
    console.info("handleImageChange", img, condition);
    setMainImage(img);

    if (condition) {
      setMainImageUrl(
        "https://ik.imagekit.io/ofb/dev/store/20180521148/assets/largeimages/galleries/"
      );
    } else {
      setMainImageUrl(
        "https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/"
      );
    }
  };

  useEffect(() => {
    if (productImageSwitchState || productPageImageCarouselInitialState) {
      setMainImageUrl(
        "https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/"
      );
    }
  }, [itemIdState]);

  useEffect(() => {
    if (
      mainImage &&
      mainImageUrl
      /*   (mainImage && productImageSwitchState) ||
      (productPageImageCarouselInitialState && propertiesState) */
    ) {
      setWholeImageUrl(
        `${mainImageUrl}${mainImage}.jpg?tr=dpr-2,f-auto,w-200`
      );
    }
  }, [mainImage, mainImageUrl]);

  useEffect(() => {
    console.info("borop image", productImageSwitchState, propertiesState);
    if (
      (propertiesState && productImageSwitchState) ||
      (productPageImageCarouselInitialState && propertiesState)
    ) {
      let tempNumber = propertiesState.filter(prop => {
        if (prop.propname === "Sys_Gallery_Images") {
          return true;
        } else {
          return false;
        }
      });

      tempNumber = tempNumber && tempNumber[0] && tempNumber[0].propvalue;
      let tempArray = [];

      for (let i = 1; i < Number(tempNumber); i++) {
        tempArray.push(i);
      }
      console.info("tempArray", tempArray);

      setGalleryImagesCount(tempArray);
    }
  }, [propertiesState]);

  useEffect(() => {
    console.info("borop image2", productImageSwitchState);

    if (
      (hiddenPropertiesState && productImageSwitchState) ||
      (productPageImageCarouselInitialState && hiddenPropertiesState)
    ) {
      let prop = hiddenPropertiesState.find(prop => {
        return prop.propname == "Sys_Num_Images";
      });
      if (parseInt(prop.propvalue) >= 1) {
        setSysNumImages(parseInt(prop.propvalue));
      }
    }
  }, [hiddenPropertiesState]);

  let renderMagnifier = "";

  const handleMouseMove = () => {
    setMouseMoved(true);
  }

  if (isMobileState && wholeImageUrl) {
    renderMagnifier = (
      <div className="mobile-magnifier-conainer">
        <TransformWrapper>
          <TransformComponent>
            <img
              src={
                mainImageUrl.includes("demob2b2c.avetti")
                  ? `${wholeImageUrl}`
                  : wholeImageUrl.replace("/images", "/largeimages")
              }
              alt={`${productInitialState.title}`}
            ></img>
          </TransformComponent>
        </TransformWrapper>
      </div>
    );
  } else if (wholeImageUrl) {
    renderMagnifier = (
      <MagnifierContainer className="magnifier-container">
        <label className="sr-only" for="image">
          Product Image
        </label>
        <div className="magnifier-preview-wrapper">
          <MagnifierPreview
            className="magnifier-preview"
            cursorStyle={mouseMoved ? 'crosshair' : 'default'}
            overlayOpacity={mouseMoved ? 0.5 : 0}
            imageSrc={wholeImageUrl.replace("/images", "/largeimage")}
            imageAlt={`${productInitialState.title}`}
          />
        </div>
        {mouseMoved &&
        <div className="magnifier-zoom-wrapper">
          <MagnifierZoom
            className="magnifier-zoom"
            imageSrc={wholeImageUrl.replace("w-200", "w-500")}
          />
        </div>
        }
      </MagnifierContainer>
    );
  } else {
    if (isMobileState) {
      renderMagnifier = (
        <div className="mobile-magnifier-conainer">
          <TransformWrapper>
            <TransformComponent>
              <img
                src={
                  props.data
                    ? mainImageUrl +
                    props.data.productCode +
                    "jpg?tr=dpr-2,f-auto,w-500"
                    : mainImageUrl +
                    productCode +
                    "jpg?tr=dpr-2,f-auto,w-500"
                }
                alt={props.title ? props.title : productInitialState.title}
              ></img>
            </TransformComponent>
          </TransformWrapper>
        </div>
      );
    } else {
      renderMagnifier = (
        <MagnifierContainer className="magnifier-container">
          <div className="magnifier-preview-wrapper">
            <MagnifierPreview
              className="magnifier-preview"
              cursorStyle={mouseMoved ? 'crosshair' : 'default'}
              overlayOpacity={mouseMoved ? 0.5 : 0}
              imageSrc={
                props.data
                  ? mainImageUrl +
                  props.data.productCode +
                  ".jpg?tr=dpr-2,f-auto,w-200"
                  : mainImageUrl +
                  productCode +
                  ".jpg?tr=dpr-2,f-auto,w-200"
              }
              imageAlt={props.title ? props.title : productInitialState.title}
            />
          </div>
          {mouseMoved &&
          <div className="magnifier-zoom-wrapper">
            <MagnifierZoom
              className="magnifier-zoom"
              imageSrc={
                props.data
                  ? mainImageUrl +
                  props.data.productCode +
                  ".jpg?tr=dpr-2,f-auto,w-500"
                  : mainImageUrl +
                  productCode +
                  ".jpg?tr=dpr-2,f-auto,w-500"
              }
            />
          </div>
          }
        </MagnifierContainer>
      );
    }
  }

  console.info("borop img url", wholeImageUrl);


  

  const renderGalleryImages = () => {
    console.info("gallery images", galleryImagesCount, sysNumImages);
    if (galleryImagesCount.length > 0 && mainItemIdState == 0) {
      return galleryImagesCount.map(num => (
        <li key={num}>
          <LazyLoad>
            <LazyloadImage
              classFun="img-thumb"
              src={`https://ik.imagekit.io/ofb/dev/store/20180521148/assets/largeimages/galleries/${productCode}-${num}.jpg`}
              widthPx={200}
              srcsetSizes={[
                { imageWidth: 200, viewPortWidth: 992 },
                { imageWidth: 340, viewPortWidth: 768 },
                { imageWidth: 170, viewPortWidth: 500 }
              ]}
              alt={""}
              onClickFun={() => {
                console.info("galley image clicked", productCode);
                handleImageChange(`${productCode}-${num}`, "gallery");
              }}
              product
            />
          </LazyLoad>
        </li>
      ));
    } else if (sysNumImages > 0) {
      return [...Array(sysNumImages)].map((e, num) => {
        if (num > 0) {
          return (
            <li key={num}>
              <LazyLoad>
                <img
                  className="img-thumb"
                  src={`https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${productCode}-${num + 1}.jpg?tr=w-164,h-auto,dpr-2,f-auto`}
                  alt=""

                  onClick={() => {
                    console.info("sysnum image clicked", productCode);

                    handleImageChange(`${productCode}-${num + 1}`);
                  }}
                />
              </LazyLoad>
            </li>
          );
        }
      });
    }
  };
  console.info("imageCarousel", galleryImagesCount.length, " ", sysNumImages);
  console.info("farop img check", loadingState, wholeImageUrl, itemIdState);

  return (
    <div id="imageGrid" onMouseMove={mouseMoved ? null : handleMouseMove}>
      {isMobileState && (
        <>        
          {/* <div className="shareIcon" onClick={handleClick}>
            <ShareIcon />
          </div> */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <ShareButtons
              title={props.title ? props.title : productInitialState.title}
              imageUrl={props.imageUrl ? props.imageUrl : mainImage}
            />
          </Popover>
        </>
      )}

      

      <div className="preview" id="item-img">
        {renderMagnifier}
      </div>

      {
        !isMobileState && (
          <div id="product_carousel">
            <div className="controls dis-none">
              <a href="" className="prev">
                <span className="glyphicon glyphicon-arrow-left"></span>
              </a>
              <a href="" className="next">
                <span className="glyphicon glyphicon-arrow-right"></span>
              </a>
            </div>
            <div
              className="jcarousel thumbs"
              id="jcarousel-thumbs"
              data-jcarousel="true"
            >
              <ul
                style={{
                  left: "0px",
                  top: "0px",
                  display:
                    galleryImagesCount.length == 0 && sysNumImages == 1
                      ? "none"
                      : ""
                }}
              >
                <li>
                  {productCode ? (
                    <LazyLoad>
                      <img
                        className="img-thumb"
                        src={`https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${props.code}.jpg?tr=w-164,h-auto,dpr-2,f-auto`}
                        alt=""

                        onClick={() => handleImageChange(productCode)}
                      />
                    </LazyLoad>
                  ) : 
                  null
                  }
                </li>

                {renderGalleryImages()}
              </ul>
            </div>
          </div>
        )
      }

    </div>
  );
}, areEqual);

export default ImageCarousel;
