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
  { id: "processing", title: "2. Order Processing" },
  { id: "timelines", title: "3. Shipping Timelines" },
  { id: "charges", title: "4. Shipping Charges" },
  { id: "tracking", title: "5. Order Tracking" },
  { id: "notes", title: "6. Important Notes" },
  { id: "contact", title: "7. Contact Us" },
];

export default function ShippingPolicy() {
  const effectiveDate = "05-07-2025";

  const handleTOCClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }} style={{
        zIndex: "0"
      }}>
        <Toolbar sx={{ py: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Ramya Vastram — Shipping & Delivery
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Quick Navigation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {sections.map((sec) => (
                  <ListItemButton key={sec.id} component="a" href={`#${sec.id}`} onClick={handleTOCClick(sec.id)}>
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
            <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, border: 1, borderColor: "divider" }}>
              <Section id="intro" title="1. Introduction">
                <Typography variant="body1" paragraph>
                  At <strong>Ramya Vastram</strong>, your treasured pieces are carefully packed and shipped with attention to time and tradition. Here’s everything you need to know about our shipping and delivery process.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="processing" title="2. Order Processing">
                <Bullet>Orders are processed within 2–4 business days after order confirmation.</Bullet>
                <Bullet>Orders placed on Sundays or national holidays are processed the next working day.</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="timelines" title="3. Shipping Timelines">
                <Bullet>Domestic (India): 5–8 business days after dispatch</Bullet>
                <Bullet>International: 10–15 business days after dispatch</Bullet>
                <Bullet>Delays may occur due to high demand during festivals or unforeseen courier delays.</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="charges" title="4. Shipping Charges">
                <Bullet>India: Free shipping on all prepaid orders</Bullet>
                <Bullet>International: Charges calculated at checkout based on destination and weight</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="tracking" title="5. Order Tracking">
                <Typography variant="body1" paragraph>
                  Once dispatched, tracking details will be shared via email or SMS. Please allow 24–48 hours for tracking links to activate.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="notes" title="6. Important Notes">
                <Bullet>In case of delayed delivery or package issues, please contact us within 48 hours of expected delivery date.</Bullet>
                <Bullet>If a package is returned due to an incorrect or incomplete address, additional charges may apply for re-delivery.</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              <Section id="contact" title="7. Contact Us">
                <Typography variant="body1" paragraph>
                  For any queries regarding shipping and delivery, feel free to reach us at:
                </Typography>
                <Typography variant="body1">📧 Email: <MUILink href="mailto:ramyavastram@gmail.com">ramyavastram@gmail.com</MUILink></Typography>
                <Typography variant="body1">📞 Phone: +91 91791 37954</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>✨ Return with confidence — because tradition deserves care and respect.</Typography>
              </Section>
            </Paper>
          </Grid>

          {/* Sidebar TOC (desktop) */}
          <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Paper elevation={0} sx={{ position: { md: "sticky" }, top: { md: 88 }, p: 2.5, borderRadius: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>On this page</Typography>
              <Divider sx={{ mb: 1.5 }} />
              <List dense>
                {sections.map((sec) => (
                  <ListItemButton key={sec.id} component="a" href={`#${sec.id}`} onClick={handleTOCClick(sec.id)}>
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
    <Typography variant="body1" paragraph sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
      <Box component="span" sx={{ mt: "6px", width: 6, height: 6, borderRadius: 2, bgcolor: "text.secondary", flex: "0 0 auto" }} />
      <span>{children}</span>
    </Typography>
  );
}
