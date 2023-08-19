import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { ReactComponent as Profile40 } from '@/assets/icons/Profile_40.svg';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStaffInfoPage = () => {
  const { staffId } = useParams<{ staffId: string | undefined }>();
  const navigate = useNavigate();

  return (
    <>
      <SubHeader title="직원 정보" />
      <div className="flex flex-col justify-center items-center">
        <Card>
          <div>
            <Profile40 />
            <div>
              <p>{}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UpdateStaffInfoPage;
