import styled from "styled-components/macro";

import { Avatar, Grid } from "@material-ui/core";

const Constants = {
  borderSolid: "1px solid gray",
  padding: "20px",
};

const ProfileWrapper = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const ProfileBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;

  border-radius: 50px 0px 0px 50px;
  padding: ${Constants.padding};

  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
`;

const ProfileAvatar = styled(Avatar)`
  margin-bottom: 30px;
  width: 360px !important;
  height: 360px !important;
  box-shadow: 0px 0px 50px 30px rgba(0, 0, 0, 0.5);
`;

const ProfileDetailedInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  border-top: ${Constants.borderSolid};
  border-bottom: ${Constants.borderSolid};
  border-right: ${Constants.borderSolid};
  border-radius: 0px 50px 50px 0px;
`;

const ProfileEdit = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 50px 50px 20px 50px;
`;

const Rows = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ProfileInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const EditMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin-top: 50px;

  button:not(:last-child) {
    margin-right: 15px;
  }
`;

const UserStats = styled.div`
  padding: 20px;
  display: flex;
  border-top: ${Constants.borderSolid};
`;

const Tile = styled(Grid)`
  height: fit-content;
  min-width: 150px;
  text-align: center;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const TileName = styled.div`
  padding: 2px;
  border-bottom: ${Constants.borderSolid};
  font-weight: bold;
  font-size: 20px;
`;

const TileContent = styled.div`
  padding: 15px;
  font-size: 20px;
`;

export {
  EditMenu,
  ProfileAvatar,
  ProfileBasicInfo,
  ProfileDetailedInfo,
  ProfileEdit,
  ProfileInfoRow,
  ProfileWrapper,
  Rows,
  Tile,
  TileContent,
  TileName,
  UserStats,
};
