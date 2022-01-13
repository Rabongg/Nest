interface BoardList {
  id: number;
  title: string;
  content: string;
}

interface BoardDetail extends BoardList {
  createdAt: Date;
}
