pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Construir y levantar contenedores') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Verificar backend corriendo') {
            steps {
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
