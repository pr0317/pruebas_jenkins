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

        stage('Construir y levantar contenedor') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Esperar backend') {
            steps {
                echo 'Esperando 10 segundos para que arranque el backend...'
                bat 'ping 127.0.0.1 -n 10 > nul'
                bat 'curl -X GET http://localhost:3000 || echo Backend no responde'
            }
        }

        stage('Detener contenedor') {
            steps {
                bat 'docker rm -f bloc-notas-backend || echo "No se pudo detener (¿ya está detenido?)"'
            }
        }
    }
}
