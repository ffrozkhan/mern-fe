import React from "react";
import { useAuth } from "../../context/auth";

const AdminProfile = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="profileParent">
      <div className="profileLeft">
        <div className="profileContainer">
          <div className="profilePicture"></div>
          <div className="profileDetails">
            <p>
              <b>Admin:</b>
              {auth?.user?.fullname}
            </p>
            <p>
              <b>Email:</b>
              {auth?.user?.email}
            </p>
            <p>
              <b>Phone:</b>
              {auth?.user?.phone}
            </p>
            <p>
              <b>Address:</b>
              {auth?.user?.address}
            </p>
          </div>
        </div>
      </div>
      <div className="profileRight"></div>
    </div>
  );
};

export default AdminProfile;
