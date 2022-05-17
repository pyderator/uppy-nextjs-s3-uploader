import { Grid, Pagination } from "@mui/material";
import axios from "axios";
import React from "react";
import Card from "../components/Card";

interface IDataResponse {
  totalPages: number;
  currentPage: number;
  data: Array<FileData>;
}

export type FileData = {
  id: string;
  key: string;
  filename: string;
  isMain: boolean;
  url: string;
};

export default function ListAndDownload(props: IDataResponse) {
  const [data, setData] = React.useState(props.data);
  const [totalPages, setTotalPages] = React.useState(props.totalPages);
  const [page, setPage] = React.useState(props.currentPage);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (page: number = 0) => {
    setLoading(true);

    const res = await axios.get(
      `http://localhost:3000/api/get-files/?page=${page}`
    );

    setData(res.data.data);
    setPage(res.data.currentPage);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  };

  if (!data || loading) {
    return <h1>Loading</h1>;
  }
  if (data.length <= 0 && totalPages > 0) {
    return (
      <>
        <h1>No files in this page</h1>
        <Pagination
          count={totalPages}
          variant="outlined"
          page={page + 1}
          onChange={(e, value) => {
            e.preventDefault();
            fetchData(value - 1);
          }}
        />
      </>
    );
  }

  if (data.length <= 0) {
    return <h1>No files. Why don't you upload one ?</h1>;
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.url}>
          <Card
            filename={item.filename}
            id={item.id}
            url={item.url}
            setData={setData}
            isMain={item.isMain}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Pagination
          count={totalPages}
          variant="outlined"
          page={page + 1}
          onChange={(e, value) => {
            e.preventDefault();
            fetchData(value - 1);
          }}
        />
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(ctx: any) {
  const host = ctx.req.headers.host;
  try {
    const res = await axios.get(`http://${host}/api/get-files`);
    return {
      props: {
        data: res.data.data,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        totalPages: 0,
        currentPage: 0,
      },
    };
  }
}
