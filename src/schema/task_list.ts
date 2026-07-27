import { z } from 'zod';
import builder from '../builder.ts';
import prisma from '../database.ts';

builder.prismaObject('TaskList', {
  description: 'List containing multiple tasks to be completed.',
  fields: t => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    numberOfTasks: t.exposeInt('numberOfTasks'),
  }),
});

const TaskListDetails = builder.inputType('TaskListDetails', {
  fields: t => ({
    name: t.string({ required: true, validate: z.string() }),
  }),
});

builder.queryFields(t => ({
  allTaskList: t.prismaField({
    type: ['TaskList'],
    resolve: async (query, _, args) => prisma.taskList.findMany({ ...query }),
  }),
}));

builder.mutationFields(t => ({
  addTaskList: t.prismaField({
    type: 'TaskList',
    args: {
      data: t.arg({ type: TaskListDetails, required: true }),
    },
    resolve: async (query, _, args) => {
      return prisma.taskList.create({
        ...query,
        data: { name: args.data.name },
      });
    },
  }),
}));
