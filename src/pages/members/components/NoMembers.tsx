import { ReactComponent as EmptyPerson } from '@/assets/icons/EmptyPerson.svg';

const NoMemebers = () => (
  <>
    <div className="flex items-center justify-center">
      <EmptyPerson />
    </div>
    <p className="flex items-center justify-center p-3 my-1 base-font">+ 회원을 등록하세요</p>
  </>
);

export default NoMemebers;
