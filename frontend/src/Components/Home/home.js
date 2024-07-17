import React from 'react'
import { Navbar } from '../../Components/Navbar/navbar';
import { useSelector } from "react-redux";

export function Home() {
  const reduxData = useSelector((state) => state);

    return (
        <>
            <Navbar />
        </>
    )
}
