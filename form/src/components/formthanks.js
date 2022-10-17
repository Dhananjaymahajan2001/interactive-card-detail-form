import "../App.css";
import "./formthanks.css";
import imagetick from "../images/icon-complete.svg";

export default function CardThanks({ resetForm }) {
  return (
    <div className="cardThanks">
      <img src={imagetick} alt="check logo" className="logo" />
      <p className="heading">Thank you!</p>
      <p className="secondary">We've added your card details</p>
      <button className="btn-primary" onClick={resetForm}>
        Continue
      </button>
    </div>
  );
}
