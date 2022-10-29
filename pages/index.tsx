import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Box, Grid, Icon, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ColorPicker } from "../src/components/ColorPicker";
import { useState } from "react";
import { Lock } from "@mui/icons-material";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, cursor: "move" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open, setOpen] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([
    "#37de74",
    "#e0467c",
    "#3b9cd4",
    "#8ac221",
    "#cc5fed",
    "#e68722",
  ]);
  const [colorLock, setColorLock] = useState<boolean>(false);

  const id = "draggable-dialog-title";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleColorLock = () => {
    setColorLock(!colorLock);
  };

  return (
    <div>
      <div>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: 100,
              height: 100,
              marginRight: 10,
            }}
          ></div>
        ))}
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        hideBackdrop={true}
        aria-labelledby={id}
      >
        <BootstrapDialogTitle onClose={handleClose} id={id} />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs>
              <ColorPicker
                colorLock={colorLock}
                colors={colors}
                onChange={(colors) => setColors(colors)}
                activeColorIndex={activeColorIndex}
                onActiveColorIndexChange={(activeColorIndex) =>
                  setActiveColorIndex(activeColorIndex)
                }
              />
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  background: colors[activeColorIndex],
                  marginTop: 3,
                }}
              />
              <IconButton
                sx={{
                  marginTop: 1,
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                size="large"
                color={colorLock ? "info" : "inherit"}
                onClick={toggleColorLock}
              >
                <Lock />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
