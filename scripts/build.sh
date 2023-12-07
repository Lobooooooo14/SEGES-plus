#!/bin/bash

if [ "$WORKFLOW" = true ]; then
    echo -e "\033[1;33mRunning in a workflow. Using workflow ambient variables."
else
    if [ -f ".env" ]; then
      source ".env"
    else
      echo -e "\033[1;33mPlease create a .env file in the application root with your keystore credentials. See .env.example for reference."
      exit 1
    fi
fi

npx cap build android \
  --keystorepath "keystore/release.keystore" \
  --keystorepass $KEYSTOREPASS \
  --keystorealiaspass $KEYSTOREALIASPASS \
  --keystorealias $KEYSTOREALIAS \
  --androidreleasetype APK
