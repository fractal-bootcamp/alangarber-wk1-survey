import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create questions
  const favoriteLanguage = await prisma.survey.upsert({
    where: { question: "What is your favorite programming language?" },
    update: {},
    create: {
      question: "What is your favorite programming language?",
      answers: {
        create: [
          {
            answer: "TypeScript",
          },
          {
            answer: "Brainfuck",
          },
          {
            answer: "Malbolge",
          },
        ],
      },
    },
  });
  const favoriteColor = await prisma.survey.upsert({
    where: { question: "What is your favorite color?" },
    update: {},
    create: {
      question: "What is your favorite color?",
      answers: {
        create: [
          {
            answer: "Ultraviolet",
          },
          {
            answer: "Infrared",
          },
          {
            answer: "Vapa",
          },
          {
            answer: "Serandu",
          },
          {
            answer: "Dumbu",
          },
          {
            answer: "Burou",
          },
          {
            answer: "Zoozu",
          },
        ],
      },
    },
  });
  const favoriteDirection = await prisma.survey.upsert({
    where: { question: "What is your favorite direction?" },
    update: {},
    create: {
      question: "What is your favorite direction?",
      answers: {
        create: [
          {
            answer: "North",
          },
          {
            answer: "South",
          },
          {
            answer: "East",
          },
          {
            answer: "West",
          },
          {
            answer: "Up",
          },
          {
            answer: "Down",
          },
          {
            answer: "Back",
          },
          {
            answer: "Forward",
          },
        ],
      },
    },
  });
  console.log({ favoriteLanguage, favoriteColor, favoriteDirection });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
