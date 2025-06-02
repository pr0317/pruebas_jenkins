pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Limpiar contenedor previo') {
            steps {
                bat 'docker rm -f bloc-notas-backend || echo "No se encontró contenedor previo"'
            }
        }

        stage('Construir y levantar contenedores') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Esperar backend') {
            steps {
                bat '''
                    timeout /t 5 >nul
                    curl -X GET http://localhost:3000 || echo "Backend no responde"
                '''
            }
        }

        stage('Detener contenedores') {
            steps {
                bat 'docker-compose down'
            }
        }
    }
}
