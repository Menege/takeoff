import { Routes, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const ClientRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default ClientRouter;