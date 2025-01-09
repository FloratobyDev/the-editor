type Props = {
  color: string;
};

const CloseIcon = ({ color = "#D37777" }: Props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7093 2.65416C18.0998 2.26364 18.0998 1.63047 17.7093 1.23995L16.7602 0.290818C16.3697 -0.0997065 15.7365 -0.099706 15.346 0.290818L9.70732 5.92946C9.3168 6.31999 8.68363 6.31999 8.29311 5.92946L2.6545 0.290858C2.26398 -0.0996663 1.63081 -0.0996662 1.24029 0.290858L0.29116 1.23999C-0.0993641 1.63051 -0.0993636 2.26368 0.291161 2.6542L5.92977 8.29281C6.32029 8.68333 6.32029 9.31649 5.92977 9.70702L0.29094 15.3458C-0.0995843 15.7364 -0.0995841 16.3695 0.29094 16.7601L1.24007 17.7092C1.63059 18.0997 2.26376 18.0997 2.65428 17.7092L8.29311 12.0704C8.68363 11.6798 9.3168 11.6798 9.70732 12.0704L15.3462 17.7092C15.7367 18.0998 16.3699 18.0998 16.7604 17.7092L17.7095 16.7601C18.1001 16.3696 18.1001 15.7364 17.7095 15.3459L12.0707 9.70702C11.6801 9.31649 11.6801 8.68333 12.0707 8.2928L17.7093 2.65416Z"
      fill={color}
    />
  </svg>
);

export default CloseIcon;