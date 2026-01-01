import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import DropzoneImageInput from "../createProduct/DropzoneImageInput";

const UpdateBannerFormPopps = ({ banner, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [bannerData, setBannerData] = useState({
    title: "",
    link: "",
    position: 0,
    isActive: true,
    image: null,
  });

  // Prefill banner data
  useEffect(() => {
    if (banner) {
      setBannerData({
        title: banner.title || "",
        link: banner.link || "",
        position: banner.position ?? 0,
        isActive: banner.isActive ?? true,
        image: null, // only new image goes here
      });
    }
  }, [banner]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setBannerData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "position"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", bannerData.title);
      formData.append("link", bannerData.link);
      formData.append("position", bannerData.position);
      formData.append("isActive", bannerData.isActive);

      if (bannerData.image) {
        formData.append("image", bannerData.image);
      }

      const res = await fetch(
        `https://backend.ramyavastram.com/api/banners/${banner._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Banner update failed");
      }

      toast.success("Banner updated successfully");
      onSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Banner Title"
            name="title"
            value={bannerData.title}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Redirect Link"
            name="link"
            value={bannerData.link}
            onChange={handleChange}
          />
        </Grid>

        {/* Position / Order */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Banner Position"
            name="position"
            value={bannerData.position}
            onChange={handleChange}
            helperText="Lower number appears first"
          />
        </Grid>

        {/* Image */}
        <Grid item xs={12}>
          <DropzoneImageInput
            img={{ file: bannerData.image }}
            label="Change Image (optional)"
            handleImageFileChange={handleImageChange}
          />
        </Grid>

        {/* Active toggle */}
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
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={22} /> : "Update Banner"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateBannerFormPopps;
