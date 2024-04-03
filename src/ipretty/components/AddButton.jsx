import React, { useState } from 'react';
import { Add, Remove, ExpandMore } from '@material-ui/icons';
import { Button, makeStyles, CircularProgress, Box, Typography } from '@material-ui/core';
import Plus_White from '../../public/icons_ipretty/Plus_White.png'
import IconImage from "ipretty/components/IconImage"

const useStyles = makeStyles(theme => ({
  fullwidthBtn: {
    width: '100%',
    justifyContent: 'space-between'
  },
  backgroundBtn: {
    background: '#fff !important'
  },
  noBgHover: {
    '&:hover': {
      backgroundColor: '#147B65'
    },
  },
}))

function AddButton(props) {
  const classes = useStyles();
  const { loadingClass, redireact, fullWidth, refBtn, label, onClick, endIcon, remove, variant, noIcon, buttonClass, iconButton, id, loading, status, disabled, down, primary, isImport, handleImport, startIcon, upload, value } = props

  const handleOnChangeFile = (e) => {
    handleImport(e.target.files)
  }

  return (
    noIcon ? (
      upload ?
        <Button variant={primary ? 'text' : variant || 'outlined'} color={remove && 'secondary'} id={id}
          onClick={onClick}
          className={buttonClass}
          disabled={loading || disabled}
          fullWidth={fullWidth}
          ref={refBtn || null}
          color={primary ? 'primary' : 'default'}
        >
          {loading ?
            <Box position="relative" display="inline-flex">
              <CircularProgress size={28} />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                  value,
                )}%`}</Typography>
              </Box>
            </Box>
            : label}
        </Button>
        :
        <Button variant={primary ? 'text' : variant || 'outlined'} color={remove && 'secondary'} id={id}
          onClick={onClick}
          className={buttonClass}
          disabled={loading || disabled}
          fullWidth={fullWidth}
          ref={refBtn || null}
          color={primary ? 'primary' : 'default'}
        >
          {loading ? 
            <>
              <span className="labelLoading">{label}</span>
              <CircularProgress size={26} className={loadingClass} />
            </>
          : label}
        </Button>
    ) : (
      <>
        {isImport ?
          <>
            <input
              multiple
              type="file"
              id="contained-button-file"
              style={{ display: 'none', marginRight: '10px' }}
              accept=".ods, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleOnChangeFile}
              onClick={(event) => event.target.value = null}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                className={buttonClass}
                component="span"
                ref={refBtn || null}
                startIcon={iconButton ? iconButton : !endIcon && <IconImage srcIcon={Plus_White} />}
                disabled={loading || disabled}
              >
                {loading ? 
                    <>
                      <span className="labelLoading">{label}</span>
                      <CircularProgress size={26} className={loadingClass} />
                    </>
                : label}
              </Button>
            </label>
          </>
          :
          !redireact ?
            <Button
              id={id}
              ref={refBtn || null}
              onClick={onClick}
              color={remove ? 'secondary' : primary ? 'primary' : 'default'}
              variant={variant || 'outlined'}
              // startIcon={iconButton && !endIcon ? iconButton : !endIcon && <IconImage srcIcon={Plus_White} />}
              endIcon={endIcon ? remove ? <Remove /> : down ? <ExpandMore /> : iconButton : ""}
              className={endIcon ? classes.fullwidthBtn : startIcon ? '' : classes.backgroundBtn}
              disabled={loading || disabled || (status === 'Published') ? true : false}
              className={buttonClass}
            >
              {/* {loading ? <CircularProgress size={26} className={loadingClass} /> : label} */}
              {loading ? (
                <div className="loading_spinner">
                  {iconButton && !endIcon ? iconButton : !endIcon && <IconImage srcIcon={Plus_White} />}<span className="labelLoading" style={{ marginLeft: 10 }}>{label}</span>
                    <CircularProgress size={26} className={loadingClass} />
                </div>
              ) : (
                <>
                  {iconButton && !endIcon ? iconButton : !endIcon && <IconImage srcIcon={Plus_White} />}<span style={{ marginLeft: 10 }}>{label}</span>
                </>
              )}
            </Button>
            :
            <Button
              id={id}
              ref={refBtn || null}
              onClick={onClick}
              color={remove ? 'secondary' : primary ? 'primary' : 'default'}
              variant={variant || 'outlined'}
              startIcon={iconButton && !endIcon ? iconButton : !endIcon && <IconImage srcIcon={Plus_White} />}
              endIcon={endIcon ? remove ? <Remove /> : down ? <ExpandMore /> : iconButton : ""}
              className={endIcon ? classes.fullwidthBtn : startIcon ? '' : classes.backgroundBtn}
              disabled={loading || disabled || (status === 'Published') ? true : false}
              className={buttonClass}
            >
              {loading ? 
                <>
                    <span className="labelLoading">{label}</span>
                    <CircularProgress size={26} className={loadingClass} />
                </>
              : label}
            </Button>
        }


      </>
    )
  )
}

export default AddButton


