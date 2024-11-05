import { MainLayout } from "../../layout/MainLayout";
import { useLocation } from "react-router-dom";
import { Title, Location, PricingPrices } from "../../components";
export const MemberShip = () => {
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-4">
        <div className="b p-3">
          <Location route={"Membresia"} subroute={"Abonar"}></Location>
          <Title title={"Seleccione su Membresia"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <div className="p-5 mt-2">
          <PricingPrices></PricingPrices>
        </div>
      </section>
    </MainLayout>
  );
};
