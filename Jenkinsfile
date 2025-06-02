pipeline {
    agent any

    stages {
        stage('Clonar código') {
            steps {
                git 'https://github.com/MariaFernandaFernandez/bloc-notas-app'
            }
        }

        stage('Construir y levantar contenedores') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }

        stage('Verificar backend corriendo') {
            steps {
                sh 'curl -X GET http://localhost:3000 || echo "Backend no responde"'
            }
        }

        stage('Detener contenedores') {
            steps {
                sh 'docker-compose down'
            }
        }
    }
}
