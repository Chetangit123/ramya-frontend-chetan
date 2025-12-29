import { useState, Fragment } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropzoneImageInput from "../createProduct/DropzoneImageInput";

const CreateBannerForm = () => {
  const [loading, setLoading] = useState(false);
  const [bannerData, setBannerData] = useState({
    title: "",
    link: "",
    isActive: true,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setBannerData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG images are allowed");
      return;
    }

    setBannerData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerData.image) {
      toast.error("Banner image is required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", bannerData.image);
      formData.append("title", bannerData.title);
      formData.append("link", bannerData.link);
      formData.append("isActive", bannerData.isActive);

      const res = await fetch("http://localhost:5454/api/banners", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Banner upload failed");
      }

      toast.success("Banner uploaded successfully");

      setBannerData({
        title: "",
        link: "",
        isActive: true,
        image: null,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Typography variant="h4" textAlign="center" className="py-10">
        Add New Banner
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Banner Details</Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Banner Title"
              name="title"
              value={bannerData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Redirect Link"
              name="link"
              value={bannerData.link}
              onChange={handleChange}
              placeholder="/products"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Banner Image</Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DropzoneImageInput
              img={{ file: bannerData.image }}
              label="Upload Banner Image"
              handleImageFileChange={handleImageChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={bannerData.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="Active Banner"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Uploading...
                </>
              ) : (
                "Upload Banner"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>

      <ToastContainer />
    </Fragment>
  );
};

export default CreateBannerForm;
