export interface Borrow {
  id: number;
  memberId: number;
  bookId: number;
  borrowDate: Date;
  dueDate: Date;
  returned: boolean;
}