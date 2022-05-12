import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

export default function ListAndDownload(props: any) {
  const [data, setData] = React.useState(props.data);
  const [page, setPage] = React.useState(props.currentPage);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    const res = await axios.get(
      `http://localhost:3000/api/get-files/?page=${page}`
    );
    setData(res.data.data);
    setPage(res.data.currentPage);
    setLoading(false);
  };

  if (!data || loading) {
    return <h1>Loading</h1>;
  }
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      {data.map((item: any) => (
        <Grid item xs={12} key={item.url}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.key}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                download={true}
                href={item.url}
                target="_blank"
              >
                Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Pagination
          count={props.totalPages}
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
  const res = await axios.get("http://localhost:3000/api/get-files/");
  return {
    props: {
      data: res.data.data,
      totalPages: res.data.totalPages,
      currentPage: res.data.currentPage,
    },
  };
}
