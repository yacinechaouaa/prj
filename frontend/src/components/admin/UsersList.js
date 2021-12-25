import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layaout/Loader";
import SideBar from "./SideBar";

import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../actions/user-actions";
/*import { DELETE_USER_RESET } from "../../actions/action-type";*/

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { loading, error, users } = useSelector((state) => state.allUsers);
  /*const { isDeleted } = useSelector((state) => state.user);*/

  useEffect(() => {
    console.log(user, "from alluser");
    dispatch(allUsers());

    if (error) {
      console.log(error);
    }

    /*  if (isDeleted) {
      alert("User deleted successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }*/
  }, [dispatch, , error /*isDeleted*/, , history]);

  const deleteUserHandler = (id) => {
    /*dispatch(deleteUser(id));*/
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              /*onClick={() => deleteUserHandler(user._id)}*/
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

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
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default UsersList;
