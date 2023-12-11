#!/bin/bash

is_release=false

while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        --release)
            is_release=true
            shift
            ;;
        --debug)
            is_release=false
            shift
            ;;
        *)
            shift
            ;;
    esac
done

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

if [ "$is_release" = true ]; then
  npx cap build android \
    --keystorepath "keystore/release.keystore" \
    --keystorepass $KEYSTOREPASS \
    --keystorealiaspass $KEYSTOREALIASPASS \
    --keystorealias $KEYSTOREALIAS \
    --androidreleasetype APK

else
  cd ./android/
  ./gradlew assembleDebug
  cd ..
fi
