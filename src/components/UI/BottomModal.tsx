import { Drawer } from "@material-ui/core";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

export default function BottomModal({ children, open, onClose }: Props) {
  const height = 500;
  return (
    <Drawer
      PaperProps={{
        style: {
          width: 375,
          minHeight: height,
          justifyContent: "flex-start",
          paddingTop: 20,
          paddingBottom: 20,
          color: "#505050",
          fontWeight: "bold",
          fontSize: 19,
        },
      }}
      ModalProps={{
        style: {},
      }}
      SlideProps={{
        style: {
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 20,
          height: height,
        },
      }}
      open={open}
      onClose={onClose}
      anchor="bottom"
    >
      {children}
    </Drawer>
  );
}
