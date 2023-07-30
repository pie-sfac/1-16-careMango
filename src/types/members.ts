export interface MemberItemData {
  id: number;
  name: string;
  phone: string;
  sex: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

export interface MembersItemData {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: MemberItemData[];
  message: string;
}
