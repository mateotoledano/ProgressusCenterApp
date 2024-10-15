import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import useStoreUser from "../../store/useStoreUser";
export const HomePage = () => {
  const token = useStoreUser((state) => state.token);
  console.log(token, "usuario del store");

  return (
    <MainLayout>
      <div>homepage</div>
    </MainLayout>
  );
};
