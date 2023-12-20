import React, { useEffect } from "react";
import Connect from "./Connect";
import ModalContainer from "./ModalContainer";
import { type UseDisclosureProps } from "~/lib/hooks/useDisclosure";

type Props = UseDisclosureProps;

const ConnectModal = (props: Props) => {
  const { isOpen } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props} top="top-[10%]">
      <Connect {...props} />
    </ModalContainer>
  );
};

export default ConnectModal;
