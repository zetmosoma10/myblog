import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

type NewPostEmailProps = {
  postTitle: string;
  postExcerpt: string;
  postUrl: string;
  tags: string[];
};

const NewPostEmail = ({
  postTitle,
  postExcerpt,
  postUrl,
  tags,
}: NewPostEmailProps) => {
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
        <Head />
        <Preview>New post: {postTitle}</Preview>
        <Body className="bg-background m-0 p-0">
          <Container className="max-w-140 mx-auto py-10 px-5">
            {/* Header */}
            <Section className="mb-8">
              <Text className="text-primary text-sm tracking-widest m-0">
                // myblog
              </Text>
            </Section>

            {/* Card */}
            <Section className="bg-surface border border-border rounded-lg p-8">
              <Text className="text-muted text-[10px] tracking-widest uppercase m-0 mb-4">
                // new post
              </Text>

              <Heading className="text-foreground text-xl font-bold m-0 mb-3 tracking-tight">
                {postTitle}
              </Heading>

              {/* Tags */}
              <Section className="mb-4">
                {tags.map((tag) => (
                  <Text
                    key={tag}
                    className="inline-block text-primary text-[10px] tracking-wide border border-primary/30 rounded px-2 py-0.5 mr-2 m-0"
                  >
                    {tag}
                  </Text>
                ))}
              </Section>

              <Text className="text-muted text-sm leading-relaxed m-0 mb-6">
                {postExcerpt}
              </Text>

              <Button
                href={postUrl}
                className="bg-primary text-background text-xs font-semibold px-6 py-3 rounded-md no-underline"
              >
                Read post →
              </Button>

              <Hr className="border-border my-6" />

              <Text className="text-muted text-xs m-0">
                You're receiving this because you subscribed to myblog.
                <br />
                <a href="{unsubscribeUrl}" className="text-primary">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewPostEmail;
