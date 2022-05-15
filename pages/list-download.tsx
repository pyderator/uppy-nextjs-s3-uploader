import { Card, CardContent, Grid, Pagination, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import CardActionButtons from "../components/CardActionButtons";

interface IDataResponse {
  totalPages: number;
  currentPage: number;
  data: Array<FileData>;
}

type FileData = {
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

  const deleteFile = async (id: string) => {
    const res = await axios.get(`http://localhost:3000/api/delete?id=${id}`);

    if (res.status === 200) {
      setData((prevData) => prevData.filter((d) => d.id !== id));
    }
  };

  if (!data || loading) {
    return <h1>Loading</h1>;
  }
  if (data.length <= 0 && totalPages >= 0) {
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
            sx={{
              maxWidth: 345,
              border: `${item.isMain ? "1px solid red" : "none"}`,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.filename}
              </Typography>
            </CardContent>
            <CardActionButtons
              deleteFile={deleteFile}
              id={item.id}
              url={item.url}
            />
          </Card>
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

export async function getServerSideProps() {
  const res = await axios.get<IDataResponse>(
    "http://localhost:3000/api/get-files/"
  );
  return {
    props: {
      data: res.data.data,
      totalPages: res.data.totalPages,
      currentPage: res.data.currentPage,
    },
  };
}
