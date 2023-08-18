import { ReactComponent as EmptyMessage } from '@/assets/icons/EmptyMessage.svg';

const MemberReview = () => (
  <div className="p-10 bg-bg-100">
    <div className="flex items-center justify-center">
      <EmptyMessage />
    </div>
    <p className="flex items-center justify-center p-3 my-1 base-font text-text-400">만족도 및 후기가 없습니다</p>
  </div>
);

export default MemberReview;
