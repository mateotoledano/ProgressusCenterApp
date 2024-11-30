import React from "react";
import { RxAvatar } from "react-icons/rx";
import { ModalLayout } from "../../layout/ModalLayout";
import { Title } from "../ui/title/Title";
import avatarUno from "/avatars/avatar9.jpg";
import avatarDos from "/avatars/avatar10.jpg";
import avatarTres from "/avatars/avatar11.jpg";
import avatarCuatro from "/avatars/avatar12.jpg";
import avatarCinco from "/avatars/avatar13.jpg";
import avatarSeis from "/avatars/avatar5.avif";
import avatarSiete from "/avatars/avatar14.jpg";
import avatarOcho from "/avatars/avatar6.jpg";
import avatarNueve from "/avatars/avatar7.jpg";
import { useSpinnerStore, useUserProfile } from "../../store";

const avatarList = [
  avatarUno,
  avatarDos,
  avatarTres,
  avatarCuatro,
  avatarCinco,
  avatarSeis,
  avatarSiete,
  avatarOcho,
  avatarNueve,
];

export const ModalPhotoProfile = ({ open, setOpen }) => {
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const closeSpinner = useSpinnerStore((state) => state.hideSpinner);
 const setAvatar = useUserProfile(state=>state.setUserImage)
  const handleAvatarClick = (avatar) => {
   
    showSpinner();

    setOpen(false); 
    setTimeout(() => {
      
        setAvatar(avatar)
        closeSpinner(); 
    }, 2000);
  };

  return (
    <ModalLayout open={open} setOpen={setOpen} Icon={RxAvatar}>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4">
        {avatarList.map((avatar, index) => (
          <div
            key={index}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleAvatarClick(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};
