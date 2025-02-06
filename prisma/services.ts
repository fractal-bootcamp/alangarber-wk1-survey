import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Survey = {
    id: string;
    question: string;
    answers: Answer[];
}

export type Answer = {
    id: string;
    answer: string;
    survey: Survey;
    surveyId: string;
}

// Get all surveys
async function getAllSurveys(): Promise<Survey[]> {
    return await prisma.survey.findMany() as Survey[];
}

// Get all answers
async function getAllAnswers(): Promise<Answer[]> {
    return await prisma.answer.findMany() as Answer[];
}

// Create a survey
async function createSurvey(survey: Survey) {
    return await prisma.survey.create({
        data: { question: survey.question, answers: {
            create: survey.answers.map(answer => ({
                answer: answer.answer,
            }))
        } },
        select: {
            id: true,
        },
    })
}

// Get a survey by id
async function getSurveyById(id: string) {
    return await prisma.survey.findUnique({
        where: { id: id },
    }) as Survey;
}

// Answer a survey
async function answerSurvey(id: string, answer: string) {
    return await prisma.survey.update({
        where: { id: id },
        data: { answers: {
            create: {
                answer: answer,
            }
        }},
        include: {
            answers: true,
        }
    })
}

// Get survey results by id
async function getSurveyResults(id: string) {
    const survey = await getSurveyById(id);
    if (!survey) {
        return undefined;
    }
    const answers = await getAllAnswers();
    // const filteredAnswers = (answers).filter(answer => answer.surveyId === id).map(answer => answer.answer);
    return { id: id, question: survey.question, answers: answers } as Survey;
}

export { getAllSurveys, getAllAnswers, createSurvey, getSurveyById, answerSurvey, getSurveyResults };