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

        stage('Esperar backend') {
            steps {
                bat '''
                echo Esperando a que el backend se levante...
                timeout /t 10
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
