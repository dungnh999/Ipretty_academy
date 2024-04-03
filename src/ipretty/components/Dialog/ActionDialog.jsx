import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    root: {
      "& .MuiDialog-paper" : {
        borderRadius: '3.625rem',
        padding: '0 7.292vw',
      },
      "& .MuiDialogActions-root": {
        justifyContent: 'center',
        paddingBottom: '2.438rem'
      }
    },
    deleteButton: {
      "&:hover": {
        backgroundColor: theme.palette.error.main
      },
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    }
  }),
  { name: "ActionDialog" }
);


const ActionDialog = props => {
  const {
    children,
    confirmButtonLabel,
    confirmBtnClass,
    dialogClassName,
    open,
    title,
    variant, //"default" | "delete" | "info"
    onConfirm,
    onClose,
    ...rest
  } = props;

  const classes = useStyles(props);

  return (
    <Dialog 
      className={classNames(classes.root, dialogClassName)}
      fullWidth 
      onClose={onClose}
      open={open} 
      {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose}>
          Close
        </Button> */}
        {variant !== "info" && (
          <Button
            color="primary"
            variant="contained"
            onClick={onConfirm}
            className={classNames({
              [classes.deleteButton]: variant === "delete",
              [confirmBtnClass]: variant === "default"
            })}
          >
            {confirmButtonLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

ActionDialog.defaultProps = {
  maxWidth: "xs", //"xs" | "sm" | "md" | "lg" | "xl" | false
  variant: "default" //"default" | "delete" | "info"
};
ActionDialog.displayName = "ActionDialog";
export default ActionDialog;
