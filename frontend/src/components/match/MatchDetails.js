import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layaout/Loader";
import { getMatchDetails } from "../../actions/matchs-actions";
import { Carousel } from "react-bootstrap";

const MatchDetails = ({ match }) => {
  const { Match, loading } = useSelector((state) => state.matchDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchDetails(match.params.id));
  }, []);
  console.log("this match ", Match);
  console.log(Match.images);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {Match.images &&
                  Match.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img src={image.url} className="d-block w-100" />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{Match.name}</h3>
              <p id="product_id">Match # {Match._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(match.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{Match.reviwNumber} reviews</span>

              <hr />

              <p id="product_price">${Match.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value="1"
                  readOnly
                />

                <span className="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status: <span id="stock_status">In Stock</span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>
                Binge on movies and TV episodes, news, sports, music and more!
                We insisted on 720p High Definition for this 32" LED TV,
                bringing out more lifelike color, texture and detail. We also
                partnered with Roku to bring you the best possible content with
                thousands of channels to choose from, conveniently presented
                through your own custom home screen.
              </p>
              <hr />
              <p id="product_seller mb-3">
                Number of tickets : <strong>{Match.ticketNumber}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// mazel bech nzid in stock w out of stock don"t forget 

export default MatchDetails;
