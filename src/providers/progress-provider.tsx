'use client';
 
import { ProgressProvider } from '@bprogress/next/app';
 
const ProviderProgress = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider 
      height="4px"
      color="#00b3ff"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
 
export default ProviderProgress;