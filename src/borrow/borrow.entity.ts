export class Borrow {
  id: number;
  memberId: number;
  bookId: number;
  borrowDate: Date;
  returnDate?: Date;
  dueDate: Date;
  fine?: number;
}
