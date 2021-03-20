import MuiButton from "@material-ui/core/Button";
import MuiCard from "@material-ui/core/Card";
import MuiCardActions from "@material-ui/core/CardActions";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiContainer from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import { Session } from "kumo-client";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    headerRoot: {
      backgroundColor: theme.palette.primary.main,
    },
    headerTitle: {
      color: theme.palette.common.white,
      textAlign: "center",
    },
  };
});

function NewSession({ setContext }) {
  const classes = useStyles();

  const [webSocketUrl, setWebSocketUrl] = React.useState("ws://localhost:8080");

  const session = new Session()
    .onConnect((newContext) => {
      setContext(newContext);
    })
    .onDisconnect(() => {
      setContext(null);
    });

  const onConnectButton = () => {
    session.connect(webSocketUrl);
  };

  const validateWebSocketUrl = () => {
    return webSocketUrl.startsWith("ws://");
  };

  const onWebSocketUrlChange = (event) => {
    setWebSocketUrl(event.target.value);
  };

  return (
    <MuiContainer maxWidth="xs">
      <MuiCard>
        <MuiCardHeader
          title="New Session"
          classes={{
            root: classes.headerRoot,
            title: classes.headerTitle,
          }}
        />
        <MuiCardContent>
          <MuiTextField
            label="WebSocket URL"
            value={webSocketUrl}
            onChange={onWebSocketUrlChange}
            error={!validateWebSocketUrl()}
            helperText={validateWebSocketUrl() ? "" : "Invalid WebSocket URL"}
            variant="outlined"
            fullWidth
          />
        </MuiCardContent>
        <MuiCardActions>
          <MuiButton
            onClick={onConnectButton}
            disabled={!validateWebSocketUrl()}
            color="primary"
            variant="contained"
            fullWidth
          >
            Connect
          </MuiButton>
        </MuiCardActions>
      </MuiCard>
    </MuiContainer>
  );
}

NewSession.propTypes = {
  setContext: PropTypes.func.isRequired,
};

export default NewSession;
