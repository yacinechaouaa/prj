import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Match = ({ match, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/match/${match._id}`}>{match.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(match.rating / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">{match.reviwNumber}( Reviews)</span>
          </div>
          <div className="last-price-place">
            <p className="card-text">{match.price}</p>
            <span>{match.place}</span>
          </div>
          <Link
            to={`/match/${match._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Match;
