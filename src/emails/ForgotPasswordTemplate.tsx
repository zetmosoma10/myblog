import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Tailwind,
  Head,
  Font,
  Heading,
  Hr,
  Section,
} from "@react-email/components";
import { render } from "@react-email/render";

type Props = {
  email: string;
  otp: string;
};

const ForgotPasswordTemplate = ({ otp, email }: Props) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              background: "#020810",
              surface: "#081525",
              primary: "#7eb8f7",
              foreground: "#e8f4ff",
              muted: "#3a5570",
              border: "#0d2035",
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Your password reset code for myblog</Preview>
        <Body className="bg-background font-mono m-0 p-0">
          <Container className="max-w-120 mx-auto py-10 px-5">
            {/* Header */}
            <Section className="mb-8">
              <Text className="text-primary text-sm tracking-widest m-0">
                // myblog
              </Text>
            </Section>

            {/* Card */}
            <Section className="bg-surface border border-border rounded-lg p-8">
              <Heading className="text-foreground text-xl font-bold m-0 mb-4 tracking-tight">
                Reset your password
              </Heading>

              <Text className="text-primary text-sm leading-relaxed m-0 mb-3">
                Hi Zet,
              </Text>
              <Text className="text-primary text-sm leading-relaxed m-0 mb-3">
                We received a request to reset the password for the following
                emal: {email}
              </Text>
              <Text>Enter the code below to reset your password:</Text>
              {/* OTP */}
              <Section className="bg-border rounded-md py-5 px-8 text-center mb-6">
                <Text className="text-foreground text-4xl font-bold tracking-[0.3em] m-0">
                  {otp}
                </Text>
              </Section>

              <Text className="text-muted text-xs m-0 mb-6">
                This code expires in <strong>5 minutes</strong>.
              </Text>

              <Hr className="border-border my-5" />

              <Text className="text-muted text-xs leading-relaxed m-0">
                If you didn't request this, you can safely ignore this email.
                Your password will not be changed.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export const htmlEmail = async ({ email, otp }: Props) => {
  return await render(<ForgotPasswordTemplate email={email} otp={otp} />);
};

export default ForgotPasswordTemplate;
