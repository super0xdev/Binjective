/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ModalContainer from "../Layout/ModalContainer";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import TankWithdraw from "./TankWithdraw";
type Props = UseDisclosureProps & {
  tankType: string;
  name: string;
  coinImg: string;
  tankBuckBalance: number;
  isTankBuckBalanceLoading: boolean;
  earnInfo: number;
  isEarnLoading: boolean;
};

const TankWithdrawModal = (props: Props) => {
  const { isOpen } = props;

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props} top="top-[5%]">
      <TankWithdraw {...props} />
    </ModalContainer>
  );
};

export default TankWithdrawModal;
