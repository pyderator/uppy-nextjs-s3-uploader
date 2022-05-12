import { Button } from "@mui/material";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/file-input/dist/style.css";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
const Home: NextPage = () => {
  return (
    <>
      <Link href="/upload" passHref>
        <Button color="primary" variant="contained">
          Upload
        </Button>
      </Link>{" "}
      <Link href="/list-download" passHref>
        <Button color="primary" variant="contained">{`List & Download`}</Button>
      </Link>
    </>
  );
};

export default Home;
