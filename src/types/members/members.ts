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

export interface StateType {
  name: string;
  birthDate: string;
  phone: string;
  sex: string;
  job?: string;
  acqusitionFunnel?: string;
  acquisitionFunnel?: string;
}
export interface UpdateStateType {
  name: string;
  birthDate: string;
  phone: string;
  sex: string;
  job: string;
  acquisitionFunnel: string
}