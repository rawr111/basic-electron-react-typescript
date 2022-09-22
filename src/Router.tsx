import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./components/App";

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main_window" element={<App />} />
                <Route path="/logs_window" element={<App />} />
                <Route path="/main" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
