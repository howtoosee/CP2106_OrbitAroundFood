#!/bin/zsh
declare -a simulators=(
  'A16C8805-1391-4FAB-AFA6-9492CF12ACEA'
  'DD51ED48-A742-4B3F-9580-7F416BBA1F76'
  '995B6F7B-4045-4FE9-80A6-BD6F674C4C81'
)

for sim in "${simulators[@]}"
  do
    xcrun instruments -w "$sim"
    xcrun simctl install "$sim" ~/.expo/ios-simulator-app-cache/Exponent-2.16.0.tar.app
    xcrun simctl openurl "$sim" exp://127.0.0.1:19000
  done
