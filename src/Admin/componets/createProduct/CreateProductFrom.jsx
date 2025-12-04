import { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../Redux/Customers/Product/Action";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { API_BASE_URL } from "../../../config/api";
import { useDropzone } from "react-dropzone";
import DropzoneImageInput from "./DropzoneImageInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CreateProductForm = () => {
  const [hasSizes, setHasSizes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [productData, setProductData] = useState({
    colorVariants: [
      {
        color: "",
        images: [{ label: "front", file: null }],
      },
    ],

    brand: "",
    title: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: [],
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });
  const validateFields = () => {
    let newErrors = {};

    if (!productData.brand) newErrors.brand = "Brand is required";
    if (!productData.title) newErrors.title = "Title is required";
    if (!productData.discountedPrice || Number(productData.discountedPrice) <= 0)
      newErrors.discountedPrice = "Discounted Price must be greater than 0";
    if (!productData.discountPersent && productData.discountPersent !== 0)
      newErrors.discountPersent = "Discount percentage is required";
    if (!productData.price || Number(productData.price) <= 0)
      newErrors.price = "Price must be greater than 0";

    if (!hasSizes && (!productData.quantity || Number(productData.quantity) <= 0)) {
      newErrors.quantity = "Total quantity is required";
    }

    if (hasSizes && productData.size.length === 0) {
      newErrors.size = "At least one size is required";
    }

    if (!productData.topLavelCategory) newErrors.topLavelCategory = "Top Level Category is required";
    if (!productData.secondLavelCategory) newErrors.secondLavelCategory = "Second Level Category is required";
    if (!productData.thirdLavelCategory) newErrors.thirdLavelCategory = "Third Level Category is required";
    if (!productData.description) newErrors.description = "Description is required";

    // Check if at least one image uploaded
    productData.colorVariants.forEach((variant, i) => {
      if (!variant.color) newErrors[`color-${i}`] = "Color is required";
      if (!variant.images[0]?.file) {
        newErrors[`image-${i}`] = "At least 1 image is required for each variant";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prevState) => {
      const updatedData = { ...prevState, [name]: value };

      // If Discounted Price (base) and Discount Percentage are provided
      if (
        (name === "discountedPrice" || name === "discountPersent") &&
        updatedData.discountedPrice &&
        updatedData.discountPersent &&
        !isNaN(updatedData.discountedPrice) &&
        !isNaN(updatedData.discountPersent)
      ) {
        const discount = Number(updatedData.discountPersent) / 100;
        updatedData.price = (
          Number(updatedData.discountedPrice) /
          (1 - discount)
        ).toFixed(2);
      }

      return updatedData;
    });
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantity" : name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleAddSize = () => {
    const sizes = [...productData.size];
    sizes.push({ name: "", quantity: "" });
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleRemoveSize = (index) => {
    const sizes = [...productData.size];
    sizes.splice(index, 1);
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleToggleSizes = (e) => {
    const checked = e.target.checked;
    setHasSizes(checked);

    if (checked) {
      // Initialize with one size when enabling
      setProductData((prev) => ({
        ...prev,
        size: [{ name: "", quantity: "" }],
      }));
    } else {
      // Clear sizes when disabling
      setProductData((prev) => ({
        ...prev,
        size: [],
      }));
    }
  };

  const handleColorVariantChange = (e, index, imageLabel = null) => {
    const { value } = e.target;
    const updatedVariants = [...productData.colorVariants];

    if (imageLabel) {
      const imgIndex = updatedVariants[index].images.findIndex(
        (img) => img.label === imageLabel
      );
      if (imgIndex !== -1) {
        updatedVariants[index].images[imgIndex].url = value;
      }
    } else {
      updatedVariants[index].color = value;
    }

    setProductData((prevState) => ({
      ...prevState,
      colorVariants: updatedVariants,
    }));
  };

  const thirdLevelOptions = [
    { label: "TISSUE SAREE WITH BORDER", value: "tissue_saree_with_border" },
    { label: "Khadi", value: "khadi" },
    { label: "120 Thread Cotton Mul", value: "thread_cotton_mul" },
    { label: "Tissue", value: "tissue" },
    { label: "LINEN", value: "linen" },
    { label: "Kota Doriya", value: "kota_doriya" },
    { label: "KHADI SHIULI", value: "khadi_shiuli" },
    { label: "Flower Mul Cotton Saree", value: "flower_mul_cotton_saree" },
    { label: "Love Cotton Saree", value: "love_cotton_saree" },
    { label: "Resham Kota Saree", value: "resham_kota_saree" },
    {
      label: "Umbrella Embroidery dhoop chav Khadi Saree",
      value: "umbrelladhoop",
    },
    { label: "Kota Saree", value: "kota_saree" },
    { label: "Muslin Jamdani Saree", value: "muslin_jamdani_saree" },
    {
      label: "Nayantara Lace Border Khadi",
      value: "nayantara_lace_border_khadi",
    },
    { label: "Plain Khesh Saree", value: "plain_khesh_saree" },
    { label: "Lace Border Tissue Saree", value: "lace_border_tissue_saree" },
    { label: "Slab Cotton Saree", value: "slab_cotton_saree" },
    { label: "Padma Khadi Saree", value: "padma_khadi_saree" },
    { label: "Temple Saree", value: "temple_saree" },
    { label: "Jute Khadi", value: "jute_khadi" },
    { label: "Charcoal Khadi Saree", value: "charcoal_khadi_saree" },
    {
      label: "Lata Embroidery Khadi Saree",
      value: "lata_embroidery_khadi_saree",
    },
    { label: "Flower Khadi Saree", value: "flower_khadi_saree" },
    { label: "Umbrella Embroidery Khadi Saree", value: "umbrella_saree" },
    { label: "TISSUE SAREE WITH BORDER", value: "TISSUE_SAREE_WITH_BORDER" },
    { label: "SICO KHADI SAREE", value: "sico_khadi_saree" },
    {
      label: "Love Lace Border Khadi Saree",
      value: "love_lace_border_khadi_saree",
    },
    { label: "Co Ord", value: "co_ords" },
    { label: "Jacket", value: "jackets" },
    { label: "Kalamkari", value: "kalamkari" },
    { label: "Block Print", value: "block_print" },
    { label: "- Patch Work", value: "patch_work" },

    {
      label: "Love Border Cotton Saree",
      value: "love_border_cotton_saree",
    },
    { label: "Multi-Color Mul Cotton", value: "multi_color_mul_cotton" },
    { label: "INDIGO SAREE", value: "indigo_saree" },
    {
      label: "Love Embroidery Mul Cotton",
      value: "love_embroidery_mul_cotton",
    },
    { label: "Raga Tissue Saree", value: "raga_tissue_saree" },
    { label: "Sunflower Khadi Saree", value: "sunflower_khadi_saree" },
    { label: "Love Khadi Saree", value: "love_khadi_saree" },
    { label: "Khadi Cotton", value: "khadi_cotton" },
    { label: "Mul Cotton", value: "mul_cotton" },
    { label: "Cotton Saree", value: "cotton_saree" },
    { label: "Cotton Silk Saree", value: "cotton_silk_saree" },
    { label: "Kalamkari", value: "kalamkari" },
    { label: "Saree", value: "saree" },
    { label: "Lengha Choli", value: "lengha_choli" },
    { label: "Kurtis", value: "kurtis" },
    { label: "Gopi Dress", value: "gopi" },
    { label: "Khesh Shiuli", value: "khesh_shiuli" },
    { label: "Half and Half soft Khadi Saree ", value: "half_and_soft_Khadi" },
    { label: "Bracelet", value: "bracelet" },
    { label: "Chain", value: "chain" },
    { label: "Necklace", value: "necklace" },
    { label: "Pendant", value: "pendant" },
    { label: "Ring", value: "ring" },
    { label: "Kada", value: "kada" },
    { label: "Thread Mul Cotton", value: "thread_mul_cotton" },
    { label: "Tie Dye", value: "tie_dye" },
    { label: "Earring", value: "earring" },
    { label: "Bangles", value: "bangles" },
    { label: "Mul Cotton Polka Dot", value: "mul_cotton_polka_dot" },
    { label: "Mul Cotton Sequin", value: "mul_cotton_sequin" },
    { label: "MUL COTTON BUTTERFLY", value: "mul_cotton_butterfly" },
    { label: "PLAIN MUL COTTON", value: "plain_mul_cotton" },
    { label: "Striped Cotton", value: "striped_cotton" },
    { label: "Shirt", value: "shirt" },
    { label: "Kurta", value: "kurta" },
    { label: "D'Coat", value: "dcoats" },
    { label: "T-Shirt", value: "t_shirt" },
    { label: "Blouse", value: "blous_e" },
    {}
  ];

  const handleAddColorVariant = () => {
    setProductData((prevState) => ({
      ...prevState,
      colorVariants: [
        ...prevState.colorVariants,
        {
          color: "",
          images: [
            { label: "front", file: null }, // Only one image to start
          ],
        },
      ],
    }));
  };

  const handleRemoveColorVariant = (index) => {
    if (productData.colorVariants.length <= 1) return;

    const updatedVariants = [...productData.colorVariants];
    updatedVariants.splice(index, 1);

    setProductData((prevState) => ({
      ...prevState,
      colorVariants: updatedVariants,
    }));
  };
  const handleAddfrontImage = (variantIndex) => {
    const updatedVariants = [...productData.colorVariants];
    updatedVariants[variantIndex].images.push({ label: "front", file: null });

    setProductData((prevState) => ({
      ...prevState,
      colorVariants: updatedVariants,
    }));
  };

  const handleRemovefrontImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...productData.colorVariants];
    // Don't allow removing the first 6 required images
    if (imageIndex >= 6) {
      updatedVariants[variantIndex].images.splice(imageIndex, 1);
      setProductData((prevState) => ({
        ...prevState,
        colorVariants: updatedVariants,
      }));
    }
  };

  const handlefrontImageChange = (e, variantIndex, imageIndex, field) => {
    const { value } = e.target;
    const updatedVariants = [...productData.colorVariants];
    updatedVariants[variantIndex].images[imageIndex][field] = value;

    setProductData((prevState) => ({
      ...prevState,
      colorVariants: updatedVariants,
    }));
  };
  const handleImageFileChange = (e, variantIndex, imgIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error('{"error":"Only JPEG, JPG, PNG files are allowed."}');
      return;
    }

    const updatedVariants = [...productData.colorVariants];
    updatedVariants[variantIndex].images[imgIndex].file = file;
    setProductData((prevState) => ({
      ...prevState,
      colorVariants: updatedVariants,
    }));
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/products/upload-product-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.imageUrl || ""; // Assume backend responds with uploaded URL
    } catch (err) {
      console.error("Image upload failed:", err);
      return "";
    }
  };
  // const handleRemoveImage = (variantIndex, imgIndex) => {
  //   const updatedVariants = [...productData.colorVariants];
  //   updatedVariants[variantIndex].images.splice(imgIndex, 1);
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     colorVariants: updatedVariants,
  //   }));
  // };
  const handleRemoveImage = (variantIndex, imgIndex) => {
    const updatedVariants = [...productData.colorVariants];

    // If it's the first image, don't actually remove it, just reset
    if (imgIndex === 0) {
      updatedVariants[variantIndex].images[0] = { label: "front", file: null };
    } else {
      updatedVariants[variantIndex].images.splice(imgIndex, 1);
    }

    setProductData((prevState) => ({
      ...prevState,
      colorVariants: updatedVariants,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validations first
    if (!validateFields()) {
      toast.error(" Please complete all required fields before submitting.");
      return;
    }

    setLoading(true); // start loader

    try {
      // Upload all images for each variant
      const uploadedColorVariants = await Promise.all(
        productData.colorVariants.map(async (variant) => {
          const uploadedImages = await Promise.all(
            variant.images.map(async (img) => {
              let url = "";
              if (img.file) {
                url = await uploadImage(img.file);
              }
              return {
                label: img.label || "front",
                url: url,
              };
            })
          );

          return {
            color: variant.color,
            images: uploadedImages,
          };
        })
      );

      // Calculate total quantity
      const totalQuantity = hasSizes
        ? productData.size.reduce(
          (sum, size) => sum + (Number(size.quantity) || 0),
          0
        )
        : Number(productData.quantity) || 0;

      // Prepare final payload
      const payload = {
        ...productData,
        colorVariants: uploadedColorVariants,
        price: Number(productData.price),
        discountedPrice: Number(productData.discountedPrice),
        discountPersent: Number(productData.discountPersent),
        quantity: totalQuantity,
        ...(hasSizes && {
          size: productData.size
            .filter((size) => size.name && size.quantity)
            .map((s) => ({
              name: s.name,
              quantity: Number(s.quantity),
            })),
        }),
      };

      // Dispatch to redux
      // let successProduct = await dispatch(createProduct({ data: payload, jwt }));
      // console.log(successProduct, "sucessProductUpload")
      // toast.success("✅ Product uploaded successfully!");

      let result = await dispatch(createProduct({ data: payload, jwt }));
      if (result.success) {
        console.log("Created product", result.data);
      } else {
        console.error("Error creating product", result.error);
      }
      // setProductData({
      //   colorVariants: [{ color: "", images: [{ label: "front", file: null }] }],
      //   brand: "",
      //   title: "",
      //   discountedPrice: "",
      //   price: "",
      //   discountPersent: "",
      //   size: [],
      //   quantity: "",
      //   topLavelCategory: "",
      //   secondLavelCategory: "",
      //   thirdLavelCategory: "",
      //   description: "",
      // });
      setHasSizes(false);
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("❌ Product upload failed. Please try again!");
    } finally {
      setLoading(false); // stop loader
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // start loader

  //   try {
  //     const uploadedColorVariants = await Promise.all(
  //       productData.colorVariants.map(async (variant) => {
  //         const uploadedImages = await Promise.all(
  //           variant.images.map(async (img) => {
  //             const url = img.file ? await uploadImage(img.file) : "";
  //             return {
  //               label: img.label || "front",
  //               url: url,
  //             };
  //           })
  //         );

  //         return {
  //           color: variant.color,
  //           images: uploadedImages,
  //         };
  //       })
  //     );

  //     const totalQuantity = hasSizes
  //       ? productData.size.reduce(
  //           (sum, size) => sum + (Number(size.quantity) || 0),
  //           0
  //         )
  //       : Number(productData.quantity) || 0;

  //     const payload = {
  //       ...productData,
  //       colorVariants: uploadedColorVariants,
  //       price: Number(productData.price),
  //       discountedPrice: Number(productData.discountedPrice),
  //       discountPersent: Number(productData.discountPersent),
  //       quantity: totalQuantity,
  //       ...(hasSizes && {
  //         size: productData.size
  //           .filter((size) => size.name && size.quantity)
  //           .map((s) => ({
  //             name: s.name,
  //             quantity: Number(s.quantity),
  //           })),
  //       }),
  //     };

  //     await dispatch(createProduct({ data: payload, jwt }));

  //     toast.success(" Product uploaded successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("❌ Product upload failed. Please try again!");
  //   } finally {
  //     setLoading(false); // stop loader
  //   }
  // };
  return (
    <Fragment>
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10">
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={3}>
          {/* Basic Product Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Basic Information
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Pricing Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Pricing
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
              inputProps={{ min: 0, max: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
              required
              inputProps={{ min: 0 }}
            />
          </Grid>
          {/* Inventory Management */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Inventory
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasSizes}
                  onChange={handleToggleSizes}
                  name="hasSizes"
                  color="primary"
                />
              }
              label="This product has different sizes"
            />
          </Grid>

          {!hasSizes && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
                required
                inputProps={{ min: 0 }}
              />
            </Grid>
          )}

          {hasSizes && (
            <>
              {productData.size.map((size, index) => (
                <Grid
                  container
                  item
                  spacing={2}
                  key={index}
                  alignItems="center"
                >
                  <Grid item xs={5} sm={5}>
                    <TextField
                      fullWidth
                      label="Size Name"
                      name="name"
                      value={size.name}
                      onChange={(e) => handleSizeChange(e, index)}
                      required
                    />
                  </Grid>
                  <Grid item xs={5} sm={5}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="size_quantity"
                      type="number"
                      value={size.quantity}
                      onChange={(e) => handleSizeChange(e, index)}
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    {productData.size.length > 1 && (
                      <IconButton
                        onClick={() => handleRemoveSize(index)}
                        color="error"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={handleAddSize}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add Size
                </Button>
              </Grid>
            </>
          )}

          {/* Categories */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Categories
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLavelCategory"
                value={productData.topLavelCategory}
                onChange={handleChange}
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLavelCategory"
                value={productData.secondLavelCategory}
                onChange={handleChange}
              >
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="gopi_dress">Gopi Dress</MenuItem>
                <MenuItem value="kurti">Kurti</MenuItem>
                <MenuItem value="dcoat">D Cot</MenuItem>
                <MenuItem value="blousess">Blouse</MenuItem>
                <MenuItem value="men_kurte">Men's kurte</MenuItem>
                <MenuItem value="men_shirt">Men's shirt</MenuItem>
                <MenuItem value="jewwllery">Jewellery</MenuItem>
                <MenuItem value="tshirt">T-Shirt</MenuItem>
                <MenuItem value="co_ord">CO ord</MenuItem>
                <MenuItem value="jacket">Jacket</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={thirdLevelOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value}
              value={
                thirdLevelOptions.find(
                  (opt) => opt.value === productData.thirdLavelCategory
                ) || null
              }
              onChange={(event, newValue) => {
                setProductData((prevState) => ({
                  ...prevState,
                  thirdLavelCategory: newValue ? newValue.value : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Third Level Category"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>

          {/* Color Variants */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Color Variants
              </Typography>
              <Button
                variant="outlined"
                onClick={handleAddColorVariant}
                startIcon={<AddCircleOutlineIcon />}
              >
                Add Color
              </Button>
            </Box>
            <Divider />
          </Grid>

          {productData.colorVariants.map((variant, variantIndex) => (
            <Fragment key={variantIndex}>
              <Grid container spacing={2} sx={{ mb: 3, p: 2, borderRadius: 1 }}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Color Variant #{variantIndex + 1}
                    </Typography>
                    {productData.colorVariants.length > 1 && (
                      <IconButton
                        onClick={() => handleRemoveColorVariant(variantIndex)}
                        color="error"
                        size="small"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Color Name"
                    value={variant.color}
                    onChange={(e) => handleColorVariantChange(e, variantIndex)}
                    required
                  />
                </Grid>
                {variant.images.map((img, imgIndex) => (
                  <DropzoneImageInput
                    key={imgIndex}
                    img={img}
                    variantIndex={variantIndex}
                    imgIndex={imgIndex}
                    label={imgIndex === 0 ? "Front Image" : `front ${imgIndex}`}
                    handleImageFileChange={handleImageFileChange}
                    handleRemoveImage={handleRemoveImage}
                    required={imgIndex === 0} // main is required
                  />
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddfrontImage(variantIndex)}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Add More Images
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          ))}

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Description
            </Typography>
            <Divider />
            <TextField
              fullWidth
              label="Product Description"
              multiline
              rows={4}
              name="description"
              value={productData.description}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Uploading...
                </>
              ) : (
                "Upload Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Fragment>
  );
};

export default CreateProductForm;
