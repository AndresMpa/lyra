#!/bin/bash

# Definir las líneas en un array
lines=(
  ""
  ""
  "  $>  Hi, I'm a newbie"
  "  $>  I need something to write a document"
  "  $>  I must use an editor I guess"
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

# Iterar sobre el array e imprimir cada línea letra por letra con una pausa de 2 segundos
for line in "${lines[@]}"; do
  type_text "$line"
  sleep 2
done

# Definir el comando a ejecutar
command="yay editor"

# Mostrar el comando letra por letra
type_text "  $>  $command"

# Ejecutar el comando
$command
