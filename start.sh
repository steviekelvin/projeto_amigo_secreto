#!/bin/bash

# Garante que vai ter permissoes suficientes para executar o script
chmod +x start.sh
chmod 644 start.sh

start_backend() {
    if [ -d "amigo_secreto_backend" ]; then
        echo  "\nIniciando Backend\n"
        cd amigo_secreto_backend || exit
        echo  "\nVerificando dependências do projeto\n"
        if [ -d "vendor" ]; then
            echo  "\nDependências já instaladas\n"
        else
            echo  "\nInstalando dependências\n"
            composer install
        fi
        echo  "\nIniciando servidor\n"
        cp .env.example .env
        ./vendor/bin/sail up -d
        echo  "\nAguarde até o Sail levantar o container do banco...\n"
        sleep 10
        echo  "\nMigrando banco de dados\n"
        ./vendor/bin/sail artisan migrate
        echo  "\nBackend iniciado\n"
        ./vendor/bin/sail php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
        ./vendor/bin/sail php artisan key:generate
        ./vendor/bin/sail php artisan jwt:secret 
        cd .. || exit
    else
        echo  "\nBackend não encontrado, faça o download do repositório\n"
    fi
}

start_frontend() {
    # Verifica se a pasta do frontend existe
    if [ -d "amigo_secreto_frontend" ]; then
        echo "\nIniciando Frontend\n"
        cd amigo_secreto_frontend || exit
        
        # Instala as dependências do projeto
        echo "\nInstalando dependências...\n"
            sudo npm install > /dev/null 2>&1
        sleep 4

        # Inicia o servidor Angular
        echo "\nIniciando servidor\n"
        npm start
        echo "\nFrontend iniciado\n"
    else
        echo "\nFrontend não encontrado, faça o download do repositório\n"
    fi
}

# Iniciando o Backend e o Frontend
start_backend
start_frontend
