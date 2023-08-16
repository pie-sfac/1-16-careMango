import { ApiResponse } from '@/types/home/apiResponse';

export interface CardConfig {
  title: string;
  getMainInfo: (data: ApiResponse) => string | number;
  getSecondaryInfo?: (data: ApiResponse) => string;
  icon: React.ReactNode;
  getBottomInfo: (data: ApiResponse) => number;
  navigateTo: string;
}
