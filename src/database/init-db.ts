import Database from 'better-sqlite3';

export function initDatabase() {
  const db = new Database('library.db');

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL CHECK (role IN ('member', 'librarian'))
    );
  `,
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      totalCopies INTEGER NOT NULL,
      availableCopies INTEGER NOT NULL
    );
 `,
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS borrow (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memberId INTEGER NOT NULL,
      bookId INTEGER NOT NULL,
      borrowDate TEXT NOT NULL,
      dueDate TEXT NOT NULL,
      returnDate TEXT,
      fine INTEGER DEFAULT 0,
      FOREIGN KEY (memberId) REFERENCES members(id),
      FOREIGN KEY (bookId) REFERENCES books(id)
    );
  `,
  ).run();
}
