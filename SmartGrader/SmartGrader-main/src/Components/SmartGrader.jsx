const SmartGraderLogo = () => (
  <svg
    width="100"
    height="30"
    viewBox="0 0 100 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Icon: simple book + checkmark */}
    <rect x="2" y="5" width="20" height="20" rx="3" ry="3" fill="#007bff" />
    <polyline
      points="8,15 12,19 18,10"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Text */}
    <text
      x="30"
      y="20"
      fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
      fontWeight="700"
      fontSize="18"
      fill="#007bff"
    >
      SmartGrader
    </text>
  </svg>
);


export default SmartGraderLogo;