import { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, findProductById } from "../../../Redux/Customers/Product/Action";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [hasSizes, setHasSizes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [productData, setProductData] = useState({
    colorVariants: [
      {
        color: "",
        images: [
          { label: "front", url: "" },
          { label: "back", url: "" },
          { label: "side", url: "" },
          { label: "detail", url: "" },
          { label: "closeup", url: "" },
          { label: "fullview", url: "" },
        ],
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

  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { productId } = useParams();

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        await dispatch(findProductById({ productId, jwt }));
      } catch (err) {
        setError("Failed to fetch product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, dispatch, jwt]);

  // Set form data when product is loaded
  useEffect(() => {
    if (customersProduct.product) {
      const product = customersProduct.product;
      
      const productHasSizes = product.size && product.size.length > 0;
      setHasSizes(productHasSizes);
      
      const preparedColorVariants = product.colorVariants.map(variant => {
        const standardImages = [
          { label: "front", url: variant.images.find(img => img.label === "front")?.url || "" },
          { label: "back", url: variant.images.find(img => img.label === "back")?.url || "" },
          { label: "side", url: variant.images.find(img => img.label === "side")?.url || "" },
          { label: "detail", url: variant.images.find(img => img.label === "detail")?.url || "" },
          { label: "closeup", url: variant.images.find(img => img.label === "closeup")?.url || "" },
          { label: "fullview", url: variant.images.find(img => img.label === "fullview")?.url || "" },
        ];
        
        const extraImages = variant.images.filter(img => 
          !["front", "back", "side", "detail", "closeup", "fullview"].includes(img.label)
        ).map(img => ({
          label: img.label,
          url: img.url
        }));

        return {
          color: variant.color,
          images: [...standardImages, ...extraImages]
        };
      });

      setProductData({
        ...product,
        colorVariants: preparedColorVariants,
        quantity: productHasSizes ? "" : product.quantity,
        size: productHasSizes ? product.size : [],
      });
    }
  }, [customersProduct.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData(prev => ({ ...prev, size: sizes }));
  };

  const handleAddSize = () => {
    setProductData(prev => ({
      ...prev,
      size: [...prev.size, { name: "", quantity: "" }]
    }));
  };

  const handleRemoveSize = (index) => {
    const sizes = [...productData.size];
    sizes.splice(index, 1);
    setProductData(prev => ({ ...prev, size: sizes }));
  };

  const handleToggleSizes = (e) => {
    const checked = e.target.checked;
    setHasSizes(checked);
    setProductData(prev => ({
      ...prev,
      size: checked ? (prev.size.length > 0 ? prev.size : [{ name: "", quantity: "" }]) : []
    }));
  };

  const handleColorVariantChange = (e, index, imageLabel = null) => {
    const { value } = e.target;
    const updatedVariants = [...productData.colorVariants];

    if (imageLabel) {
      const imgIndex = updatedVariants[index].images.findIndex(
        img => img.label === imageLabel
      );
      if (imgIndex !== -1) updatedVariants[index].images[imgIndex].url = value;
    } else {
      updatedVariants[index].color = value;
    }

    setProductData(prev => ({ ...prev, colorVariants: updatedVariants }));
  };

const thirdLevelOptions = [
    {label: "TISSUE SAREE WITH BORDER", value: "tissue_saree_with_border" },
    { label: "Khadi", value: "khadi" },
    { label: "120 Thread Cotton Mul", value: "thread_cotton_mul" },
    { label: "Tissue", value: "tissue" },
    { label: "LINEN", value: "linen" },
    { label: "Kota Doriya", value: "kota_doriya" },
    { label: "Half and Half soft Khadi Saree", value: "half_soft_khadi" },
    { label: "KHADI SHIULI", value: "khadi_shiuli" },
    { label: "Flower Mul Cotton Saree", value: "flower_mul_cotton_saree" },
    { label: "Love Cotton Saree", value: "love_cotton_saree" },
    { label: "Resham Kota Saree", value: "resham_kota_saree" },
    {
      label: "Umbrella Embroidery dhoop chav Khadi Saree",
      value: "umbrella_dhoop_chav_saree", 
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
    { label: "Kurti", value: "Kurti" },
    { label: "Gopi Dress", value: "gopi_dress" },
    { label: "Khesh Shiuli", value: "khesh_shiuli" },
   
  ];  

  const handleAddColorVariant = () => {
    setProductData(prev => ({
      ...prev,
      colorVariants: [
        ...prev.colorVariants,
        {
          color: "",
          images: [
            { label: "front", url: "" },
            { label: "back", url: "" },
            { label: "side", url: "" },
            { label: "detail", url: "" },
            { label: "closeup", url: "" },
            { label: "fullview", url: "" },
          ],
        },
      ],
    }));
  };

  const handleRemoveColorVariant = (index) => {
    if (productData.colorVariants.length <= 1) return;
    const updatedVariants = [...productData.colorVariants];
    updatedVariants.splice(index, 1);
    setProductData(prev => ({ ...prev, colorVariants: updatedVariants }));
  };

  const handleAddExtraImage = (variantIndex) => {
    const updatedVariants = [...productData.colorVariants];
    updatedVariants[variantIndex].images.push({ label: "", url: "" });
    setProductData(prev => ({ ...prev, colorVariants: updatedVariants }));
  };

  const handleRemoveExtraImage = (variantIndex, imageIndex) => {
    if (imageIndex >= 6) {
      const updatedVariants = [...productData.colorVariants];
      updatedVariants[variantIndex].images.splice(imageIndex, 1);
      setProductData(prev => ({ ...prev, colorVariants: updatedVariants }));
    }
  };

  const handleExtraImageChange = (e, variantIndex, imageIndex, field) => {
    const { value } = e.target;
    const updatedVariants = [...productData.colorVariants];
    updatedVariants[variantIndex].images[imageIndex][field] = value;
    setProductData(prev => ({ ...prev, colorVariants: updatedVariants }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const totalQuantity = hasSizes 
        ? productData.size.reduce((sum, size) => sum + (Number(size.quantity) || 0), 0)
        : Number(productData.quantity) || 0;

      const payload = {
        ...productData,
        colorVariants: productData.colorVariants.map(variant => ({
          color: variant.color,
          images: variant.images.filter(img => img.url !== "").map(img => ({
            label: img.label || "extra",
            url: img.url,
          })),
        })),
        price: Number(productData.price),
        discountedPrice: Number(productData.discountedPrice),
        discountPersent: Number(productData.discountPersent),
        quantity: totalQuantity,
        ...(hasSizes && {
          size: productData.size
            .filter(size => size.name && size.quantity)
            .map(s => ({
              name: s.name,
              quantity: Number(s.quantity),
            })),
        }),
      };

      await dispatch(updateProduct({ productId, data: payload, jwt }));
      setSuccess(true);
    } catch (err) {
      setError("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !customersProduct.product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !customersProduct.product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Fragment>
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10">
        Update Product
      </Typography>
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Product updated successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="min-h-screen">
        <Grid container spacing={3}>
          {/* Basic Information */}
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

          {/* Pricing */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Pricing
            </Typography>
            <Divider />
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

          {/* Inventory */}
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

          {!hasSizes ? (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
                required={!hasSizes}
                inputProps={{ min: 0 }}
              />
            </Grid>
          ) : (
            <>
              {productData.size.map((size, index) => (
                <Grid container item spacing={2} key={index} alignItems="center">
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
                      <IconButton onClick={() => handleRemoveSize(index)} color="error">
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
                <MenuItem value="dcot">D Cot</MenuItem>
                <MenuItem value="blouse">Blouse</MenuItem>
                <MenuItem value="men_kurte">Men's kurte</MenuItem>
                <MenuItem value="men_shirt">Men's shirt</MenuItem>
                <MenuItem value="jewwllery">Jewellery</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={thirdLevelOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={
                thirdLevelOptions.find(
                  (opt) => opt.value === productData.thirdLavelCategory
                ) || null
              }
              onChange={(event, newValue) => {
                setProductData(prev => ({
                  ...prev,
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
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
              <Grid container spacing={2} sx={{ mb: 3, p: 2, borderRadius: 1, border: "1px solid #eee" }}>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
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
                  <Grid item xs={12} sm={4} key={imgIndex}>
                    {imgIndex < 6 ? (
                      <TextField
                        fullWidth
                        label={`${img.label} Image URL`}
                        value={img.url}
                        onChange={(e) =>
                          handleColorVariantChange(e, variantIndex, img.label)
                        }
                        required={imgIndex < 2}
                      />
                    ) : (
                      <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                          fullWidth
                          label="Image Label"
                          value={img.label}
                          onChange={(e) =>
                            handleExtraImageChange(e, variantIndex, imgIndex, "label")
                          }
                          sx={{ mb: 1 }}
                        />
                        <IconButton 
                          onClick={() => handleRemoveExtraImage(variantIndex, imgIndex)}
                          color="error"
                          size="small"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          fullWidth
                          label="Image URL"
                          value={img.url}
                          onChange={(e) =>
                            handleExtraImageChange(e, variantIndex, imgIndex, "url")
                          }
                        />
                      </Box>
                    )}
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddExtraImage(variantIndex)}
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
              type="submit"
              size="large"
              fullWidth
              sx={{ p: 1.8 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Update Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default UpdateProduct;