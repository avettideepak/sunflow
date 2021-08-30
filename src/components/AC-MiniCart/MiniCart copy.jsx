class MiniCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: useWindowDimensions().height,
      basketCountState: 0,
      basketProductsState: [],
      totalPriceState: 0,
      isLocal: "/basket.html?vid=20180521148",
      right: false
    };
  }

  setTotal = arg => {
    let totalPrice = 0;
    arg.map(({ price }) => {
      totalPrice = totalPrice + price;
    });
    return totalPrice;
  };

  componentWillMount() {
    fetch("/uservices/1.0.2/basket/20180521148/lang/en/")
      .then(res => res.json())
      .then(json => {
        let products = json.__Result.products;
        this.setState({
          basketCountState: products.length,
          basketProductsState: products,
          totalPriceState: this.setTotal(products)
        });
      });
  }

  toggleDrawerMini = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ [side]: open });
  };

  render() {
    return (
      <>
        <div
          className="icon-container"
          onClick={this.toggleDrawerMini("right", true)}
        >
          <div className="icon-wrapper">
            <i className="material-icons-outlined">shopping_cart</i>
            {this.state.basketCountState > 0 ? (
              <span className="icon-item-count-text-mobile">
                {this.state.basketCountState}
              </span>
            ) : null}
          </div>
          <div className="icon-text">
            <span className="icon-title">
              {this.state.basketCountState} Item
            </span>
            <span className="icon-action-text">My Cart</span>
          </div>
        </div>

        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawerMini("right", false)}
        >
          <div
            role="presentation"
            onClick={this.toggleDrawerMini(side, false)}
            onKeyDown={this.toggleDrawerMini(side, false)}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: height,
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <h6 className="minicart-title">Shopping Cart</h6>
                  <span className="minicart-count">
                    {this.state.basketCountState} Items in the basket
                  </span>
                  <ul className="cd-cart-items">
                    {this.state.basketProductsState.length > 0
                      ? this.state.basketProductsState.map(
                          ({ imageurl, title, price, qty }) => {
                            return (
                              <li>
                                <b>Item:</b> {title}
                                <div className="cd-price">
                                  <p>
                                    <b>Price:</b> {price}CAD
                                    <b style={{ paddingLeft: "20px" }}>
                                      Qty:
                                    </b>{" "}
                                    {qty}x
                                  </p>
                                </div>
                                {/*<a
                            href="#0"
                            className="cd-item-remove cd-img-replace"
                          ></a>*/}
                              </li>
                            );
                          }
                        )
                      : null}
                  </ul>
                  {this.state.basketProductsState.length > 0 ? (
                    <div className="cd-cart-total">
                      <p>
                        <b>
                          Total <span>{this.state.totalPriceState}CAD</span>
                        </b>
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="continue-check text-center">
                  <span>
                    <a href={this.state.isLocal} className="checkout-btn">
                      Continue to Checkout
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </>
    );
  }
}
