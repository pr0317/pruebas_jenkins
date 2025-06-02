pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Limpiar contenedores previos') {
            steps {
                bat 'docker rm -f bloc-notas-backend || echo "Backend no encontrado"'
                bat 'docker rm -f bloc-notas-frontend || echo "Frontend no encontrado"'
            }
        }

        stage('Construir y levantar contenedores') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Esperar backend') {
            steps {
                bat 'timeout /t 10'
                bat 'curl -X GET http://localhost:3000 || echo Backend no responde'
            }
        }

        stage('Detener contenedores') {
            steps {
                bat 'docker-compose down'
            }
        }
    }
}
