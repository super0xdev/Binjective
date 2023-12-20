import ModalContainer from "../Layout/ModalContainer";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";

type Props = UseDisclosureProps;

const LocationModal = (props: Props) => {
  return (
    <ModalContainer {...props} top="top-[15%] lg:top-[20%]">
      <div className="flex flex-col items-center justify-between gap-4 p-8 lg:w-165 lg:flex-row lg:gap-0">
        <span className="w-full text-2xl font-bold lg:w-80">
          Service Not <br /> Available in Your <br /> Region
        </span>
        <p className="w-fit">
          Sorry! For compliance reasons, this service is not accessible in your
          area. Use of VPN, Tor, proxies or other means to circumvent this
          restriction is a violation of our Terms of Service.
        </p>
      </div>
    </ModalContainer>
  );
};

export default LocationModal;
