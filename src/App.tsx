import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/TV";
import Search from "./routes/Search";
import Header from "./Components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                >
                    <Route
                        path="/movies/:movieId"
                        element={<Home />}
                    />
                </Route>
                <Route
                    path="/tv"
                    element={<Tv />}
                />
                <Route
                    path="/search"
                    element={<Search />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
