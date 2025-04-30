/*
  Warnings:

  - Added the required column `name` to the `PeerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "imageUrl" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PeerProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PeerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PeerProfile" ("createdAt", "id", "interests", "updatedAt", "userId") SELECT "createdAt", "id", "interests", "updatedAt", "userId" FROM "PeerProfile";
DROP TABLE "PeerProfile";
ALTER TABLE "new_PeerProfile" RENAME TO "PeerProfile";
CREATE UNIQUE INDEX "PeerProfile_userId_key" ON "PeerProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
