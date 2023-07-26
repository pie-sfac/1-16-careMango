import { useRecoilState } from 'recoil';
import { showModalState, counselingRecordsState } from '../../atoms/counselingAtom';

const CounselingModal = () => {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const [counselingContent, setCounselingContent] = useRecoilState(counselingRecordsState);

  // 취소
  const handleClose = () => {
    setShowModal(false);
  };

  // 저장
  const handleSave = () => {
    console.log('Saved content:', counselingContent);
    setShowModal(false);
  };

  // 내용
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCounselingContent(e.target.value);
  };

  // 내용 채워지면 저장 버튼 활성화
  const contentCompleted = () => counselingContent;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col justify-between w-2/5 p-4 bg-white rounded h-2/5">
        <header className="flex justify-between">
          <h1 className="small-title">상담 기록</h1>
          <button type="submit" className="focus:outline-none" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.58579 8L0.292893 14.2929C-0.0976311 14.6834 -0.0976311 15.3166 0.292893 15.7071C0.683417 16.0976 1.31658 16.0976 1.70711 15.7071L8 9.41421L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L9.41421 8L15.7071 1.70711C16.0976 1.31658 16.0976 0.683417 15.7071 0.292893C15.3166 -0.0976311 14.6834 -0.0976311 14.2929 0.292893L8 6.58579L1.70711 0.292893Z"
                fill="black"
              />
            </svg>
          </button>
        </header>
        <p>회원님과 나눈 내용을 자유롭게 작성해 보세요.</p>
        <textarea
          placeholder="내용을 입력해주세요 (1000자 이내)."
          value={counselingContent}
          className="w-full h-full my-6 input-select"
          onChange={handleContentChange}></textarea>
        <div>
          <button className="w-6/12 rounded border-line-300" onClick={handleClose}>
            취소
          </button>
          <button
            className={`py-3 rounded w-6/12 ${
              contentCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
            }`}
            onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounselingModal;
