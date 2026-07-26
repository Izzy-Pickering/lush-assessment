import { DateTimeResolver } from 'graphql-scalars';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ValidationPlugin from '@pothos/plugin-validation';
import type PrismaTypes from '../lib/pothos-prisma-types.ts';
import { getDatamodel } from '../lib/pothos-prisma-types.ts';
import prisma from './database.ts';

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: { DateTime: { Input: Date; Output: Date } };
}>({
  plugins: [ValidationPlugin, PrismaPlugin],
  prisma: { client: prisma, dmmf: getDatamodel() },
});

builder.queryType({});
builder.mutationType({});

builder.addScalarType('DateTime', DateTimeResolver, {});

export default builder;
