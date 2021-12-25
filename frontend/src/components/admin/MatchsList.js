import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layaout/Loader";
import { MDBDataTable } from "mdbreact";
import { getAdminMatchs, deleteMatch } from "../../actions/matchs-actions";
import { DELETE_MATCH_RESET } from "../../actions/action-type";
import axios from "axios";

import SideBar from "./SideBar";
const MatchsList = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user.role);

  const { loading, error, matchs } = useSelector((state) => state.matchs);
  console.log(matchs, "fog l is deleted");
  const { error: deleteError, isDeleted } = useSelector((state) => state.match);
  useEffect(() => {
    dispatch(getAdminMatchs());
    if (isDeleted) {
      alert("Match deleted successfully");
      history.push("/admin/matchs");
      dispatch({ type: DELETE_MATCH_RESET });
    }
  }, [dispatch, isDeleted, history]);

  const setMatchs = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    matchs.forEach((match) => {
      data.rows.push({
        id: match._id,
        name: match.name,
        price: `$${match.price}`,
        stock: match.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/match/${match._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteMatchHandler(match._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    const deleteMatchHandler = (id) => {
      dispatch(deleteMatch(id));
    };

    return data;
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Matchs</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setMatchs()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};
export default MatchsList;
