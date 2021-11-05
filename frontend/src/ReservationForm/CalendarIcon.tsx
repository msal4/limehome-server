export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__ionicon"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={25}
        x={48}
        y={80}
        width={416}
        height={384}
        rx={48}
      />
      <circle fill="currentColor" cx={296} cy={232} r={24} />
      <circle fill="currentColor" cx={376} cy={232} r={24} />
      <circle fill="currentColor" cx={296} cy={312} r={24} />
      <circle fill="currentColor" cx={376} cy={312} r={24} />
      <circle fill="currentColor" cx={136} cy={312} r={24} />
      <circle fill="currentColor" cx={216} cy={312} r={24} />
      <circle fill="currentColor" cx={136} cy={392} r={24} />
      <circle fill="currentColor" cx={216} cy={392} r={24} />
      <circle fill="currentColor" cx={296} cy={392} r={24} />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
        strokeLinecap="round"
        d="M128 48v32m256-32v32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
      />
    </svg>
  );
};
