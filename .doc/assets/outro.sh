#!/bin/bash

lines=(
  ""
  ""
  "  $>  Wow, more than 700 options..."
  "  $>  Okay, I'm not reading that"
  "  $>  Goodbay cruel world!"
  "  $>  sudo rm -rf /"
  ""
)

# Función para escribir texto letra por letra
type_text() {
  local text="$1"
  for ((i = 0; i < ${#text}; i++)); do
    echo -n "${text:$i:1}"
    sleep 0.1
  done
  echo
}

for line in "${lines[@]}"; do
  type_text "$line"
  sleep 2
done
