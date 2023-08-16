import { ReactComponent as BlankPerson } from '@/assets/icons/BlankPerson.svg';
import { CardConfig } from '@/types/home/cardConfig';

const Cards: CardConfig[] = [
  {
    title: '나의 오늘 일정',
    getMainInfo: (data) => `총 ${data.mySchedule.lessonCount + data.mySchedule.counselingCount}건의 일정`,
    getSecondaryInfo: (data) => `수업 ${data.mySchedule.lessonCount}건, 상담 ${data.mySchedule.counselingCount}건`,
    icon: <BlankPerson />,
    getBottomInfo: (data) => data.mySchedule.lessonCount + data.mySchedule.counselingCount,
    navigateTo: 'schedule',
  },
  {
    title: '나의 회원',
    getMainInfo: () => '나의 회원 수',
    icon: <BlankPerson />,
    getBottomInfo: (data) => data.center.memberCount,
    navigateTo: 'members',
  },
  {
    title: '전체 직원',
    getMainInfo: () => '전체 직원 수',
    icon: <BlankPerson />,
    getBottomInfo: (data) => data.center.staffCount,
    navigateTo: 'staffs',
  },
];

export default Cards;
