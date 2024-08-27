 #!/bin/bash 

   
    function start_backend {
        echo "Starting backend"
        cd amigo_secreto_backend
        echo verificando dependencias do projeto
        if [ -d "vendor" ]; then
            echo "Dependencias já instaladas"
        else
            echo "Instalando dependencias"
            composer install
        fi
        echo "Iniciando servidor"
        ./vendor/bin/sail up -d
        echo "Migrando banco de dados"
        ./vendor/bin/sail artisan migrate
        echo "Backend iniciado"   
        cd ..   
    } 

    function start_frontend {
        echo "Starting frontend"
        cd amigo_secreto_frontend
        echo "Instalando dependencias"
        npm install
        echo "Iniciando servidor"
        ng start
        echo "Frontend iniciado"
    }
    
    
    
    # Start the server backend
    if [ -f "amigo_secreto_backend"]; then
        start_backend
        start_frontend
    else
        echo "Backend não encontrado, faça o download do repositório"
    fi