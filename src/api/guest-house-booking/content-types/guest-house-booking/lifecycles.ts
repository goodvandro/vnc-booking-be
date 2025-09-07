// Interface para o resultado da reserva
interface BookingResult {
  email: string;
  firstName: string;
  bookingId: string;
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
    const { result } = event;

    try {
      // E-mail para o cliente
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: result.email,
          subject: "Reserva recebida",
          text: `Olá ${result.firstName}, recebemos sua reserva (${result.bookingId}). 
               Aguarde a confirmação.`,
          html: `<p>Olá <strong>${result.firstName}</strong>, recebemos sua reserva <b>${result.bookingId}</b>.</p>
               <p>Aguarde a confirmação do administrador.</p>`,
        });
    } catch (error) {
      console.error("Erro ao enviar email de confirmação:", error);
      // Opcional: você pode decidir se quer lançar o erro novamente ou apenas logar
      // throw error;
    }
  },
};
