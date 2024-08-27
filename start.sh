 #!/bin/bash 

   
    function start_backend {
        echo -e "\nIniciando Backend\n"
        cd amigo_secreto_backend
        echo -e "\nverificando dependencias do projeto\n"
        if [ -d "vendor" ]; then
            echo -e "\nDependencias já instaladas\n"
        else
            echo -e "\nInstalando dependencias\n"
            composer install
        fi
        echo -e "\nIniciando servidor\n"
        cp .env.example .env
        ./vendor/bin/sail up -d
        echo -e "\nAguarde até o sail levantar o container do banco...\n"
        sleep 10
        echo -e "\nMigrando banco de dados\n"
        ./vendor/bin/sail artisan migrate
        echo -e  "\nBackend iniciado\n"  
        ./vendor/bin/sail php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
        ./vendor/bin/sail php artisan jwt:secret 
        cd ..   
    } 

    function start_frontend {
        echo -e "\nIniciando Frontend\n"
        cd amigo_secreto_frontend
        echo -e "\nInstalando dependencias...\n"
        npm install
        sleep 4
        echo -e "\nIniciando servidor\n"
        ng start
        echo -e "\nFrontend iniciado\n"
    }
    
    # Iniciando o Backend e o Frontend
    if [ -f "amigo_secreto_backend"]; then
        start_backend
        if [ -f "amigo_secreto_frontend"]; then
            start_frontend
        else
            echo -e "\nFrontend não encontrado, faça o download do repositório\n"
        fi
    else
        echo -e "\nBackend não encontrado, faça o download do repositório\n"
    fi