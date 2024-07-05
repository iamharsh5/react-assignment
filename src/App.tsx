import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/sign-up";
import SecondPage from "./components/secondPage";
import { Toaster } from "sonner";
const App = () => {
  return (
    
    <BrowserRouter>
    <Toaster position="bottom-center" richColors/>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/secondPage"  element={<SecondPage/>}  />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
