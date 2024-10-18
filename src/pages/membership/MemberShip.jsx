import { MainLayout } from "../../layout/MainLayout";
import { useLocation } from "react-router-dom";
import { Title, Location, PricingPrices } from "../../components";
export const MemberShip = () => {
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 p-3 overflow-hidden mb-4">
        <div className="b p-2">
          <Location route={"Membresia"} subroute={"Abonar"}></Location>
          <Title title={"Seleccione su Membresia"}></Title>
        </div>
        <div className="p-2 mt-2">
          <PricingPrices></PricingPrices>
        </div>
      </section>
    </MainLayout>
  );
};
