import { Button, CardActions } from "@mui/material";

const CardActionButtons = ({
  url,
  deleteFile,
  id,
}: {
  url: string;
  id: string;
  deleteFile(id: string): void;
}) => {
  return (
    <>
      <CardActions>
        <Button size="small" download={true} href={url} target="_blank">
          Download
        </Button>
        <Button size="small" color="error" onClick={() => deleteFile(id)}>
          Delete
        </Button>
      </CardActions>
    </>
  );
};

export default CardActionButtons;
