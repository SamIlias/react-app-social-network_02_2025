import { Suspense } from "react";

export const withSuspense = (Component) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};
