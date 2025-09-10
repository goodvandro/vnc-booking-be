/**
 * guest-house-booking controller
 */

import { factories } from "@strapi/strapi";

// Interface para os atributos da reserva
// interface BookingAttributes {
//   email: string;
//   firstName: string;
//   lastName?: string;
//   bookingId: string;
//   bookingStatus: string;
//   [key: string]: any;
// }

// Interface para a resposta da API
// interface ApiResponse {
//   data?: {
//     attributes?: BookingAttributes;
//     id?: number;
//   };
//   meta?: any;
// }

export default factories.createCoreController(
  "api::guest-house-booking.guest-house-booking",
  // ({ strapi }) => ({
  //   async update(ctx: any): Promise<ApiResponse> {
  //     try {
  //       console.log("🔄 Controller update chamado");
  //       console.log(
  //         "📥 Dados recebidos:",
  //         JSON.stringify(ctx.request.body, null, 2)
  //       );

  //       // Capturar o status anterior para comparação
  //       const { id } = ctx.params;
  //       const currentBooking = await strapi.entityService.findOne(
  //         "api::guest-house-booking.guest-house-booking",
  //         id
  //       );

  //       console.log("📋 Status anterior:", currentBooking?.bookingStatus);
  //       console.log("📋 Novo status:", ctx.request.body.data?.bookingStatus);

  //       const response: ApiResponse = await super.update(ctx);

  //       const booking = response.data?.attributes;

  //       console.log(
  //         "📤 Resposta da atualização:",
  //         JSON.stringify(booking, null, 2)
  //       );

  //       // Verificar se o status mudou para "confirmed"
  //       const oldStatus = currentBooking?.bookingStatus;
  //       const newStatus = booking?.bookingStatus;

  //       console.log(`🔍 Verificando status: ${oldStatus} -> ${newStatus}`);

  //       // Verificar se mudou para confirmed (independente do status anterior)
  //       if (newStatus === "confirmed" && oldStatus !== "confirmed") {
  //         console.log("✅ Status mudou para confirmed, enviando emails...");

  //         try {
  //           const emailService = strapi.plugin("email").service("email");

  //           // Email para o cliente
  //           console.log("📧 Enviando email para cliente:", booking.email);
  //           await emailService.send({
  //             to: booking.email,
  //             subject: "Sua reserva foi confirmada",
  //             text: `Olá ${booking.firstName}, sua reserva (${booking.bookingId}) foi CONFIRMADA!`,
  //             html: `
  //               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //                 <h2 style="color: #27ae60;">Reserva Confirmada! ✅</h2>
  //                 <p>Olá <strong>${booking.firstName}</strong>,</p>
  //                 <p>Sua reserva <b>${booking.bookingId}</b> foi <span style="color:green; font-weight:bold;">CONFIRMADA</span>!</p>
  //                 <p>Aguardamos você em breve.</p>
  //                 <hr>
  //                 <p style="font-size: 12px; color: #666;">Este é um email automático, não responda.</p>
  //               </div>
  //             `,
  //           });
  //           console.log("✅ Email enviado para cliente com sucesso");

  //           // Email para o admin
  //           const adminEmail = process.env.ADMIN_EMAIL || "admin@seuhotel.com";
  //           console.log("📧 Enviando email para admin:", adminEmail);

  //           await emailService.send({
  //             to: adminEmail,
  //             subject: `Reserva confirmada - ${booking.bookingId}`,
  //             text: `A reserva ${booking.bookingId} do cliente ${booking.firstName} ${booking.lastName || ""} foi confirmada.`,
  //             html: `
  //               <div style="font-family: Arial, sans-serif;">
  //                 <h3 style="color: #27ae60;">Reserva Confirmada ✅</h3>
  //                 <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
  //                   <h4 style="margin-top: 0;">Detalhes da Reserva:</h4>
  //                   <ul style="list-style: none; padding: 0;">
  //                     <li><strong>ID da Reserva:</strong> ${booking.bookingId}</li>
  //                     <li><strong>Cliente:</strong> ${booking.firstName} ${booking.lastName || ""}</li>
  //                     <li><strong>Email:</strong> ${booking.email}</li>
  //                     <li><strong>Status:</strong> <span style="color: #27ae60;">Confirmada</span></li>
  //                   </ul>
  //                 </div>
  //               </div>
  //             `,
  //           });
  //           console.log("✅ Email enviado para admin com sucesso");
  //         } catch (emailError) {
  //           console.error(
  //             "❌ Erro ao enviar emails de confirmação:",
  //             emailError
  //           );
  //           // Não falha a operação por causa do email
  //         }
  //       } else if (newStatus === "confirmed") {
  //         console.log(
  //           "ℹ️ Status já era confirmed, não enviando emails novamente"
  //         );
  //       } else {
  //         console.log(
  //           `ℹ️ Status não é confirmed (${newStatus}), não enviando emails`
  //         );
  //       }

  //       return response;
  //     } catch (error) {
  //       console.error("❌ Erro geral no controller update:", error);
  //       throw error;
  //     }
  //   },
  // })
);

