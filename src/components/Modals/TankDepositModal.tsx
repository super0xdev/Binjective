/* eslint-disable react-hooks/exhaustive-deps */
import React, { type Dispatch, type SetStateAction } from "react";
import ModalContainer from "../Layout/ModalContainer";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import TankDeposit from "./TankDeposit";

type Props = UseDisclosureProps & {
  tankType: string;
  name: string;
};

const TankDepositModal = (props: Props) => {
  const { isOpen } = props;

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props} top="top-[10%]">
      <TankDeposit {...props} />
    </ModalContainer>
  );
};

export default TankDepositModal;
