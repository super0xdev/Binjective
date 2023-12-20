//Not use it anymore
import React from "react";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import ModalContainer from "../Layout/ModalContainer";
import Repay from "./Repay";

type Props = UseDisclosureProps;

const RepayModal = (props: Props) => {
  const { isOpen } = props;

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props}>{/* <Repay {...props} /> */}</ModalContainer>
  );
};

export default RepayModal;
