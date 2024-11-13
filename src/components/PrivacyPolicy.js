import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="body1" paragraph>
          Flying Comet Games ("we," "us," or "our") respects your privacy. This
          Privacy Policy explains how we collect, use, and protect your
          information when you use our website and games (collectively, the
          "Services").
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          1. Information We Collect
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          1.1 Information You Provide:
        </Typography>
        <Typography variant="body1" paragraph>
          • Account Information: Email address and username when you create an
          account through Stytch • Game Progress: Scores, completion status,
          streaks, and leaderboard positions • Time-based Data: Game completion
          times and activity timestamps
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          1.2 Information Collected Automatically:
        </Typography>
        <Typography variant="body1" paragraph>
          • Usage Data: How you interact with our games and services • Analytics
          Data: Game performance, feature usage, and general service interaction
          • Cookie Data: Session information and analytics preferences
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to: • Provide and improve our Services •
          Maintain game progress and leaderboards • Track achievements and
          streaks • Analyze game performance and usage patterns • Communicate
          with you about your account or our Services • Ensure fair gameplay and
          maintain service integrity
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          3. Data Sharing and Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          We share your information with: • Stytch: For user authentication •
          Mixpanel: For analytics and performance tracking • Google: For
          advertising services • Turso: For data storage We only share necessary
          data with these services to provide our core functionality. We may
          share anonymized, aggregated data for analytics purposes.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          4. Cookies and Tracking
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies to: • Maintain session information (expires after 60
          minutes) • Remember your analytics preferences • Track basic usage
          patterns You can control cookie preferences through your browser
          settings. Refusing cookies may impact some functionality of our
          Services.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          5. Data Retention and Security
        </Typography>
        <Typography variant="body1" paragraph>
          • We store your data on secure servers in the United States • Account
          and game data is retained indefinitely unless you request deletion •
          Log data is automatically cleaned up every 90 days • We implement
          appropriate security measures to protect your information
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          6. Your Rights and Choices
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to: • Access your personal information • Request
          deletion of your account and data • Opt-out of analytics tracking •
          Control cookie preferences To exercise these rights, please contact us
          at calli@flyingcometgames.com.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          7. Age Restrictions
        </Typography>
        <Typography variant="body1" paragraph>
          Our Services are not intended for users under 13 years of age. We do
          not knowingly collect information from children under 13. If we
          discover we have collected information from a child under 13, we will
          delete that information immediately.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          8. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. We will notify
          you of any material changes by posting the new Privacy Policy on this
          page and updating the "Last Updated" date. Your continued use of our
          Services after such modifications constitutes your acceptance of the
          updated Privacy Policy.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          9. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy or would like to
          exercise your privacy rights, please contact us at
          calli@flyingcometgames.com.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          Flying Comet Games - Privacy Policy
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
