import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateBannerFormPopps from "./UpdateBannerFormPopps";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch("https://backend.ramyavastram.com/api/banners");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBanner(null);
    fetchBanners(); // refresh list after update
  };

  return (
    <>
      <Grid container spacing={3}>
        {banners.map((banner) => (
          <Grid item xs={12} sm={6} md={4} key={banner._id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={banner.image}
                alt={banner.title}
              />
              <CardContent>
                <Typography variant="h6">{banner.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {banner.link}
                </Typography>

                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => handleEditClick(banner)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Banner</DialogTitle>
        <DialogContent>
          {selectedBanner && (
            <UpdateBannerFormPopps
              banner={selectedBanner}
              onSuccess={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default BannerList;
