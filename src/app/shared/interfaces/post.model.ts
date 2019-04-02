export interface IPost {
  id: string;
  content: string;
  visibility: string;
  userId: number;
  created_at?: Date;
  updated_at?: Date;
}
