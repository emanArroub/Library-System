export class UpdateMemberDto{
    name ?: string;
    email?: string;
    role?: 'member' | 'librarian';
}