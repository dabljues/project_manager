import React from "react";

import * as S from "./DetailEntry.styles";

interface DetailEntryProps {
  label: string;
  content: string | JSX.Element;
  editDialog: React.ReactNode;
}

const DetailEntry = ({ label, content, editDialog }: DetailEntryProps) => (
  <S.DetailEntryWrapper>
    <S.Detail container alignItems="center" justify="center" spacing={3}>
      <S.DetailLabel item xs={12} sm={3}>
        {label}
      </S.DetailLabel>
      <S.DetailContent item justifyContent="flex-start" xs={12} sm={5} xxl={6}>
        {content}
      </S.DetailContent>
      <S.EditButtonWrapper
        item
        justifyContent="flex-end"
        xs={12}
        sm={4}
        lg={4}
        xxl={3}
      >
        {editDialog}
      </S.EditButtonWrapper>
    </S.Detail>
    <S.DetailDivider />
  </S.DetailEntryWrapper>
);

export default DetailEntry;
