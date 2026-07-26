/*
  Warnings:

  - You are about to drop the column `listId` on the `Task` table. All the data in the column will be lost.
  - The `createdAt` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `TaskList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `taskListId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `updatedAt` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_listId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "listId",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "taskListId" INTEGER NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TaskList" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
