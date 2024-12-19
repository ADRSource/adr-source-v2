import * as React from 'react';
import { IconProps } from '~/types/icon-props';

export const IconLogoMark = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <svg viewBox="0 0 290 296" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path
        fill="#0090ff"
        d="M7.45 108.29C84.82 73.08 162.2 37.88 239.61 2.75q5.37-2.44 7.65-2.52c6.93-.26 10.11 8.44 6.31 14.04q-71.66 105.71-143.12 211.56c-4.58 6.79-8.2 8.06-15.19 3.72Q32.39 190.5 2.75 122.68c-3.09-7.06-2.32-11.19 4.7-14.39Z"
      />
      <path
        fill="#46a758"
        d="M271.72 295.27c-48.05-.57-96.21-12.81-136.18-40.27q-3.88-2.66-4.9-5.11-1.6-3.84.96-7.8 70.9-109.73 141.77-219.47c3.03-4.68 11.35-4.41 14.04.59q1.17 2.19 1.07 6.78c-1.92 85.84-3.98 171.68-5.98 257.51q-.11 4.71-3.89 6.68-2.17 1.14-6.89 1.09Z"
      />
    </svg>
  );
});

IconLogoMark.displayName = 'IconLogoMark';
