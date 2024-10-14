import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import useStoreUser from "../../store/useStoreUser";
export const HomePage = () => {
  const user = useStoreUser((state) => state.user);
  console.log(user.config.data.email, "usuario del store");

  return (
    <MainLayout>
      <div>homepage</div>
    </MainLayout>
  );
};
