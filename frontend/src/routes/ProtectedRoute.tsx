import {
  Navigate,
} from "react-router-dom";

import {
  useAuthStore,
} from "../store/authStore";

type Props = {
  children:
    React.ReactNode;

  allowedRoles?:
    string[];
};

function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {

  const {
    token,
    user,
  } =
    useAuthStore();

  // Not logged in
  if (!token) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Role restriction
  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return (
    <>
      {children}
    </>
  );
}

export default
ProtectedRoute;