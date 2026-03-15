// src/layouts/GroupLayout.jsx
import React from "react";
import Header from "../components/Header";
import { Outlet, useParams } from "react-router-dom";

export default function GroupLayout() {
  const { id } = useParams();
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
