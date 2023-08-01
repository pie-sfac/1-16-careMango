export interface Member {
  id: number;
  name: string;
  phone: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

export interface MembersData {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: Member[];
  message: string;
}
