

export const Icon = ({ children, size = 6, color = "zinc-600" }: { children: any, size?: number; color?: string }) => (
    <svg
      class={` text-${color}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size}
      height={size}
    >
      {/* <path d={path} /> */}
      {children}
    </svg>
  );
  