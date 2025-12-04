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
  { id: "consent", title: "1. Your Consent" },
  { id: "information", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Your Information" },
  { id: "cookies", title: "4. Cookies" },
  { id: "third-party", title: "5. Third-Party Sharing" },
  { id: "rights", title: "6. Your Rights (GDPR/CCPA)" },
  { id: "children", title: "7. Children’s Privacy" },
  { id: "updates", title: "8. Updates to This Policy" },
  { id: "contact", title: "9. Contact Us" },
];

export default function PrivacyPolicy() {
  const lastUpdated = "August 16, 2025";

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
            Ramya Vastram — Privacy Policy
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip label={`Last updated: ${lastUpdated}`} variant="outlined" />
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
              <Typography variant="body1" paragraph>
                At <strong>Ramya Vastram</strong>, we are committed to preserving the privacy of every visitor who graces our platform. This Privacy Policy outlines how your information is collected, used, and protected as you browse through our timeless collection.
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* 1. Your Consent */}
              <Section id="consent" title="1. Your Consent">
                <Typography variant="body1" paragraph>
                  By using our website, you agree to our Privacy Policy and consent to the use of your information as outlined below.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 2. Information We Collect */}
              <Section id="information" title="2. Information We Collect">
                <Bullet>Your name, email, phone number, and shipping address</Bullet>
                <Bullet>Billing and payment details when placing an order</Bullet>
                <Bullet>Messages or queries sent via contact forms</Bullet>
                <Bullet>Preferences and shopping behaviour to enhance your experience</Bullet>
                <Bullet>Anonymous data such as browser type, IP address, and device type for analytics</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 3. How We Use Your Information */}
              <Section id="usage" title="3. How We Use Your Information">
                <Bullet>Fulfill and deliver your orders</Bullet>
                <Bullet>Enhance your browsing and shopping experience</Bullet>
                <Bullet>Send order confirmations, shipping updates, and customer support replies</Bullet>
                <Bullet>Share exclusive offers, new collection updates, and festive greetings (if opted in)</Bullet>
                <Bullet>Prevent fraud and improve website security</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 4. Cookies */}
              <Section id="cookies" title="4. Cookies">
                <Typography variant="body1" paragraph>
                  Ramya Vastram uses cookies to remember your preferences, show you relevant products and offers, and analyze site traffic for performance improvements. You may disable cookies in your browser settings.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 5. Third-Party Sharing */}
              <Section id="third-party" title="5. Third-Party Sharing">
                <Bullet>We do not sell your personal data.</Bullet>
                <Bullet>We may share limited information with payment gateways, logistics partners, and marketing platforms (only with consent).</Bullet>
                <Bullet>All third-party partners are obligated to protect your data.</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 6. Your Rights */}
              <Section id="rights" title="6. Your Rights (GDPR/CCPA Compliant)">
                <Bullet>Access the personal data we hold</Bullet>
                <Bullet>Request correction or deletion</Bullet>
                <Bullet>Object to or limit certain uses</Bullet>
                <Bullet>Withdraw consent for marketing at any time</Bullet>
                <Typography variant="body1" paragraph>
                  To make a request, email us at <MUILink href="mailto:privacy@ramyavastram.com">privacy@ramyavastram.com</MUILink>.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 7. Children’s Privacy */}
              <Section id="children" title="7. Children’s Privacy">
                <Typography variant="body1" paragraph>
                  Our site and offerings are not intended for children under the age of 13. We do not knowingly collect data from minors.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 8. Updates */}
              <Section id="updates" title="8. Updates to This Policy">
                <Typography variant="body1" paragraph>
                  This Privacy Policy may be updated to reflect changes in practices or regulations. We encourage you to review it periodically.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 9. Contact Us */}
              <Section id="contact" title="9. Contact Us">
                <Typography variant="body1" paragraph>
                  If you have any privacy-related queries or data requests, please reach out to:
                </Typography>
                <Typography variant="body1">📧 Email: <MUILink href="mailto:privacy@ramyavastram.com">privacy@ramyavastram.com</MUILink></Typography>
                <Typography variant="body1">📍 Address: 123 Main Street, City, Country</Typography>
                <Typography variant="body1">📞 Phone: +1 (555) 123-4567</Typography>
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
