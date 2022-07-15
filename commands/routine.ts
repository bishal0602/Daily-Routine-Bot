import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
} from "../routineData";

type Period = {
  period: string;
  subject?: string;
  teacher?: string;
  time: string;
};

type Routine = {
  name: string;
  value: string;
};

// Get routine of a day by passing day as argument
function getRoutine(day: Period[]): MessageEmbed {
  let routineArr: Routine[] = [];
  day.forEach((period: Period) => {
    routineArr.push({
      name: period.subject
        ? `**${period.period}: ${period.subject}**`
        : `**${period.period}**`,
      value: period.teacher
        ? `Teacher: ${period.teacher}\nTime: ${period.time}`
        : `Time: ${period.time}`,
    });
  });
  let capitalizedDayName =
    day.toString().charAt(0).toUpperCase() + day.slice(1); //Capitalizes first letter of the word
  const embedExample = new MessageEmbed()
    .setColor("#5D3FD3")
    .setTitle(`${capitalizedDayName} Routine`)
    .setFields(routineArr);
  return embedExample;
}

export default {
  category: "Routine",
  description: "Sends routine of the next day or the specified day",

  slash: false,
  testOnly: false,

  callback: ({ message, text }) => {
    let date: Date,
      dayOfTheWeek = -1,
      hour = -1; // -1 so it is never undefined yet never passes any condition unless provided a genuine value
    if (!text) {
      date = new Date(message.createdTimestamp);
      dayOfTheWeek = date.getDay();
      hour = date.getHours();
    }

    if (
      text.toLowerCase() === "sun" ||
      text.toLowerCase() === "sunday" ||
      (dayOfTheWeek === 0 && hour < 10) ||
      (dayOfTheWeek === 6 && hour >= 10)
    ) {
      message.reply({
        embeds: [getRoutine(sunday)],
      });
    } else if (
      text.toLowerCase() === "mon" ||
      text.toLowerCase() === "monday" ||
      (dayOfTheWeek === 1 && hour < 10) ||
      (dayOfTheWeek === 0 && hour >= 10)
    ) {
      message.reply({
        embeds: [getRoutine(monday)],
      });
    } else if (
      text.toLowerCase() === "tue" ||
      text.toLowerCase() === "tuesday" ||
      (dayOfTheWeek === 2 && hour < 10) ||
      (dayOfTheWeek === 1 && hour >= 10)
    ) {
      message.reply({
        embeds: [getRoutine(tuesday)],
      });
    } else if (
      text.toLowerCase() === "wed" ||
      text.toLowerCase() === "wednesday" ||
      (dayOfTheWeek === 3 && hour < 10) ||
      (dayOfTheWeek === 2 && hour >= 10)
    ) {
      message.reply({
        embeds: [getRoutine(wednesday)],
      });
    } else if (
      text.toLowerCase() === "thu" ||
      text.toLowerCase() === "thursday" ||
      (dayOfTheWeek === 4 && hour < 10) ||
      (dayOfTheWeek === 3 && hour >= 10)
    ) {
      message.reply({
        embeds: [getRoutine(thursday)],
      });
    } else if (
      text.toLowerCase() === "fri" ||
      text.toLowerCase() === "friday" ||
      (dayOfTheWeek === 5 && hour < 10) ||
      (dayOfTheWeek === 4 && hour >= 10)
    ) {
      message.reply({
        embeds: [getRoutine(friday)],
      });
    } else if (
      text.toLowerCase() === "sat" ||
      text.toLowerCase() === "saturday" ||
      (dayOfTheWeek === 6 && hour < 10) ||
      (dayOfTheWeek === 5 && hour >= 10)
    ) {
      message.reply("Bruh! Sanibar ni k routine herira?");
    } else {
      message.reply(
        "Invalid Argument: \nPlease type: `sun, mon, tue, wed, thu` or `fri` to get the routine of the respective day."
      );
    }
  },
} as ICommand;
