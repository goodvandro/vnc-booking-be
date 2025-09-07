/**
 * guest-house-booking controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa";

// Interface para os atributos da reserva
interface BookingAttributes {
  email: string;
  firstName: string;
  lastName?: string;
  bookingId: string;
  bookingStatus: string;
  [key: string]: any;
}

// Interface para a resposta da API
interface ApiResponse {
  data?: {
    attributes?: BookingAttributes;
    id?: number;
  };
  meta?: any;
}

export default factories.createCoreController(
  "api::guest-house-booking.guest-house-booking",
  ({ strapi }) => ({
    async update(ctx: Context): Promise<ApiResponse> {
      try {
        const response: ApiResponse = await super.update(ctx);

        const booking = response.data?.attributes;

        // Se o status mudou para CONFIRMED
        if (booking?.bookingStatus === "confirmed") {
          // Email para o cliente
          await strapi
            .plugin("email")
            .service("email")
            .send({
              to: booking.email,
              subject: "Sua reserva foi confirmada",
              text: `Olá ${booking.firstName}, sua reserva (${booking.bookingId}) foi CONFIRMADA!`,
              html: `<p>Olá <strong>${booking.firstName}</strong>, sua reserva <b>${booking.bookingId}</b> foi <span style="color:green">CONFIRMADA</span>!</p>`,
            });

          // Email para o admin
          await strapi
            .plugin("email")
            .service("email")
            .send({
              to: "admin@seuhotel.com",
              subject: `Reserva confirmada - ${booking.bookingId}`,
              text: `A reserva ${booking.bookingId} do cliente ${booking.firstName} ${booking.lastName || ""} foi confirmada.`,
            });
        }

        return response;
      } catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        throw error;
      }
    },
  })
);
