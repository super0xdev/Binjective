//Not use it anymore
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ModalContainer from "../Layout/ModalContainer";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import Borrow from "./Borrow";

type Props = UseDisclosureProps & {
  coinSymbol: string;
};

const BorrowModal = (props: Props) => {
  const { isOpen } = props;

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props}>{/* <Borrow {...props} /> */}</ModalContainer>
  );
};

export default BorrowModal;
