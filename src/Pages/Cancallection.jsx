import * as React from "react";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Fab,
  Grid,
  Link as MUILink,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// "Back to Top" helper
function ScrollTop({ children }) {
  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window : undefined,
    disableHysteresis: true,
    threshold: 200,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "center" });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const sections = [
  { id: "intro", title: "1. Introduction" },
  { id: "cancellation", title: "2. Cancellation Policy" },
  { id: "returns", title: "3. Return & Exchange Policy" },
  { id: "not-eligible", title: "4. Items Not Eligible for Return" },
  { id: "initiate", title: "5. How to Initiate a Return" },
  { id: "shipping-costs", title: "6. Return Shipping Costs" },
  { id: "contact", title: "7. Contact Us" },
];

export default function CancellationReturnPolicy() {
  const effectiveDate = "05-07-2025";

  const handleTOCClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
        style={{ zIndex: "0" }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Ramya Vastram — Cancellation & Return Policy
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip label={`Effective Date: ${effectiveDate}`} variant="outlined" />
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" sx={{ minHeight: 8 }} />

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        {/* Mobile TOC */}
        <Box sx={{ display: { xs: "block", md: "none" }, mb: 2 }}>
          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Quick Navigation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {sections.map((sec) => (
                  <ListItemButton
                    key={sec.id}
                    component="a"
                    href={`#${sec.id}`}
                    onClick={handleTOCClick(sec.id)}
                  >
                    <ListItemText primary={sec.title} />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Main content */}
          <Grid item xs={12} md={9}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Section id="intro" title="1. Introduction">
                <Typography variant="body1" paragraph>
                  At <strong>Ramya Vastram</strong>, we value the care you take
                  in choosing traditional wear that speaks to your grace. Every
                  garment is made and packed with love. However, we understand
                  that sometimes things may need to be exchanged or returned.
                  Below is our clearly outlined policy to ensure a smooth
                  experience.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="cancellation" title="2. Cancellation Policy">
                <Bullet>
                  Orders can be cancelled within 12 hours of placing them.
                </Bullet>
                <Bullet>
                  To cancel, email us at{" "}
                  <MUILink href="mailto:ramyavastram@gmail.com">
                    ramyavastram@gmail.com
                  </MUILink>{" "}
                  with your order ID.
                </Bullet>
                <Bullet>
                  Cancellations after 12 hours or post-dispatch will not be
                  accepted as our artisans begin processing your order swiftly.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="returns" title="3. Return & Exchange Policy">
                <Bullet>You received an incorrect item or a damaged product.</Bullet>
                <Bullet>You notify us within 3 days of receiving the order.</Bullet>
                <Bullet>
                  The product is unused, unwashed, and in its original condition
                  with tags and packaging intact.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="not-eligible" title="4. Items Not Eligible for Return">
                <Bullet>Custom-made or altered outfits</Bullet>
                <Bullet>
                  Products purchased on sale, during promotional offers, or
                  marked “Final Sale”
                </Bullet>
                <Bullet>
                  Items returned without original tags or that show signs of use
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="initiate" title="5. How to Initiate a Return">
                <Typography variant="body1" paragraph>
                  Email{" "}
                  <MUILink href="mailto:ramyavastram@gmail.com">
                    ramyavastram@gmail.com
                  </MUILink>{" "}
                  with your order ID, product photos, and reason for return.
                </Typography>
                <Typography variant="body1" paragraph>
                  Our support team will review your request within 1–2 business
                  days.
                </Typography>
                <Typography variant="body1" paragraph>
                  If approved, we will share return instructions with you. Once
                  we receive and inspect the item, you will receive:
                </Typography>
                <Bullet>A store credit (valid for 6 months)</Bullet>
                <Bullet>Or an exchange, as applicable</Bullet>
                <Typography variant="body1" paragraph>
                  Refunds are not currently provided; only exchanges or store
                  credits will be issued.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="shipping-costs" title="6. Return Shipping Costs">
                <Bullet>
                  If the return is due to damage or error on our part, we will
                  cover the return shipping.
                </Bullet>
                <Bullet>
                  In all other approved cases, the customer is responsible for
                  return shipping.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="contact" title="7. Contact Us">
                <Typography variant="body1" paragraph>
                  For any concerns, feel free to contact us:
                </Typography>
                <Typography variant="body1">
                  📧 Email:{" "}
                  <MUILink href="mailto:ramyavastram@gmail.com">
                    ramyavastram@gmail.com
                  </MUILink>
                </Typography>
                <Typography variant="body1">📞 Phone: +91 91791 37954</Typography>
              </Section>
            </Paper>
          </Grid>

          {/* Sidebar TOC (desktop) */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Paper
              elevation={0}
              sx={{
                position: { md: "sticky" },
                top: { md: 88 },
                p: 2.5,
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mb: 1 }}
              >
                On this page
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <List dense>
                {sections.map((sec) => (
                  <ListItemButton
                    key={sec.id}
                    component="a"
                    href={`#${sec.id}`}
                    onClick={handleTOCClick(sec.id)}
                  >
                    <ListItemText primary={sec.title} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}

function Section({ id, title, children }) {
  return (
    <Box id={id} sx={{ scrollMarginTop: (theme) => theme.spacing(12) }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
}

function Bullet({ children }) {
  return (
    <Typography
      variant="body1"
      paragraph
      sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
    >
      <Box
        component="span"
        sx={{
          mt: "6px",
          width: 6,
          height: 6,
          borderRadius: 2,
          bgcolor: "text.secondary",
          flex: "0 0 auto",
        }}
      />
      <span>{children}</span>
    </Typography>
  );
}
