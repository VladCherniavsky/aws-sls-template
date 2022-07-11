#! /bin/bash

echo '$env:                ' "$env"
echo '$CODEBUILD_SRC_DIR:  ' "$CODEBUILD_SRC_DIR"

npm install -g serverless
sls -v
serverless deploy --stage $env --package \   $CODEBUILD_SRC_DIR/target/$env -v -r eu-central-1
