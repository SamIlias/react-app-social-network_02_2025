import { Suspense } from "react";

export const withSuspense = (Component: React.FC) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};
