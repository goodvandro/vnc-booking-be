export default ({ env }) => {
  const plugins: any = {};

  // Só configurar email se todas as variáveis existirem E o provider estiver instalado
  if (env("SMTP_HOST") && env("SMTP_USERNAME") && env("SMTP_PASSWORD")) {
    try {
      // Tentar carregar o provider para verificar se existe
      require("@strapi/provider-email-nodemailer");

      plugins.email = {
        config: {
          provider: "nodemailer",
          providerOptions: {
            host: env("SMTP_HOST", "smtppro.zoho.com"),
            port: env("SMTP_PORT", 587),
            auth: {
              user: env("SMTP_USERNAME"),
              pass: env("SMTP_PASSWORD"),
            },
            secure: false,
            tls: {
              rejectUnauthorized: false,
            },
          },
          settings: {
            defaultFrom: env("SMTP_FROM"),
            defaultReplyTo: env("SMTP_REPLY_TO"),
            testAddress: env("SMTP_FROM"),
          },
        },
      };

      console.log("✅ Email provider configurado com sucesso");
    } catch (error) {
      console.warn(
        "⚠️ Provider nodemailer não encontrado, emails desabilitados temporariamente"
      );
      console.warn(
        "Para habilitar emails, instale: pnpm add @strapi/provider-email-nodemailer"
      );
      console.warn("Erro:", error.message);
    }
  } else {
    console.warn("⚠️ Variáveis SMTP não configuradas, emails desabilitados");
    console.warn("Necessário: SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD");
  }

  return plugins;
};
