import { LoadingButton } from "@mui/lab";
import { Button, CardActions } from "@mui/material";

const CardActionButtons = ({
  url,
  deleteFile,
  isDeleting,
  id,
}: {
  url: string;
  id: string;
  deleteFile(id: string): void;
  isDeleting: boolean;
}) => {
  return (
    <>
      <CardActions>
        <Button
          size="small"
          download={true}
          href={url}
          target="_blank"
          disabled={isDeleting}
        >
          Download
        </Button>
        {isDeleting ? (
          <LoadingButton loading={isDeleting}>Deleting</LoadingButton>
        ) : (
          <Button size="small" color="error" onClick={() => deleteFile(id)}>
            Delete
          </Button>
        )}
      </CardActions>
    </>
  );
};

export default CardActionButtons;
