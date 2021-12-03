import React from "react";
import { RowFlex, ColumnFlex } from "../../styles";
import { Picture, HeavyText, LightText } from "./styles";

export default function Header() {
      
  return (
    <RowFlex>
      <ColumnFlex>
        <HeavyText>
        Ant Race
        </HeavyText>
      </ColumnFlex>
    </RowFlex>
  );
}
