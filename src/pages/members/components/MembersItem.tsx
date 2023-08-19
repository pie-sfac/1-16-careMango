import { useNavigate } from 'react-router-dom';
import { MembersData } from '@/types/members/members';
import { ReactComponent as Profile24 } from '@/assets/icons/Profile_24.svg';

type MembersType = MembersData['datas'][number];

const MembersItem = ({ members }: { members: MembersType }) => {
  const navigate = useNavigate();
  const goMemberInfo = () => {
    navigate(`/members/${members.id}`);
  };

  return (
    <button type="button" onClick={goMemberInfo}>
      <div key={members.id} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
        <div className="flex items-center space-x-4">
          <Profile24 />
          <div className="flex justify-start w-16">
            <p className="flex items-center justify-center font-bold">{members.name}</p>
          </div>
          <div className="flex justify-end w-16">
            <p>{members.sex === 'MALE' ? '남' : '여'}</p>
          </div>
          <div className="flex justify-start">
            <p className="ml-6">{members.phone}</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-32">
          <p>{members.createdAt.split('T')[0]}</p>
        </div>
      </div>
    </button>
  );
};

export default MembersItem;
