import { Client, CommandInteraction, DiscordAPIError } from "discord.js";
import {
  MS_IN_ONE_DAY,
  MS_IN_ONE_HOUR,
  MS_IN_ONE_MINUTE,
  MS_IN_ONE_SECOND,
} from "./utils/default-values";

export class BaseComponent {
  public uri: string;
  constructor() {
    this.uri = 'https://secure.runescape.com/';
  }
}

export function errorsHandler(client: Client, error: any): string {
  if (error instanceof DiscordAPIError) {
    if (error.code === 10008) {
      if (process.env.NODE_ENV !== "production") console.dir(error);
      return `Houve um erro com a mensagem.`;
    }
    if (error.code === 50007) {
      if (process.env.NODE_ENV !== "production")
        console.dir(
          "Usuário tentou usar o comando vínculo com a DM desativada."
        );
      return `Para maior privacidade e controle da operação, ative suas mensagens privadas e tente novamente.\nAcesse: Configurações de Usuário > Privacidade e Segurança > Permitir mensagens diretas de membros do servidor.`;
    }
    if (error.code === 50013) {
      if (process.env.NODE_ENV !== "production") console.dir(error);
      return `Não tenho permissões o suficiente para realizar o método \`${error.method}\`. `;
    }
    if (error.code === 50014) {
      if (process.env.NODE_ENV !== "production") console.dir(error);
      return `Chave de autenticação (token) inválida.`;
    }
    console.log(`Código de erro não registrado no \'handler\': ${error.code}
            Erro completo:
            ${error}`);
    return "Ocorreu um erro inesperado. Veja o console para mais detalhes.";
  } else {
    return "Erro inesperado:\n" + error;
  }
}

export function responseResolver(
  interaction: CommandInteraction,
  followUpIfReplied: boolean = false
) {
  const interactionWasAcknowledged =
    interaction.deferred || interaction.replied;
  return interactionWasAcknowledged
    ? followUpIfReplied
      ? interaction.followUp
      : interaction.editReply
    : interaction.reply;
}

export function msToDescription(ms: number): string {
  const days = Math.floor(ms / MS_IN_ONE_DAY);
  const hours = Math.floor((ms % MS_IN_ONE_DAY) / MS_IN_ONE_HOUR);
  const minutes = Math.floor((ms % MS_IN_ONE_HOUR) / MS_IN_ONE_MINUTE);
  const seconds = Math.floor((ms % MS_IN_ONE_MINUTE) / MS_IN_ONE_SECOND);

  const parts = [];
  if (days > 0) parts.push(`${days} dia${days === 1 ? "" : "s"}`);
  if (hours > 0) parts.push(`${hours} hora${hours === 1 ? "" : "s"}`);
  if (minutes > 0) parts.push(`${minutes} minuto${minutes === 1 ? "" : "s"}`);
  if (seconds > 0) parts.push(`${seconds} segundo${seconds === 1 ? "" : "s"}`);

  if (parts.length === 0) return "0 segundos";
  else if (parts.length === 1) return parts[0];
  else if (parts.length === 2) return `${parts[0]} e ${parts[1]}`;
  else {
    const lastPart = parts.pop();
    const formattedParts = parts.join(", ");
    return `${formattedParts}, e ${lastPart}`;
  }
}
