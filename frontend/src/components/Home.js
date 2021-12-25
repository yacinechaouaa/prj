import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchs } from "../actions/matchs-actions";
import Match from "./match/Match";
import Loader from "./layaout/Loader";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [categorie, setCategorie] = useState("");
  const categories = ["championnat", "copa", "championsligue"];
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { Count, matchCount, matchs, loading, resPerPage } = useSelector(
    (state) => state.matchs
  );
  const keyword = match.params.keyword;
  useEffect(() => {
    dispatch(getMatchs(keyword, currentPage, price, categorie, rating));
  }, [dispatch, keyword, currentPage, price, categorie, rating]);
  console.log("matchssss ", matchs);
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section id="products" className="container mt-5">
            <div className="row" style={{ margin: "40px" }}>
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">categories</h4>
                        <ul className="pl-0">
                          {categories.map((categorie) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={categorie}
                              onClick={() => setCategorie(categorie)}
                            >
                              {categorie}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />
                      <div className="mt-5">
                        <h4 className="mb-3">ratings</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{ width: `${star * 20}%` }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {matchs.map((match) => (
                        <Match key={match._id} match={match} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                matchs.map((match) => (
                  <Match key={match._id} match={match} col={3} />
                ))
              )}
            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={matchCount}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
