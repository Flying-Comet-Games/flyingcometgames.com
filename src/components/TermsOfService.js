import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Container, Divider } from "@mui/material";
import Footer from "./Footer";

const TermsOfUse = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Box maxWidth="md"  margin="auto" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Terms of Use
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to Flying Comet Games! These Terms of Use ("Terms") govern
          your access to and use of Flying Comet Games' website, games, and
          services (collectively, the "Services"). Please read these Terms
          carefully before using our Services.
        </Typography>

        <Typography variant="body1" paragraph>
          By accessing or using our Services, you agree to be bound by these
          Terms. If you do not agree to these Terms, do not access or use our
          Services.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          1. Age Requirements
        </Typography>
        <Typography variant="body1" paragraph>
          You must be at least 13 years old to use our Services. If we discover
          or have reason to believe you are under 13 years old, we will
          immediately terminate your account and delete your information from
          our systems. By using our Services, you represent and warrant that you
          meet this age requirement.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          2. Account Creation and Security
        </Typography>
        <Typography variant="body1" paragraph>
          To access certain features of our Services, you may need to create an
          account. We use Stytch for authentication services. You are
          responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account. You
          agree to notify us immediately of any unauthorized use of your
          account.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          3. Privacy and Data Collection
        </Typography>
        <Typography variant="body1" paragraph>
          We collect and process information about you when you use our
          Services. We use Mixpanel to analyze service usage and improve user
          experience. When you create an account, we collect your email address
          for authentication purposes. We do not collect or store personal
          information beyond what is necessary to provide our Services.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          4. Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to enhance your
          experience. You can opt out of non-essential cookies when you first
          visit our site. Essential cookies required for basic site
          functionality cannot be disabled. For more information about our
          cookie usage, please refer to our Cookie Policy.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          5. Service Features
        </Typography>
        <Typography variant="body1" paragraph>
          Our Services currently include free access to our online puzzle games.
          We maintain leaderboards and track game progress for users with
          accounts. We may offer premium features in the future through a paid
          subscription service. Details about premium features and pricing will
          be provided when available.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          6. Future Premium Services
        </Typography>
        <Typography variant="body1" paragraph>
          When premium services become available, subscribers will be able to
          cancel their subscription at any time. After cancellation, you will
          continue to have access to premium features until the end of your
          current billing period. No refunds will be provided for partial
          subscription periods.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          7. Prohibited Activities
        </Typography>
        <Typography variant="body1" paragraph>
          You agree not to: - Use our Services if you are under 13 years old -
          Attempt to gain unauthorized access to our Services - Interfere with
          or disrupt our Services - Create multiple accounts for abusive
          purposes - Use our Services for any illegal purpose - Share account
          credentials with others
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          8. Account Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to suspend or terminate your account at our
          discretion for violations of these Terms. To delete your account,
          please contact us at calli@flyingcometgames.com.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          9. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may modify these Terms at any time. We will notify users of any
          material changes via email or through our Services. Your continued use
          of our Services after such modifications constitutes acceptance of the
          updated Terms.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          10. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at
          calli@flyingcometgames.com.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      <Footer />
    </Container>
  );
};

export default TermsOfUse;
