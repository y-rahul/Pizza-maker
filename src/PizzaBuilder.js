import React from "react";
class PizzaBuilder extends React.Component {
  state = {
    toppingOptions: {
      pepperoni: {
        icons: ["gluten free"],
        amount: 12,
      },
      bacon: {
        icons: ["gluten free"],
        amount: 13,
      },
      ham: {
        icons: ["gluten free"],
        amount: 14,
      },
      sausage: {
        icons: ["gluten free"],
        amount: 13,
      },
      chicken: {
        icons: ["gluten free"],
        amount: 14,
      },
      onions: {
        icons: ["vegetarian", "gluten free"],
        amount: 15,
      },
      peppers: {
        icons: ["vegetarian", "gluten free"],
        amount: 15,
      },
      mushrooms: {
        icons: ["vegetarian", "gluten free"],
        amount: 22,
      },
      pineapple: {
        icons: ["vegetarian", "gluten free"],
        amount: 16,
      },
      olives: {
        icons: ["vegetarian", "gluten free"],
        amount: 19,
      },
      jalapenos: {
        icons: ["vegetarian", "gluten free", "hot"],
        amount: 19,
      },
    },
    selectedToppings: [],
    basePrice: 10,
    toppingPrice: 1.5,
    discount: {
      userCode: "",
      applied: false,
      codes: {
        codepen: 25,
        css: 20,
        george: 30,
        html: 10,
        javascript: 15,
        pizza: 40,
        react: 35,
      },
    },
    orderConfirmed: false,
  };

  confirmOrderBtnRef = React.createRef();
  closeConfirmationBtnRef = React.createRef();

  handleToppingOptionClick = (e) => {
    if (e.target.className === "topping-input") {
      const selectedTopping = e.target.id;

      this.state.selectedToppings.includes(selectedTopping)
        ? this.setState((prevState) => ({
            selectedToppings: prevState.selectedToppings.filter(
              (topping) => topping !== selectedTopping
            ),
          }))
        : this.setState((prevState) => ({
            selectedToppings: [...prevState.selectedToppings, selectedTopping],
          }));
    }
  };

  handleOrderSubmit = () => {
    this.setState(
      (prevState) => ({ orderConfirmed: !prevState.orderConfirmed }),
      () => {
        this.state.orderConfirmed
          ? this.closeConfirmationBtnRef.current.focus()
          : this.confirmOrderBtnRef.current.focus();
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <div className="container">
            <ToppingSelect
              toppingOptions={Object.entries(this.state.toppingOptions)}
              toppingPrice={this.state.toppingPrice.toFixed(2)}
              handleToppingOptionClick={this.handleToppingOptionClick}
            />
            <Pizza
              selectedToppings={this.state.selectedToppings}
              toppingOptions={this.state.toppingOptions}
            />
            <OrderDetails
              selectedToppings={this.state.selectedToppings}
              totalPrice={(
                this.state.basePrice +
                this.state.toppingPrice * this.state.selectedToppings.length
              ).toFixed(2)}
              confirmOrderBtnRef={this.confirmOrderBtnRef}
              handleOrderSubmit={this.handleOrderSubmit}
            />
            {this.state.orderConfirmed ? (
              <OrderConfirmation
                handleOrderSubmit={this.handleOrderSubmit}
                closeConfirmationBtnRef={this.closeConfirmationBtnRef}
              />
            ) : null}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

function Header() {
  return (
    <header>
      <h1>
        Yummy <span aria-hidden>🍕</span> Pizza
      </h1>
    </header>
  );
}

function ToppingSelect({
  toppingOptions,
  toppingPrice,
  handleToppingOptionClick,
}) {
  return (
    <div className="topping-select">
      <h2>Toppings</h2>

      <p className="toppings-info">
        Toppings charged at {`$${toppingPrice}`} each.
      </p>
      <ul className="topping-options" onClick={handleToppingOptionClick}>
        {toppingOptions.map((topping) => (
          <ToppingOption
            key={topping[0]}
            topping={topping[0]}
            toppingIcons={topping[1].icons}
          />
        ))}
      </ul>
    </div>
  );
}

function ToppingOption({ topping, toppingIcons }) {
  return (
    <li className="topping-option">
      <input type="checkbox" id={topping} className="topping-input" />
      <label
        className="topping-label"
        htmlFor={topping}
        aria-label={`${topping} (${toppingIcons.map((icon) => icon)})`}
      >
        <div className="topping-image">
          <div className={`${topping} topping-image-item`}></div>
        </div>
        <span className="topping-label-content">
          <span className="topping-label-text">{topping}</span>
        </span>
      </label>
    </li>
  );
}

function Pizza({ toppingOptions, selectedToppings }) {
  return (
    <div className="pizza-container">
      <div className="pizza">
        {selectedToppings.map((topping) => (
          <PizzaTopping
            key={topping}
            topping={topping}
            toppingAmount={toppingOptions[topping].amount}
          />
        ))}
      </div>
    </div>
  );
}

function PizzaTopping({ topping, toppingAmount }) {
  let toppings = [];

  for (let i = 1; i <= toppingAmount; i++) {
    toppings.push(
      <div
        key={`${topping + i}`}
        className={`topping ${topping} ${topping}-${i} `}
      ></div>
    );
  }

  return toppings;
}

function OrderDetails({
  selectedToppings,
  totalPrice,
  confirmOrderBtnRef,
  handleOrderSubmit,
}) {
  return (
    <div className="order">
      <h2>Order Details</h2>
      <div className="order-toppings">
        <h3>Toppings:</h3>
        <ul className="order-toppings-list">
          <li>Cheese</li>
          {selectedToppings.map((topping) => (
            <li key={topping}>{topping}</li>
          ))}
        </ul>
      </div>

      <div className="order-price">
        <h3>Total Price:</h3>
        <p className="price">{totalPrice}</p>
        <button
          className="btn order-btn"
          onClick={handleOrderSubmit}
          aria-label="Confirm Order"
          ref={confirmOrderBtnRef}
        >
          Order
        </button>
      </div>
    </div>
  );
}

function OrderConfirmation({ closeConfirmationBtnRef, handleOrderSubmit }) {
  return (
    <div className="order-confirmation">
      <div className="order-modal">
        <h2>Order Confirmed</h2>
        <p>Your pizza will be with you shortly!</p>
        <button
          className="btn close-btn"
          onClick={handleOrderSubmit}
          aria-label="Close Confirmation"
          ref={closeConfirmationBtnRef}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PizzaBuilder;
