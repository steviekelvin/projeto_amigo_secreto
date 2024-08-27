#!/bin/bash

# Garante que vai ter permissoes suficientes para executar o script
chmod +x start.sh
chmod 644 stop.sh

stop_backend() {
    if [ -d "amigo_secreto_backend" ]; then
        echo "\nParando Backend\n"
        cd amigo_secreto_backend || exit
        echo "\nParando Sail\n"
        ./vendor/bin/sail down
        echo "\nBackend parado\n"
        cd .. || exit
    else
        echo "\nBackend não encontrado\n"
    fi
}

stop_frontend() {
    if [ -d "amigo_secreto_frontend" ]; then
        echo "\nParando Frontend\n"
        cd amigo_secreto_frontend || exit
        echo "\nParando servidor Angular\n"
        # Encontrar o processo do servidor Angular e parar
        PID=$(lsof -t -i:4200)
        if [ -n "$PID" ]; then
            kill -9 $PID
            echo "\nFrontend parado\n"
        else
            echo "\nServidor Angular não está rodando\n"
        fi
        cd .. || exit
    else
        echo "\nFrontend não encontrado\n"
    fi
}

# Parando o Backend e o Frontend
stop_backend
stop_frontend
