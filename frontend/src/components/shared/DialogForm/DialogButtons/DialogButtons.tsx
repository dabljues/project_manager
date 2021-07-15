import styled from "styled-components/macro";

import { Button } from "@material-ui/core";

interface DialogButtonsProps {
  okText: string;
  cancelText: string;
  handleClose: () => void;
}

const DialogButtonsWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const DialogButtons = (props: DialogButtonsProps) => {
  const { okText, cancelText, handleClose } = props;
  return (
    <DialogButtonsWrapper>
      <Button onClick={handleClose} color="primary">
        {cancelText}
      </Button>
      <Button variant="contained" color="primary" type="submit">
        {okText}
      </Button>
    </DialogButtonsWrapper>
  );
};

export default DialogButtons;
