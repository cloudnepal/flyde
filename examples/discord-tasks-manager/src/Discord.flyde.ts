import { CodePart, partOutput } from "@flyde/core";
import { Client } from "eris";

const part: CodePart = {
  id: "Discord Bot",
  inputs: {},
  defaultStyle: {
    icon: ["fab", "discord"],
    color: "#7289da",
    size: "large",
  },
  outputs: {
    interaction: partOutput(),
    message: partOutput(),
  },
  completionOutputs: [],
  fn: (inputs, outputs, adv) => {
    const bot: Client = adv?.context.bot;

    bot.on("error", async (e) => {
      adv?.onError(e);
    });

    bot.on("messageCreate", async (msg) => {
      // eris overrides the toJSON method of their objects, so we need to do this to get the raw data
      outputs.message.next(msg);
    });

    bot.on("interactionCreate", async (interaction) => {
      // eris overrides the toJSON method of their objects, so we need to do this to get the raw data
      outputs.interaction.next(interaction);
    });
  },
};

export = part;