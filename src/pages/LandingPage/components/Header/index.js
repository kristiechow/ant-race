import React from "react";
import { RowFlex, ColumnFlex } from "../../styles";
import { Picture, HeavyText, LightText } from "./styles";
import antImg from "../../../../assets/Cartoon-Ant.png";

export default function Header() {
      
  return (
    <RowFlex>
      <ColumnFlex>
        <RowFlex>
          <HeavyText>
          Stadium Antics
          </HeavyText>
          <Picture src={antImg} alt="Picture of an ant with shoes on">
          </Picture>
          </RowFlex>
        <LightText>
        Rumor has it a new pair of Jordans makes ants run faster...
        </LightText>
      </ColumnFlex>
    </RowFlex>
  );
}
