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
  { id: "eligibility", title: "2. Eligibility & Accounts" },
  { id: "products", title: "3. Products & Availability" },
  { id: "orders", title: "4. Orders & Payments" },
  { id: "shipping", title: "5. Shipping & Delivery" },
  { id: "returns", title: "6. Returns, Replacements & Cancellations" },
  { id: "ip", title: "7. Intellectual Property" },
  { id: "acceptable-use", title: "8. Acceptable Use" },
  { id: "communication", title: "9. Communication" },
  { id: "liability", title: "10. Liability Disclaimer" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "termination", title: "12. Suspension or Termination" },
  { id: "modifications", title: "13. Modifications" },
  { id: "law", title: "14. Governing Law" },
  { id: "contact", title: "15. Contact Information" },
];

export default function TermsAndConditions() {
  const lastUpdated = "August 16, 2025"; // keep this current as needed

  const handleTOCClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // update URL hash without jumping

  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }} style={{
        zIndex: "0"
      }}>
        <Toolbar sx={{ py: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Ramya Vastram — Terms & Conditions
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
              {/* 1. Introduction */}
              <Section id="intro" title="1. Introduction">
                <Typography variant="body1" paragraph>
                  Welcome to <strong>Ramya Vastram</strong>. By accessing or using this website and placing an order, you agree to comply with the Terms & Conditions outlined below. If you do not agree, please discontinue use of the website.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 2. Eligibility & Accounts */}
              <Section id="eligibility" title="2. Eligibility & Accounts">
                <Bullet>
                  Services are available only to individuals legally capable of entering into binding contracts under Indian law.
                </Bullet>
                <Bullet>
                  Users under 18 years of age may access the site only under the supervision of a parent or legal guardian.
                </Bullet>
                <Bullet>
                  Account holders are responsible for maintaining accurate details and safeguarding their login credentials.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 3. Products & Availability */}
              <Section id="products" title="3. Products & Availability">
                <Bullet>All products displayed on the website are subject to availability.</Bullet>
                <Bullet>
                  Descriptions, images, and prices are provided as accurately as possible, though slight variations may occur.
                </Bullet>
                <Bullet>Prices and product availability may change without prior notice.</Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 4. Orders & Payments */}
              <Section id="orders" title="4. Orders & Payments">
                <Bullet>Orders are processed through the official website only.</Bullet>
                <Bullet>
                  Payments can be made via debit/credit cards, UPI, net banking, and cash on delivery (where available).
                </Bullet>
                <Bullet>
                  An order may be cancelled in cases of stock unavailability, incorrect pricing, or suspected fraudulent activity.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 5. Shipping & Delivery */}
              <Section id="shipping" title="5. Shipping & Delivery">
                <Bullet>
                  Delivery is available across India. Standard delivery timelines are 5–7 business days, extending up to 10 days for remote locations.
                </Bullet>
                <Bullet>
                  A detailed Shipping Policy is available separately on the website.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 6. Returns, Replacements & Cancellations */}
              <Section id="returns" title="6. Returns, Replacements & Cancellations">
                <Bullet>
                  Products are eligible for replacement only in cases of manufacturing defect or damage in transit.
                </Bullet>
                <Bullet>
                  Customers must provide proof such as an unboxing video and retain the original packaging.
                </Bullet>
                <Bullet>
                  Order cancellations are possible only before dispatch. Once dispatched, requests will be handled under the replacement policy.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 7. Intellectual Property */}
              <Section id="ip" title="7. Intellectual Property">
                <Bullet>
                  All text, designs, images, and other content on this website belong to Ramya Vastram.
                </Bullet>
                <Bullet>
                  Any reproduction, distribution, or unauthorized use of the content is strictly prohibited.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 8. Acceptable Use */}
              <Section id="acceptable-use" title="8. Acceptable Use">
                <Bullet>
                  Users may not misuse the website for illegal purposes, attempt unauthorized access, or provide false information.
                </Bullet>
                <Bullet>
                  Fraudulent, abusive, or harmful activity will result in termination of access.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 9. Communication */}
              <Section id="communication" title="9. Communication">
                <Bullet>
                  By creating an account or placing an order, you consent to receive communications via email, SMS, or WhatsApp regarding your transactions and promotional offers.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 10. Liability Disclaimer */}
              <Section id="liability" title="10. Liability Disclaimer">
                <Bullet>
                  The website and its services are provided on an “as available” basis.
                </Bullet>
                <Bullet>
                  Ramya Vastram shall not be held responsible for delays, damages, or losses caused by third-party logistics providers, unforeseen circumstances, or events beyond control.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 11. Indemnification */}
              <Section id="indemnification" title="11. Indemnification">
                <Bullet>
                  Customers agree to indemnify and hold Ramya Vastram harmless against any claims, liabilities, damages, or expenses arising from misuse of the website or breach of these Terms.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 12. Suspension or Termination */}
              <Section id="termination" title="12. Suspension or Termination">
                <Bullet>
                  Access to the website may be suspended or permanently terminated if these Terms are violated or if fraudulent activity is detected.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 13. Modifications */}
              <Section id="modifications" title="13. Modifications">
                <Bullet>
                  Ramya Vastram reserves the right to update or amend these Terms & Conditions at any time. Updated versions will be published on this page and will take effect immediately.
                </Bullet>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 14. Governing Law */}
              <Section id="law" title="14. Governing Law">
                <Typography variant="body1" paragraph>
                  All disputes shall be governed by Indian law, with courts located in <strong>Ujjain, Madhya Pradesh</strong> holding exclusive jurisdiction.
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* 15. Contact Information */}
              <Section id="contact" title="15. Contact Information">
                <Typography variant="body1" paragraph>
                  For any questions or concerns regarding these Terms & Conditions:
                </Typography>
                <Typography variant="body1">Email: <MUILink href="mailto:ramyavastram@gmail.com">ramyavastram@gmail.com</MUILink></Typography>
                <Typography variant="body1">Phone: <MUILink href="tel:+919589945653">+91-95899 45653</MUILink></Typography>
                <Typography variant="body1">Hours: Monday–Saturday, 10 AM – 6 PM</Typography>
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
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        {/* Empty subtitle area for future notes/policy links */}
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
