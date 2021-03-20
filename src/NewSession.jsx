import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  makeStyles,
  useTheme,
  TextField,
} from "@material-ui/core";

import { Session } from "kumo-client";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    headerRoot: {
      backgroundColor: theme.palette.primary.main,
    },
    headerTitle: {
      color: theme.palette.common.white,
    },
  };
});

function NewSession({ setContext }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [webSocketUrl, setWebSocketUrl] = useState("ws://localhost:8080");

  const session = new Session()
    .onConnect((newContext) => {
      enqueueSnackbar("Connected to the bridge server!", {
        variant: "success",
      });

      setContext(newContext);
    })
    .onDisconnect((code, reason) => {
      enqueueSnackbar(
        `Disconnected from the bridge server! ${reason} (${code})`,
        { variant: "error" }
      );

      setContext(null);
    })
    .onError((err) => {
      enqueueSnackbar(`Found error! ${err.message}`, {
        variant: "error",
      });
    });

  const onConnectButton = () => {
    session.connect(webSocketUrl);
  };

  const validateWebSocketUrl = () => {
    return webSocketUrl.startsWith("ws://") && webSocketUrl.length > 5;
  };

  const onWebSocketUrlChange = (event) => {
    setWebSocketUrl(event.target.value);
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <CardHeader
          title="New Session"
          classes={{
            root: classes.headerRoot,
            title: classes.headerTitle,
          }}
        />
        <CardContent>
          <TextField
            label="WebSocket URL"
            value={webSocketUrl}
            onChange={onWebSocketUrlChange}
            error={!validateWebSocketUrl()}
            helperText={validateWebSocketUrl() ? "" : "Invalid WebSocket URL"}
            variant="outlined"
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={onConnectButton}
            disabled={!validateWebSocketUrl()}
            color="primary"
            variant="contained"
            fullWidth
          >
            Connect
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

NewSession.propTypes = {
  setContext: PropTypes.func.isRequired,
};

export default NewSession;
