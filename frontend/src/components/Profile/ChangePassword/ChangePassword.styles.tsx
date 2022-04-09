import { DialogContent as MuiDialogContent } from "@material-ui/core";
import styled from "styled-components/macro";

const DialogContent = styled(MuiDialogContent)`
  div + div {
    margin-top: 15px !important;
  }
`;

export default DialogContent;
