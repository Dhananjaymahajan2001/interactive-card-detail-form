import { useState } from "react";
import "./App.css";
import CardThanks from "./components/formthanks";
import CardForm from "./components/form";
import gradient_back from "./images/bg-main-desktop.png";
import card_back from "./images/bg-card-back.png";
import card_front from "./images/bg-card-front.png";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({
    name: null,
    number: null,
    mm: null,
    yy: null,
    cvc: null,
  });
  const [validate, setValidate] = useState(false);

  const handleInput = (e) => {
    if (e.target.name === "number" && e.target.value) {
      e.target.value = e.target.value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    if (e.target.name === "mm" || e.target.name === "yy") {
      e.target.value = e.target.value
        .toString()
        .replace(/[^0-9]/g, "")
        .substring(0, 2);
      if (e.target.name === "mm" && e.target.value > 12) e.target.value = "12";
    }

    if (e.target.name === "cvc") {
      e.target.value = e.target.value.substring(0, 4);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleError = (target, message, type = "add") => {
    if (type === "add") {
      const submitBtn = document.querySelector(".btn-submit");
      submitBtn.classList.add("shake");
      submitBtn.addEventListener("animationend", () =>
        submitBtn.classList.remove("shake")
      );
    }

    document.querySelector(`.label${target}`).nextElementSibling.innerHTML =
      message;
    document
      .querySelector(`[name="${target}"]`)
      .classList[type](`input--error`);
    document
      .querySelector(`.label${target}`)
      .nextElementSibling.classList[type === "add" ? "remove" : "add"](
        "info--hidden"
      );
  };

  const animateSlider = (validate) => {
    let axis;
    window.matchMedia("(max-width: 750px)").matches
      ? (axis = "Y")
      : (axis = "X");
    document.querySelector(
      ".cardOverflow > div"
    ).style.transform = `translate${axis}(50${axis === "Y" ? "vh" : "vw"})`;

    document.body.classList.add("body-slider");

    setTimeout(() => {
      setValidate(validate);
      document.body.classList.remove("body-slider");
      document.querySelector(".cardOverflow > div").style.transform =
        "translate(0)";
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i in formData) {
      if (!formData[i]) {
        handleError(i, "Can`t be blank");
      } else handleError(i, "", "remove");
    }

    if (formData.number) {
      if (formData.number.length < 19) {
        handleError("number", "Number is too short");
      } else if (formData.number.match(/[^0-9\s]/g)) {
        handleError("number", "Wrong format, numbers only");
      } else handleError("number", "", "remove");
    }

    if (formData.cvc) {
      if (formData.cvc.length < 3) {
        handleError("cvc", "CVC is too short");
      } else handleError("cvc", "", "remove");
    }

    if (!formData.mm) handleError("mm", "Can`t be blank");
    if (!formData.yy) handleError("yy", "Can`t be blank");

    if (document.querySelectorAll(".input--error").length === 0)
      animateSlider(true);
  };

  const resetForm = () => {
    setFormData({ name: null, number: null, mm: null, yy: null, cvc: null });
    animateSlider(false);
  };
  return (
    <div className="container">
      <div className="images">
        <img src={gradient_back} className="back-image" />
        <div className="card1">
          <div className="card1-container">
            <div className="card1-1">
              <svg width="40" height="40" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="40" fill="white" />
              </svg>
              <svg width="40" height="40" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <p className="card1-2">
              {" "}
              <span>{formData.number || "0000 0000 0000 0000"}</span>
            </p>
            <div className="card1-3">
              <span>{formData.name || "Jane Appleseed"}</span>
              <span>
                {formData.mm || "00"}/{formData.yy || "00"}
              </span>
            </div>
          </div>
        </div>
        <img src={card_front} alt="card-front" className="card-front" />
        <div className="card2-container">
          <p className="card2-1">
            <span>{formData.cvc || "000"}</span>
          </p>
        </div>
        <img src={card_back} alt="card-back" className="card-back" />
      </div>
      {!validate ? (
        <div className="cardOverflow">
          <div>
            <CardForm handleSubmit={handleSubmit} handleInput={handleInput} />
          </div>
        </div>
      ) : (
        <div className="cardOverflow">
          <div>
            <CardThanks resetForm={resetForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
