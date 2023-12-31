interface NameTagProps {
  name: string;
  handleRemove?: () => void;
  disabled?: boolean;
}

const NameTag = ({ name, handleRemove, disabled }: NameTagProps) => (
  <div
    className={`flex items-center justify-between p-2 border-2 border-gray-300 rounded-lg w-44 ${
      disabled && `bg-gray-200 border-gray-300 cursor-not-allowed`
    }`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_18_8149)">
        <circle cx="12" cy="12" r="11.625" fill="white" stroke="#CFCFCF" strokeWidth="0.75" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9072 12.64C14.541 12.2351 15.7521 10.759 15.7521 9C15.7521 6.92893 14.0731 5.25 12.0021 5.25C9.93098 5.25 8.25205 6.92893 8.25205 9C8.25205 10.8022 9.52332 12.3074 11.218 12.6679C6.637 13.1599 3.19643 16.4669 3.48243 20.3516C9.83841 26.114 18.6869 22.3474 20.7931 19.9672C20.5271 16.3544 17.0923 12.9812 12.9072 12.64Z"
          fill="#CFCFCF"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_8149">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <p>{name}</p>
    <button onClick={handleRemove} type="button" className="p-1 ml-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M7.28033 6.21967C6.98744 5.92678 6.51256 5.92678 6.21967 6.21967C5.92678 6.51256 5.92678 6.98744 6.21967 7.28033L10.9393 12L6.21967 16.7197C5.92678 17.0126 5.92678 17.4874 6.21967 17.7803C6.51256 18.0732 6.98744 18.0732 7.28033 17.7803L12 13.0607L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.0607 12L17.7803 7.28033C18.0732 6.98744 18.0732 6.51256 17.7803 6.21967C17.4874 5.92678 17.0126 5.92678 16.7197 6.21967L12 10.9393L7.28033 6.21967Z"
          fill="black"
        />
      </svg>
    </button>
  </div>
);
export default NameTag;
