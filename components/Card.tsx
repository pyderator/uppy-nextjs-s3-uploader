import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { FileData } from "../pages/list-download";
import CardActionButtons from "./CardActionButtons";

const Card = ({
  isMain,
  filename,
  setData,
  id,
  url,
}: {
  isMain: boolean;
  filename: string;
  id: string;
  url: string;
  setData: React.Dispatch<React.SetStateAction<FileData[]>>;
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteFile = async (id: string) => {
    try {
      setIsDeleting(true);
      const res = await axios.get(`http://localhost:3000/api/delete?id=${id}`);

      if (res.status === 200) {
        setData((prevData) => prevData.filter((d) => d.id !== id));
        return;
      }

      throw new Error();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <MuiCard
      sx={{
        maxWidth: 345,
        border: `${isMain ? "1px solid red" : "none"}`,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {filename}
        </Typography>
      </CardContent>
      <CardActionButtons
        deleteFile={deleteFile}
        id={id}
        url={url}
        isDeleting={isDeleting}
      />
    </MuiCard>
  );
};
export default Card;
