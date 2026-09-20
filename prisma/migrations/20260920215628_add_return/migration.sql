-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Borrow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME NOT NULL,
    "returnDate" DATETIME,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "fine" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Borrow_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Borrow" ("bookId", "borrowDate", "dueDate", "id", "memberId", "returned") SELECT "bookId", "borrowDate", "dueDate", "id", "memberId", "returned" FROM "Borrow";
DROP TABLE "Borrow";
ALTER TABLE "new_Borrow" RENAME TO "Borrow";
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member'
);
INSERT INTO "new_Member" ("email", "id", "name", "role") SELECT "email", "id", "name", "role" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
