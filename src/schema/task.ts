import { z } from 'zod';
import builder from '../builder.ts';
import prisma from '../database.ts';

builder.prismaObject('Task', {
  description:
    'Individual task to be completed. Will always belong to a specific task list.',
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    completed: t.exposeBoolean('completed'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    taskListId: t.exposeInt('taskListId'),
  }),
});

const TaskDetails = builder.inputType('TaskDetails', {
  fields: t => ({
    title: t.string({ required: true, validate: z.string() }),
    taskListId: t.int({
      required: true,
      validate: z.number().positive('Task List ID must be greater than 0'),
    }),
  }),
});

builder.queryFields(t => ({
  taskById: t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.int({
        required: true,
        validate: z.number().positive('ID must be greater than 0'),
      }),
    },
    resolve: async (query, _, args) =>
      prisma.task.findUnique({ ...query, where: { id: args.id } }),
  }),
  taskByTaskListId: t.prismaField({
    type: ['Task'],
    nullable: true,
    args: {
      taskListId: t.arg.int({
        required: true,
        validate: z.number().positive('Task List ID must be greater than 0'),
      }),
      orderByCompletionStatus: t.arg.boolean({ required: false }),
    },
    resolve: async (query, _, args) =>
      prisma.task.findMany({
        ...query,
        where: { taskListId: args.taskListId },
        orderBy: { completed: 'asc' },
      }),
  }),
}));

builder.mutationFields(t => ({
  addTask: t.prismaField({
    type: 'Task',
    args: {
      data: t.arg({ type: TaskDetails, required: true }),
    },
    resolve: async (query, _, args) => {
      return prisma.task.create({
        ...query,
        data: { title: args.data.title, taskListId: args.data.taskListId },
      });
    },
  }),
  deleteTask: t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.int({
        required: true,
        validate: z.number().positive('ID must be greater than 0'),
      }),
    },
    resolve: async (query, _, args) => {
      return prisma.task.delete({ ...query, where: { id: args.id } });
    },
  }),
  updateTask: t.prismaField({
    type: 'Task',
    args: t.validate(
      {
        id: t.arg.int(),
        title: t.arg.string(),
        completed: t.arg.boolean(),
      },
      z
        .object({
          id: z.number().positive('ID must be greater than 0'),
          title: z.string().optional(),
          completed: z.boolean().optional(),
        })
        .refine(args => !!args.completed || !!args.title, {
          message: 'Must provide either a completed status or title',
        })
    ),
    resolve: async (query, _, args) => {
      const selectedTask = await prisma.task.findUnique({
        ...query,
        where: { id: args.id },
        select: { title: true, completed: true },
      });
      return prisma.task.update({
        ...query,
        where: { id: args.id },
        data: {
          title: args.title || selectedTask?.title,
          completed: args.completed || selectedTask?.completed,
        },
      });
    },
  }),
}));
