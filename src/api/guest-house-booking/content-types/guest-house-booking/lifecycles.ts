// Interface para o resultado da reserva
interface BookingResult {
  email: string;
  firstName: string;
  lastName?: string;
  bookingId: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestCount?: number;
  [key: string]: any; // Para outros campos que possam existir
}

// Interface para o evento
interface LifecycleEvent {
  result: BookingResult;
  params?: any;
  model?: any;
}

export default {
  async afterCreate(event: LifecycleEvent) {
    const { result: booking } = event;

    const emailService = strapi.plugin("email").service("email");

    // E-mail para o cliente
    try {
      await emailService.send({
        to: booking.email,
        subject: "Reserva recebida",
        text: `Olá ${booking.firstName}, recebemos sua reserva (${booking.bookingId}). 
             Aguarde a confirmação.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">Reserva Recebida</h2>
            <p>Olá <strong>${booking.firstName}</strong>,</p>
            <p>Recebemos sua reserva <b>${booking.bookingId}</b>.</p>
            <p>Aguarde a confirmação do administrador.</p>
            <hr>
            <p style="font-size: 12px; color: #666;">Este é um email automático, não responda.</p>
          </div>
        `,
      });

      console.log(
        `Email de recebimento enviado para o cliente: ${booking.email}`
      );
    } catch (error) {
      console.error("Erro ao enviar email para o cliente:", error);
    }

    // E-mail para o admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@seuhotel.com";

      await emailService.send({
        to: adminEmail,
        subject: `Nova reserva recebida - ${booking.bookingId}`,
        text: `Nova reserva recebida do cliente ${booking.firstName} ${booking.lastName || ""} (${booking.bookingId}). 
               Email: ${booking.email}. Aguardando confirmação.`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h3 style="color: #e67e22;">Nova Reserva Recebida!</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
              <h4 style="margin-top: 0;">Detalhes da Reserva:</h4>
              <ul style="list-style: none; padding: 0;">
                <li><strong>ID da Reserva:</strong> ${booking.bookingId}</li>
                <li><strong>Cliente:</strong> ${booking.firstName} ${booking.lastName || ""}</li>
                <li><strong>Email:</strong> ${booking.email}</li>
                ${booking.checkInDate ? `<li><strong>Check-in:</strong> ${booking.checkInDate}</li>` : ""}
                ${booking.checkOutDate ? `<li><strong>Check-out:</strong> ${booking.checkOutDate}</li>` : ""}
                ${booking.guestCount ? `<li><strong>Hóspedes:</strong> ${booking.guestCount}</li>` : ""}
              </ul>
            </div>
            <p><strong>Status:</strong> <span style="color: #f39c12;">Aguardando Confirmação</span></p>
            <p style="margin-top: 20px;">
              <a href="${process.env.STRAPI_ADMIN_URL || "http://localhost:1337/admin"}" 
                 style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Ver no Painel Admin
              </a>
            </p>
          </div>
        `,
      });

      console.log(`Email de notificação enviado para admin: ${adminEmail}`);
    } catch (error) {
      console.error("Erro ao enviar email para o admin:", error);
    }
  },
};
