import Banner from "@/component/Banner";
import PopularCategories from "@/component/Categories";
import Feauter from "@/component/Feauter";
import TopLibrarians from "@/component/Laiberiyans";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Feauter></Feauter>
      <TopLibrarians></TopLibrarians>
      <PopularCategories></PopularCategories>
    </div>
  );
}
