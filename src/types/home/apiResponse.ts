export interface ApiResponse {
    center: {
      memberCount: number;
      myMemberCount: number;
      staffCount: number;
    };
    mySchedule: {
      counselingCount: number;
      lessonCount: number;
    };
    message: string;
  }