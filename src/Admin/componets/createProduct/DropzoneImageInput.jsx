import { useDropzone } from "react-dropzone";
import { Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
const DropzoneImageInput = ({
  img,
  variantIndex,
  imgIndex,
  label,
  handleImageFileChange,
  handleRemoveImage, // Pass this from the parent!
}) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      // Use imgIndex instead of label!
      handleImageFileChange(
        { target: { files: [acceptedFiles[0]] } },
        variantIndex,
        imgIndex
      );
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Grid item xs={12} sm={4} key={imgIndex}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #1976d2",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragActive ? "#050505ff" : "#000000ff",
          position: "relative",
        }}
      >
        <input {...getInputProps()} />
        {img.file ? (
          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
            {img.file.name}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Drag & drop {label} image here, or click to select file
          </Typography>
        )}
        {/* Remove button at top right */}
        <IconButton
          size="small"
          color="error"
          onClick={(event) => {
            event.stopPropagation(); // prevent opening file dialog on delete
            handleRemoveImage(variantIndex, imgIndex);
          }}
          sx={{ position: 'absolute', top: 2, right: 2 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </Grid>
  );
};

export default DropzoneImageInput;