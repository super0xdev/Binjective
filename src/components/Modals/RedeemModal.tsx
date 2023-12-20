import React from "react";
import ModalContainer from "../Layout/ModalContainer";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import Redeem from "./Redeem";

type Props = UseDisclosureProps & {
  coinSymbol: string;
};

const RedeemModal = (props: Props) => {
  const { isOpen } = props;

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props}>
      <Redeem {...props} />
    </ModalContainer>
  );
};

export default RedeemModal;
