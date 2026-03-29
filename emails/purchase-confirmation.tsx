import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Heading,
  Img,
  Row,
  Column,
} from "@react-email/components";
import { formatPrice } from "@/lib/format-price";

interface PurchaseConfirmationEmailProps {
  items: {
    product_name: string;
    price: number;
    download_url: string;
  }[];
  total: number;
  customerEmail?: string;
}

export default function PurchaseConfirmationEmail({
  items = [],
  total = 0,
}: PurchaseConfirmationEmailProps) {
  return (
    <Html lang="it">
      <Head />
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>🎓 Esame Facile</Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Text style={checkmark}>✅</Text>
            <Heading style={heroTitle}>Acquisto confermato!</Heading>
            <Text style={heroSubtitle}>
              Il tuo kit è pronto per il download. Inizia a studiare subito.
            </Text>
          </Section>

          {/* Items */}
          <Section style={itemsSection}>
            <Text style={sectionLabel}>IL TUO ORDINE</Text>
            {items.map((item, i) => (
              <Section key={i} style={itemCard}>
                <Row>
                  <Column>
                    <Text style={itemName}>{item.product_name}</Text>
                    <Text style={itemPrice}>{formatPrice(item.price)}</Text>
                  </Column>
                </Row>
                <Button href={item.download_url} style={downloadButton}>
                  ⬇ Scarica il tuo kit
                </Button>
              </Section>
            ))}
          </Section>

          {/* Total */}
          <Section style={totalSection}>
            <Row>
              <Column>
                <Text style={totalLabel}>Totale pagato</Text>
              </Column>
              <Column style={{ textAlign: "right" as const }}>
                <Text style={totalAmount}>{formatPrice(total)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Warning */}
          <Section style={warningBox}>
            <Text style={warningText}>
              ⏱ <strong>Attenzione:</strong> I link scadono tra 48 ore e puoi scaricare ogni file fino a 5 volte. Salvalo subito sul tuo dispositivo.
            </Text>
          </Section>

          {/* Support */}
          <Section style={supportSection}>
            <Text style={supportText}>
              Hai problemi con il download o domande sul kit?
            </Text>
            <Text style={supportText}>
              Scrivici su WhatsApp:{" "}
              <a href="https://wa.me/37258472379" style={link}>
                +372 584 72379
              </a>
              {" "}oppure via email a{" "}
              <a href="mailto:info@esamefacile.site" style={link}>
                info@esamefacile.site
              </a>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Buono studio! 💪 Il team di Esame Facile
            </Text>
            <Text style={footerSmall}>
              © 2026 Esame Facile — esamefacile.site
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body = {
  backgroundColor: "#f0f0f5",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  margin: 0,
  padding: "32px 0",
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden" as const,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
};

const header = {
  backgroundColor: "#1e1b4b",
  padding: "20px 32px",
  textAlign: "center" as const,
};

const logoText = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "700",
  margin: 0,
};

const heroSection = {
  padding: "36px 32px 24px",
  textAlign: "center" as const,
  backgroundColor: "#fafafa",
  borderBottom: "1px solid #f0f0f0",
};

const checkmark = {
  fontSize: "48px",
  margin: "0 0 12px",
};

const heroTitle = {
  color: "#1e1b4b",
  fontSize: "26px",
  fontWeight: "800",
  margin: "0 0 8px",
};

const heroSubtitle = {
  color: "#6b7280",
  fontSize: "15px",
  margin: 0,
  lineHeight: "1.5",
};

const itemsSection = {
  padding: "24px 32px 0",
};

const sectionLabel = {
  color: "#9ca3af",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  margin: "0 0 16px",
};

const itemCard = {
  backgroundColor: "#f8f8ff",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "12px",
  border: "1px solid #e8e8ff",
};

const itemName = {
  color: "#1e1b4b",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 4px",
};

const itemPrice = {
  color: "#6366f1",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 14px",
};

const downloadButton = {
  backgroundColor: "#6366f1",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  display: "block" as const,
  textAlign: "center" as const,
};

const totalSection = {
  padding: "16px 32px",
  borderTop: "1px solid #f0f0f0",
  borderBottom: "1px solid #f0f0f0",
  backgroundColor: "#fafafa",
};

const totalLabel = {
  color: "#6b7280",
  fontSize: "14px",
  margin: 0,
  fontWeight: "600",
};

const totalAmount = {
  color: "#1e1b4b",
  fontSize: "18px",
  fontWeight: "800",
  margin: 0,
};

const warningBox = {
  margin: "24px 32px 0",
  backgroundColor: "#fffbeb",
  borderRadius: "10px",
  padding: "14px 16px",
  border: "1px solid #fde68a",
};

const warningText = {
  color: "#92400e",
  fontSize: "13px",
  margin: 0,
  lineHeight: "1.6",
};

const supportSection = {
  padding: "20px 32px 0",
  textAlign: "center" as const,
};

const supportText = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "0 0 4px",
  lineHeight: "1.6",
};

const link = {
  color: "#6366f1",
  textDecoration: "underline",
};

const divider = {
  borderColor: "#f0f0f0",
  margin: "24px 0 0",
};

const footer = {
  padding: "20px 32px 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#374151",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
};

const footerSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: 0,
};
