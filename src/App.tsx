import { FC, ReactNode } from "react"
import { Link, Route, Routes } from "react-router-dom"

const USER_TYPES = {
  PUBLIC: "Public user",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User"
}

const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER
function App() {

  return (
    <>
      <div>
        <Link to={"/"}>Home</Link>
        {
          (CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
            CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) ?
            (<>
              <Link to={"/user"}>User</Link>
              <Link to={"/myprofile"}>User Profile</Link>
            </>)
            : null}
        {
          CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ?
            <>
              <Link to={"/admin"}>Admin</Link>
            </>
            : null}

        <p>You are logged in as: {CURRENT_USER_TYPE}</p>
      </div>
      <AppRoutes />
    </>
  )
}



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicElement><Home /></PublicElement>} />
      <Route path="/user" element={<UserElement><User /></UserElement>} />
      <Route path="/myprofile" element={<UserElement><User /></UserElement>} />
      <Route path="/admin" element={<AdminElement><Admin /></AdminElement>} />
    </Routes>
  )
}

const Home = () => {
  return <h1>Home page</h1>
}
const User = () => {
  return <h1>User page</h1>
}
const Admin = () => {
  return <h1>Admin page</h1>
}

interface PublicElementProps {
  children: ReactNode;
}
const PublicElement: FC<PublicElementProps> = ({ children }) => {
  return <>{children}</>;
};

const UserElement: FC<PublicElementProps> = ({ children }) => {
  if (CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
    CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>
  } else {
    return <Home />
  }
};

const AdminElement: FC<PublicElementProps> = ({ children }) => {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>
  } else {
    return <p>You don't have access to this page!</p>
  }
};

export default App